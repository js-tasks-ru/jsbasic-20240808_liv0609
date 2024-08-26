function namify(users) {
  const userNames = []
  for (let user of users) {
    if (user.name) {
      userNames.push(user.name)
    }
  }
  return userNames
}
