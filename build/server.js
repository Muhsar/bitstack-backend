"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
var AuthRouter = require('./routes/auth');
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.ATLAS_URI || "mongodb://localhost/BITSTACK";
const connection = mongoose_1.default.connect(mongoURI)
    .then(() => console.log('MongoDB database connected successfully'))
    .catch(error => console.error(error));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use('/api/auth', AuthRouter);
app.get('/', (req, res) => res.send(`BITSTACK ⚡️[server]: Server is running at https://localhost:${PORT}`));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
