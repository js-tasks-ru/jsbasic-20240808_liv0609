function getMinMax(str) {
  const numbers = str.split(' ')
    .map(num => Number(num))
    .filter(num => !isNaN(num))

  return numbers.reduce((acc, num) => {
    if (num < acc.min) acc.min = num;
    if (num > acc.max) acc.max = num;
    return acc;
  }, {min: Infinity, max: -Infinity});
}
