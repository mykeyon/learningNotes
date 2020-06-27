console.log(Array(8));
var b = [];b.length = 8;
console.log(b);
console.log(Array.of(8));

console.log(Array.of(8.0, 5)); //[8,5]
console.log(Array(8.0,5)); //[8,5]
console.log(Array.of("8")); //["8"]
console.log(Array("8")); //["8"]

console.log("--------------");
var obj = {0: 'a', 1: 'b', 2: 'c', length: 3};
var arr = Array.from(obj,function(value,index){
  console.log(value, index, this, arguments.length);
  return value.repeat(3); //必须指定返回值，否则返回undefined
},obj);
console.log(obj);
console.log(arr);
console.log("----------------");
console.log(Array.from('abc'))
console.log(Array.from(new Set(['abc', 'def'])))
console.log(Array.from(new Map([[1, 'abc'],[2, 'def']])))
function fn(){
  return Array.from(arguments);
}
console.log(fn(1,2,3))
console.log(Array.from({length: 10},(v,i)=>i))

var a = [];
console.log(a instanceof Array);
console.log(a.constructor === Array);
console.log(Array.prototype.isPrototypeOf(a));
console.log(Object.getPrototypeOf(a) === Array.prototype);
console.log(Object.prototype.toString.apply(a) === '[object Array]');
console.log("========================");
var a = {
  __proto__ : Array.prototype
}
console.log(a instanceof Array);
console.log(a.constructor === Array);
console.log(Array.prototype.isPrototypeOf(a));
console.log(Object.getPrototypeOf(a) === Array.prototype);
console.log(Object.prototype.toString.apply(a) === '[object Array]');
// console.log([for(i of [1,2,3,4]) i*i]);
console.log(Array.isArray(Array.prototype));
console.log(Array.prototype.length)
console.log([].__proto__.length); //0
console.log([].__proto__); //[]
console.log(Object.getOwnPropertyNames(Array.prototype));

var array = ["cat", "dog", "cow", "chicken", "mouse"];
var item = array.pop();
console.log(array); //["cat", "dog", "cow", "chicken"];
console.log(item); //mouse

var o = { 0: 'cat', 1: 'dog', 2: 'cow', 3: 'chicken', 4: 'mouse', length: 5};
var item = Array.prototype.pop.call(o);
console.log(o);
console.log(item);

var array = ["football", "basketball", "volleyball", "Table tennis", "badminton"];
var i = array.push("golfball");
console.log(array);
console.log(i); //6

var o = {0: 'football', 1: 'basketball'};
var i = Array.prototype.push.call(o,'golfball');
console.log(o); //Object{0: 'golfball', 1: 'basketball', length: 1}
console.log(i); //1

var o = {0: 'football', 1: 'basketball', length: 1};
var i = Array.prototype.push.call(o, 'golfball');
console.log(o);
console.log(i); //2

var array = ["football", "basketball"];
var array2 = ["volleyball", "golfball"];
var i = Array.prototype.push.apply(array, array2);
console.log(array);
console.log(i); //4

var array = [1,2,3,4,5];
var array2 = array.reverse();
console.log(array); //[5,4,3,2,1];
console.log(array2 === array );

var o = {0: "a", 1: "b", 2: "c", length: 2};
var o2 = Array.prototype.reverse.call(o);
console.log(o);
console.log(o === o2);

var o = { 0: "a", 1: "b", 2: "c", length: 100};
var o2 = Array.prototype.reverse.call(o);
console.log(o);
console.log(o === o2); //true

var array = [1,2,3,4,5];
var item = array.shift();
console.log(array); //[2,3,4,5];
console.log(item); //1

var o = {0: "a", 1: "b", 2: "c", length: 3};
var item = Array.prototype.shift.call(o);
console.log(o); //{0: "b", 1: "c", length: 2}
console.log(item); //"a"

var o = {0: "a", 1: "b", 2: "c"};
var item = Array.prototype.shift.call(o);
console.log(o); //{0: "a", 1: "b", 2: "c", length: 0};
console.log(item); //undefined

var array = ["apple", "Boy", "Cat", "dog"];
var array2 = array.sort();
console.log(array); //["Boy", "Cat", "apple", "dog"];
console.log(array === array2); //true

var array = ["互", "联", "网", "改", "变", "世", "界"];
var array2 = array.sort();
var array = ["互", "联", "网", "改", "变", "世", "界"];
var array3 = array.sort(function(a,b){
  return a.localeCompare(b);
});
console.log(array2);
console.log(array3);

var array = ["apple", "boy"];
var splices = array.splice(1,1);
console.log(array); //["apple"]
console.log(splices); //["boy"]

array = ["apple", "boy"];
splices = array.splice(2,1,"cat");
console.log(array); //["apple", "boy", "cat"]
console.log(splices); //[]

console.log("-------------------------------");
array = ["apple", "boy"];
splices = array.splice(-2,1,"cat");
console.log(array); //["cat", "boy"]
console.log(splices); //["apple"]

array = ["apple", "boy"];
splices = array.splice(-3,1,"cat");
console.log(array); //["cat", "boy"]
console.log(splices); //["apple"]


array = ["apple", "boy"];
splices = array.splice(0, 3,"cat");
console.log(array); //["cat"]
console.log(splices); //["apple", "boy"];


var o = { 0: "apple", 1: "boy", length: 2};
var splices = Array.prototype.splice.call(o,1,1);
console.log(o); //{ 0: "apple", length: 1};
console.log(splices); //["boy"]

var array = ['a', 'b', 'c'];
array.splice(array.indexOf('b'),1);
console.log(array);
console.log("------------------unshift--");
var array = ["red", "green", "blue"];
var length = array.unshift("yellow");
console.log(array); //["yellow", "red", "green", "blue"];
console.log(length); //4

var array = ["red", "green", "blue"];
var length = array.unshift(["yellow"]);
console.log(array); //[["yellow"], "red", "green", "blue"];
console.log(length); //4

var o = { 0: "red", 1: "green", 2: "blue", length: 3};
var length = Array.prototype.unshift.call(o, "yellow");
console.log(o); //{ 0: "yellow", 1: "red", 2: "green", 3: "blue", length: 4};
console.log(length); //4

var o = { 0: "red", 1: "green", 2: "blue"};
var length = Array.prototype.unshift.call(o, "yellow");
console.log(o); //{ 0: "yellow", 1: "red", 2: "green", 3: "blue", length: 1};
console.log(length); //4
console.log("-----------------------------concat-");
var array = [1,2,3];
var array2 = array.concat(4,[5,6],[7,8,9]);
console.log(array); //[1,2,3]
console.log(array2); //[1,2,3,4,5,6,7,8,9]

var array = [{a: 1}];
var array3 = array.concat();
console.log(array3); //[{a: 1}];
console.log(array3 === array); //false
console.log(array[0] === array3[0]); //true 

var o = {0: 'a', 1: 'b', 2: 'c', length: 3};
var o2 = Array.prototype.concat.call(o,'d',{3: 'e', 4: 'f', length: 2},['g','h','i'])
console.log(o2);
console.log("----------------join--");
var array = ["we", "are", "Chinese"];
console.log(array.join()); //"we,are,Chinese"
console.log(array.join("+")); //"we+are+Chinese"
console.log(array.join('')); //"weareChinese"

var o = {0: "we", 1: "are", 2: "Chinese", length: 3};
console.log(Array.prototype.join.call(o,'+')); //"we+are+Chinese"
console.log(Array.prototype.join.call('abc')); //"a,b,c"
console.log("----------------------slice--");
var array = ["one", "two", "three", "four", "five"];
console.log(array.slice());  //["one", "two", "three", "four", "five"];
console.log(array.slice(2,3));//["three"]


var array = [{color: "yellow"}, 2,3];
var array2 = array.slice(0,1);
console.log(array2); //[{color: "yellow"}];
array[0]["color"] = "blue";
console.log(array2); //[{color: "blue"}]

console.log([1,2,3].slice(-1)); //[3]
var o = {0: {"color": "yellow"},1: 2, 2: 3, length: 3};
var o2 = Array.prototype.slice.call(o,0,1);
console.log(o2); //[{color: "yellow"}]
console.log("-----------------------toString--");
var array = ["Jan", "Feb", "Mar", "Apr"];
var str = array.toString();
console.log(str);
console.log(array+'');
var str = ["Jan", "Feb", "Mar", "Apr"] + ',May';
console.log(str); //Jan,Feb,Mar,Apr,May

var o = {0: "Jan", 1: "Feb", 2: "Mar", length: 3};
var o2 = Array.prototype.toString.call(o);
console.log(o2);
console.log(o.toString() === o2);
var o = {0: 'Jan', 1: 'Feb', 2: 'Mar', length: 3, join: function(){ return Array.prototype.join.call(this)}};
console.log(Array.prototype.toString.call(o));
console.log("-------------------toLocaleString---");
var arr = [{ name: 'zz'}, 123456, 'abc', new Date()];
var str = arr.toLocaleString();
console.log(str);
var o = {
  0: 123456, 1: 'abc', 2: new Date(), length: 3,
  join: function(){
    return Array.prototype.join.call(this)
  }
};
console.log(Array.prototype.toLocaleString.call(o));
console.log("---------------------------indexOf-");
var array = ['abc', 'def', 'ghi', '123'];
console.log(array.indexOf('def')); //1
console.log(array.indexOf('def', -1)) //-1
console.log(array.indexOf('def', -4)); //1
console.log(array.indexOf('def', -9)); //1
console.log(array.indexOf(123)); //-1
var o = { 0: 'abc', 1: 'def', 2: 'ghi', length: 3};
console.log(Array.prototype.indexOf.call(o,'ghi',-4)); //2
console.log("----------------------------forEach-");
var array = [1,3,5];
var obj = {name: 'cc'};
var sReturn = array.forEach(function(value, index, array){
  array[index] = value * value;
  console.log(this.name); //cc被打印了三次
},obj);
console.log(array); //[1, 9, 25];
console.log(sReturn); //undefined
var o = { 0: 1, 1: 3, 2: 5, length: 3};
Array.prototype.forEach.call(o,function(value,index,obj){
  console.log(value,index,obj);
  obj[index] = value * value;
},o);

console.log(o);

var o = { 0: 10, 1: 8, 2: 25, length: 3};
var bool = Array.prototype.every.call(o,function(value,index,obj){
  return value >=8;
},o);
console.log(bool); //true

var array = [18, 9, 10, 35, 80];
var array2 = array.filter(function(value, index,array){
  return value > 20;
});
console.log(array2); //[35, 80]

var array = [1, 2, 3, 4];
var s = array.reduce(function(previousValue, value, index, array){
  return previousValue * value;
},1);
console.log(s); //24
var a = array.reduce((p,v)=>p*v,2);
console.log(a);
console.log();
var array = ['a', 'b', 'c'];
var iterator = array.entries();
console.log(iterator.next().value); //[0, 'a']
console.log(iterator.next().value); //[1, 'b']
console.log(iterator.next().value); //[2, 'c']
console.log(iterator.next().value); //undefined