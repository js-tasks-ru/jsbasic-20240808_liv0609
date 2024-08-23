function showSalary(users, age) {
  let generalSalary = ''
  for (let user of users) {
    if (user.age <= age) {
      generalSalary += `${user.name}, ${user.balance} \n`
    }
  }
  return generalSalary.slice(0, -2)
}