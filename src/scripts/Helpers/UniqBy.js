// http://stackoverflow.com/questions/40801349/converting-lodash-uniqby-to-native-javascript
module.exports = (arr, predicate) => {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate];
  return [...arr.reduce((map, item) => {
    const key = cb(item);
    map.has(key) || map.set(key, item);
    return map;
  }, new Map()).values()];
};