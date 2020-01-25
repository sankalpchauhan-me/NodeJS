// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const calc1 = require('./test-module1');
const cal = new calc1();
console.log(cal.add(2,5));

// exports
//const cal2 = require('./test-module2');
//Instead of importing whole module we can import specific functionalities of that module
const {add, multiply}  = require('./test-module2');
console.log(add(2,5));

//Caching
require('./test-module3')(); // We require the module an d call it right away
require('./test-module3')(); 
require('./test-module3')(); 
//The Hello from module 3 is called only once because after that the module is cached and exports is only called

