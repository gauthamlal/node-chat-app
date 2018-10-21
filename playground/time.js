const moment = require('moment');
/*
let date = new Date();

console.log(date.getMonth());*/

let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

let createdAt = 1234;
let date = moment(createdAt);
/*date.add(100, 'year').subtract(100, 'months');
console.log(date.format('MMM Do, YYYY'));*/

console.log(date.format('h:mm a'));
