"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fscache_1 = __importDefault(require("./fscache"));
describe('FSCache', () => {
    it('should store items within capacity', () => {
        const capacity = 3;
        const cache = new fscache_1.default(capacity, '');
        cache.put('TX-001', 'this');
        cache.put('TX-002', 'is');
        cache.put('TX-003', 'a');
        cache.put('TX-004', 'secret');
        expect(cache.getItems().length).toBe(capacity);
    });
});
//# sourceMappingURL=fscache.spec.js.map