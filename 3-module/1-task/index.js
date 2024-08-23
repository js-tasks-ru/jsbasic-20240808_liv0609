let vasya = { name: 'Вася', age: 25 };
let petya = { name: 'Петя', age: 30 };
let masha = { name: 'Маша', age: 28 };

let users = [ vasya, petya, masha ];

function namify(users) {
  const userNames = []
  for(let user of users){
    if(user.name){
      userNames.push(user.name)
    }
  }
  return userNames
}

let names = namify(users); // ['Вася', 'Петя', 'Маша']
console.log(names)