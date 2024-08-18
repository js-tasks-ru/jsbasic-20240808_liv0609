function sumSalary(salaries) {
  let sumSalary = 0;
  const invalidValues = [null, undefined, NaN, Infinity, -Infinity];
  for (let salary in salaries) {
    if (typeof (salaries[salary]) === 'number' &&
      salaries[salary] > '0' &&
      !invalidValues.includes(salaries[salary])
    ) {
      sumSalary += salaries[salary];
    }
  }
  return sumSalary;
}
