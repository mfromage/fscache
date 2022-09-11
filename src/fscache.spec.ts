import FSCache from './fscache';

const capacity = 3;
const pattern = /[a-zA-Z]{2}-\d{4}/;

describe('FSCache', () => {
  it('should store items within capacity', () => {
    const cache = new FSCache<string>(capacity, pattern);
    cache.put('TX-0001', 'this');
    cache.put('TX-0002', 'is');
    cache.put('TX-0003', 'a');
    cache.put('TX-0004', 'secret');

    expect(cache.getItems().length).toBe(capacity);
  });

  it('should store item FIFO', () => {
    const cache = new FSCache<string>(capacity, pattern);
    cache.put('TX-0001', 'this');
    cache.put('TX-0002', 'is');
    cache.put('TX-0003', 'a');

    const items = cache.getItems();
    expect(items[0]).toBe('a');
    expect(items[1]).toBe('is');
    expect(items[2]).toBe('this');
  });

  it('should remove least recent used item', () => {
    const cache = new FSCache<string>(capacity, pattern);
    cache.put('TX-0001', 'this');
    cache.put('TX-0002', 'is');
    cache.put('TX-0003', 'a');
    cache.get('TX-0001');
    cache.put('TX-0004', 'secret');

    expect(cache.get('TX-002')).toBe(undefined);
  });

  it('should throw invalid pattern error', () => {
    const cache = new FSCache<string>(capacity, pattern);
    cache.put('TX-0001', 'this');

    const invalidPattern = () => cache.put('TX-00o2', 'is');
    expect(invalidPattern).toThrow();
  });
});
