var moment = require('moment');

// var date = moment();
// date.add(1, 'year');
// console.log(date.format('MMM Do, YYYY'));

var someTime = moment().valueOf();
console.log(someTime);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));