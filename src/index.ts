import FSCache from './fscache';

const cache = new FSCache<string>(3, /[a-z]/);

cache.put('1', '12');
cache.put('b', '34');
cache.put('c', '56');
cache.get('a');
cache.put('d', '78');

console.log(cache.getItems());
