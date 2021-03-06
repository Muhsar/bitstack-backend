"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResponse = void 0;
const HandleResponse = (res, status, msg, type, data) => res.status(status).json({
    message: {
        type, msg
    },
    data
});
exports.HandleResponse = HandleResponse;
