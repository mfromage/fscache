"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FSCacheNode {
    constructor(key, value) {
        this.key = key !== null && key !== void 0 ? key : null;
        this.value = value !== null && value !== void 0 ? value : null;
    }
}
class FSCache {
    constructor(capacity, pattern) {
        this.capacity = 1;
        if (capacity > 0) {
            this.capacity = capacity;
        }
        this.pattern = pattern;
        this.dictionary = new Map();
        this.head = new FSCacheNode();
        this.tail = new FSCacheNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    get(key) {
        const searchedNode = this.dictionary.get(key);
        if (!searchedNode) {
            return undefined;
        }
        this.updateRecent(searchedNode);
        return searchedNode.value;
    }
    put(key, value) {
        if (!new RegExp(this.pattern).test(key)) {
            throw 'Invalid pattern';
        }
        const searchedNode = this.dictionary.get(key);
        if (searchedNode) {
            searchedNode.value = value;
            this.updateRecent(searchedNode);
            return;
        }
        if (this.dictionary.size === this.capacity) {
            const lastNode = this.tail.prev;
            lastNode && this.remove(lastNode);
        }
        const node = new FSCacheNode(key, value);
        this.add(node);
        this.dictionary.set(key, node);
        return this.dictionary;
    }
    getItems() {
        const result = [];
        let node = this.head;
        while (node.next !== null && node.next !== this.tail) {
            const current = node.next;
            if (!current) {
                break;
            }
            result.push(current.value);
            node = current;
        }
        return result;
    }
    add(node) {
        const headNext = this.head.next;
        if (!headNext) {
            return;
        }
        node.next = headNext;
        node.prev = this.head;
        headNext.prev = node;
        this.head.next = node;
    }
    remove(node) {
        const nextNode = node.next;
        const prevNode = node.prev;
        if (!nextNode || !prevNode) {
            return;
        }
        nextNode.prev = prevNode;
        prevNode.next = nextNode;
        node.prev = null;
        node.next = null;
    }
    updateRecent(node) {
        this.remove(node);
        this.add(node);
    }
}
exports.default = FSCache;
//# sourceMappingURL=fscache.js.map