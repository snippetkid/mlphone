# mlphone

**mlphone** is a lightweight phonetic hashing library for Malayalam script. It generates simplified ASCII-based hashes of Malayalam words, enabling fuzzy matching, deduplication, and search-friendly comparisons.

> 🔁 This package is a **direct JavaScript port** of the original [mlphone Python library by @knadh](https://github.com/knadh/mlphone/blob/master/mlphone.py).  
> All credit for the original algorithm and design goes to the author.

## ✨ Features

- Converts Malayalam text into a phonetic hash
- Supports multiple levels of detail: broad, medium, and precise
- Ideal for fuzzy string matching and search
- Fully written in JavaScript and compatible with Node.js and the browser

## 📦 Installation

```bash
npm install mlphone
```

## 🔧 Usage
```javascript
import { computePhoneticHash } from 'mlphone';

const [key0, key1, key2] = computePhoneticHash("കുട്ടി");

console.log(key0); // KT3
console.log(key1); // K2T3
console.log(key2); // K2T24
```


## 🔮 Roadmap

- Support reverse mapping from hash → common words
- Add CLI (npx mlphone 'കുട്ടി')
