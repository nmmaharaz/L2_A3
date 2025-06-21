"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowedSummary = exports.borrowBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
// ✅ Controller: Borrow a book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // Find the book by ID
        const book = yield book_model_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: 'Not enough copies available',
                error: 'Insufficient copies'
            });
            return;
        }
        // Update book availability
        book.copies -= quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save();
        // Create borrow record
        const borrow = yield borrow_model_1.default.create({
            book: bookId,
            quantity,
            dueDate
        });
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrow
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Borrow failed',
            error: error.message
        });
    }
});
exports.borrowBook = borrowBook;
// ✅ Controller: Get borrowed summary
const getBorrowedSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.default.aggregate([
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
            { $unwind: '$bookInfo' },
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
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Summary failed',
            error: error.message
        });
    }
});
exports.getBorrowedSummary = getBorrowedSummary;
