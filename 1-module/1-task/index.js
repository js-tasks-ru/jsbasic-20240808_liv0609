function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else if (n > 1) {
    let result = n;
    while (n > 1) {
      result *= --n;
    }
    return result;
  }
}
