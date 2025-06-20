import { Request, Response } from 'express';
import bookModel from '../models/book.model';
import borrowModel from '../models/borrow.model';


export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await bookModel.findById(bookId);

    if (!book || book.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: 'Insufficient copies'
      });
    }

    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
    await book.save();

    const borrow = await borrowModel.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Borrow failed', error });
  }
};

export const getBorrowedSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await borrowModel.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookInfo'
        }
      },
      {
        $unwind: '$bookInfo'
      },
      {
        $project: {
          book: {
            title: '$bookInfo.title',
            isbn: '$bookInfo.isbn'
          },
          totalQuantity: 1
        }
      }
    ]);

    res.json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Summary failed', error });
  }
};