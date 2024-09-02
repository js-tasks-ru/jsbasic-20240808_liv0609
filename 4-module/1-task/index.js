// const { JSDOM } = require('jsdom');
// const { window } = new JSDOM('<!doctype html><html><body></body></html>');
// const document = window.document;

function makeFriendsList(friends) {
  const friendList = document.createElement('ul');

  friends.forEach(friend => {
    let element = document.createElement('li');
    element.innerHTML = `${friend.firstName} ${friend.lastName}`;
    friendList.append(element);
  });

  return friendList;
}

