var sum_to_n_a = function (n) {
  let total = 0;
  let i = 1;
  while (i <= n) {
    total += i
    i++
  }
  return total;
};

console.log(sum_to_n_a(5))

var sum_to_n_b = function (n) {
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i
  }
  return result
};

console.log(sum_to_n_b(3))
console.log(sum_to_n_b(5))
console.log(sum_to_n_b(2))

var sum_to_n_c = function (n) { //recursion
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1)
};

console.log(sum_to_n_c(4))
console.log(sum_to_n_c(1))
console.log(sum_to_n_c(6))