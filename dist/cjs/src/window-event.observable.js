"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowClick = void 0;
const rxjs_1 = require("rxjs");
const windowClick = (0, rxjs_1.fromEvent)(window, 'click');
exports.windowClick = windowClick;
