/*[{
  id:
}]*/

class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let removedUser = this.users.filter( user =>  user.id === id);
    let newUsers = this.users.filter( user =>  user.id !== id);
    this.users = newUsers;
    return removedUser[0];
  }

  getUser (id) {
    let newUsers = this.users.filter( user =>  user.id === id);
    return newUsers[0];
  }

  getUserList (room) {
    let users = this.users.filter( user =>  user.room === room);
    let namesArray =users.map( user => user.name);
    return namesArray;
  }
}

module.exports = {Users};
