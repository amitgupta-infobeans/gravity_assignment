const addSumOfTwo = (target, arr) => {
  const map = new Map();
  const arrLength = arr.length;
  for (let i = 0; i < arrLength; i++) {
    let key = target - arr[i]; // get another number
    if (map.has(key)) {
      return [map.get(key), i]; //return map key and ith index.
    }
    map.set(arr[i], i);
  }
};

let result1 = addSumOfTwo(9, [2, 7, 11, 15]);
let result2 = addSumOfTwo(17, [2, 3, 5, 6, 9, 7, 11, 15]);

console.log(result1);
console.log(result2);
