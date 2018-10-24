const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });
  it('should add a new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Gautham',
      room: 'Swaft Nation'
    };
    let responseUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toMatchObject([user]);
  });

  it('should remove a user', () => {
    let responseUser = users.removeUser('1');
    expect(responseUser).toEqual({id: '1', name: 'Mike', room: 'Node Course'});
    expect(users.users).toEqual([{id: '2', name: 'Jen', room: 'React Course'}, {id: '3', name: 'Julie', room: 'Node Course'}]);
  });

  it('should not remove a user', () => {
    let responseUser = users.removeUser('5');
    expect(responseUser).toBeFalsy();
  });

  it('should find user', () => {
    let responseUser = users.getUser('1');
    expect(responseUser).toEqual({id: '1', name: 'Mike', room: 'Node Course'});
  });

  it('should not find user', () => {
    let responseUser = users.removeUser('5');
    expect(responseUser).toBeFalsy();
  });

  it('should return names for node course', () => {
    let userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });

  it('should return names for react course', () => {
    let userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});
