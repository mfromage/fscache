"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fscache_1 = __importDefault(require("./fscache"));
const cache = new fscache_1.default(3, '[a-z]');
cache.put('1', '12');
cache.put('b', '34');
cache.put('c', '56');
cache.get('a');
cache.put('d', '78');
console.log(cache.getItems());
//# sourceMappingURL=index.js.map