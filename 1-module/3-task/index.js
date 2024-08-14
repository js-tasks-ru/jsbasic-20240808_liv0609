function ucFirst(str) {
  if (str === '') {
    return str;
  } else if (str.length === 1) {
    return str.toUpperCase();
  } else {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
}
