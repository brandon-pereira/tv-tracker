export default class LocalStorage {

  constructor(key, options) {
    this.key = key;
    this.options = options;
  }

  /**
   * Method to add item to localStorage
   * @param {Object} item
   */
  add(key, value) {
    const current = this._get();
    current.push({key, value});
    return this.set(current);
  }

  /**
   * Method to remove a given key from the storage map
   * @param {String} key 
   */
  remove(key) {
    const current = this._get();
    const index = current.findIndex(c => c.key === key);
    if(index >= 0) {
        current.splice(index, 1); 
        return this.set(current);
    }
    return current;
  }

  /**
   * Method to get localStorage items
   * @param {String} key - Optionally return just the specified key
   */
  get(key) {
    const items = this._get();
    if(key) {
        return items.find(item => item.key === key);
    }
    return this.dedupe(items).map(item => item.value);
  }

  _get() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch(err) {
      return [];
    }
  }

  /**
   * Method to storage items
   * @param {Array} items 
   */
  set(items) {
    items = this.sort(this.dedupe(items));
    this._set(items);
    return items.map(item => item.value);
  }

  _set(items) {
    localStorage.setItem(this.key, JSON.stringify(items));
  }

  /**
   * Update the value of key
   * @param {String} key 
   * @param {*} value 
   */
  update(key, value) {
    let items = this._get()
    items = items.map(item => {
      if(item.key === key) {
        item.value = value;
      }
      return item;
    });
    return this.set(items);
  }

  sort(arr) {
    console.log("SORT");
    if(this.options.sortMethod && typeof this.options.sortMethod === 'function') {
      console.log("PASS");
      return this.options.sortMethod(arr);
    } else {
      return arr;
    }
  }

  /**
   * Removes duplicate IDs
   * @param {Array} items 
   */
  dedupe(items) {
    if(this.options.uniqueOnly) {
      const ids = [];
      return items.filter(show => {
        if (ids.indexOf(show.key) !== -1) {
          return false;
        }
        ids.push(show.key);
        return true;
      });
    } else {
      return items;
    }
  }

}
