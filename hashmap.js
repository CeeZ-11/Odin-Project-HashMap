class HashMap {
  constructor(loadFactor = 0.75, initialCapacity = 16) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value; // Overwrite value
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) return pair[1];
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const pair of bucket) {
      if (pair[0] === key) return true;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);
    this.size = 0;
  }

  keys() {
    return this.buckets.flat().map((pair) => pair[0]);
  }

  values() {
    return this.buckets.flat().map((pair) => pair[1]);
  }

  entries() {
    return this.buckets.flat();
  }

  grow() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.size = 0;
    this.buckets = Array(this.capacity)
      .fill(null)
      .map(() => []);

    for (const bucket of oldBuckets) {
      for (const pair of bucket) {
        this.set(pair[0], pair[1]);
      }
    }
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("Before Growth: Length:", test.length());
test.set("moon", "silver");
console.log("After Growth: Length:", test.length());

console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

console.log("Has 'apple':", test.has("apple"));
console.log("Get 'apple':", test.get("apple"));
console.log("Remove 'apple':", test.remove("apple"));
console.log("Has 'apple' after removal:", test.has("apple"));

console.log("Final Length:", test.length());
test.clear();
console.log("After Clear: Length:", test.length());
