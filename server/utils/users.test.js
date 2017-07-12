const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Harshit',
            room: 'Student'
        },{
            id: 2,
            name: 'Jaini',
            room: 'Student'
        },{
            id: 3,
            name: 'Vivek',
            room: 'Stone'
        }];
    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Harshit',
            room: 'Student'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = 1;
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = 99;
        var user = users.getUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = 1;
        var resUser = users.getUser(userId);
        expect(resUser.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 4;
        var resUser = users.getUser(userId);
        expect(resUser).toNotExist();
    });

    it('should return names for Student room', () => {
        var userList = users.getUserList('Student');
        expect(userList).toEqual(['Harshit','Jaini']); 
    })

    it('should return names for Stone room', () => {
        var userList = users.getUserList('Stone');
        expect(userList).toEqual(['Vivek']); 
    })
})