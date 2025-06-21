"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const book_route_1 = require("./app/route/book.route");
const borrow_route_1 = require("./app/route/borrow.route");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.connectDB)();
// routes
app.use('/api/books', book_route_1.bookRoutes);
app.use('/api/borrow', borrow_route_1.borrowRoutes);
// error handler
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err,
    });
});
exports.default = app;
