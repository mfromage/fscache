class FSCacheNode<TValue> {
  prev?: FSCacheNode<TValue> | null;
  next?: FSCacheNode<TValue> | null;
  key: string | null;
  value: TValue | null;

  constructor(key?: string, value?: TValue) {
    this.key = key ?? null;
    this.value = value ?? null;
  }
}

class FSCache<TValue> {
  private dictionary: Map<string, FSCacheNode<TValue>>;

  private head: FSCacheNode<TValue>;
  private tail: FSCacheNode<TValue>;

  capacity = 1;
  pattern: RegExp;

  constructor(capacity: number, pattern: RegExp) {
    if (capacity > 0) {
      this.capacity = capacity;
    }

    this.pattern = pattern;

    this.dictionary = new Map<string, FSCacheNode<TValue>>();

    this.head = new FSCacheNode<TValue>();
    this.tail = new FSCacheNode<TValue>();

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: string) {
    const searchedNode = this.dictionary.get(key);

    if (!searchedNode) {
      return undefined;
    }

    this.updateRecent(searchedNode);

    return searchedNode.value;
  }

  put(key: string, value: TValue) {
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

  private add(node: FSCacheNode<TValue>) {
    const headNext = this.head.next;

    if (!headNext) {
      return;
    }

    node.next = headNext;
    node.prev = this.head;

    headNext.prev = node;
    this.head.next = node;
  }

  private remove(node: FSCacheNode<TValue>) {
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

  private updateRecent(node: FSCacheNode<TValue>) {
    this.remove(node);
    this.add(node);
  }
}

export default FSCache;
