"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', book_controller_1.createBook);
exports.bookRoutes.get('/', book_controller_1.getAllBooks);
exports.bookRoutes.get('/:bookId', book_controller_1.getBookById);
exports.bookRoutes.put('/:bookId', book_controller_1.updateBook);
exports.bookRoutes.delete('/:bookId', book_controller_1.deleteBook);
