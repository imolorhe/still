class Storage {
  constructor(namespace) {
    this.ns = namespace || 'still';
  }
  k(key) {
    return `${this.ns}::${key}`;
  }
  get(key) {
    const rawValue = localStorage.getItem(this.k(key));
    try {
      return JSON.parse(rawValue).value;
    } catch (e) {
      return rawValue;
    }
  }
  set(key, value) {
    const valObj = { value };
    localStorage.setItem(this.k(key), JSON.stringify(valObj));
  }
}

export default Storage;
