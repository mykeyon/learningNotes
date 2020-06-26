console.log(String.fromCharCode(65, 66, 67));
console.log(String.fromCharCode(97, 98, 99));
console.log(String.fromCharCode(42));
console.log(String.fromCharCode(43));
console.log(String.fromCharCode(45));
console.log(String.fromCharCode(47));
console.log("--------------------");
console.log("𝌆".codePointAt());
console.log(String.fromCharCode(119558));
console.log(String.fromCodePoint(119558));
// console.log(String.fromCodePoint('abc'));  直接报错
// console.log(String.fromCodePoint(Infinity));
// console.log(String.fromCodePoint(-1.23));

console.log("---------------------");
console.log(`a\nb\tc`);
console.log(String.raw`a\nb\tc`);
console.log(String.raw({raw: 'abcd'}, 1,2,3));
console.log(String.raw({raw: 'abcd'}, 1,2,3,4,5,6));
console.log("------------------------");
console.log("hello, world".charAt(8));
console.log("hello, world".charCodeAt(8));
console.log("前端工程师".charCodeAt(2));
console.log("早".concat("上","好"));

console.log("----------------");
var str1 = "";
var str2 = "";
console.time("concat");
for(var i = 0; i < 10000; i++){
  str2.concat("")
}
console.timeEnd("concat");
console.time("++++");
for(var i=0; i<10000; i++){
  str1+='';
}
console.timeEnd("++++");

console.log("".indexOf("",100)) //0
console.log("IT改变世界".indexOf("世界")) //4
console.log("IT改变世界".lastIndexOf("世界")); //4

var str = "World Internet Conference";
console.log(str.match(/[a-d]/i));
console.log(str.match(/[a-d]/gi));
console.log(/[a-d]/gi.test(str));
console.log(/[a-d]/gi.exec(str));

var str = "abcdefg";
console.log(str.search(/[d-g]/));

var str = "It is our choices that show what we truly are, far more than our abilities";
console.log(str.slice(0,-30)); //It is our choices that show what we truly ar
console.log(str.slice(-30));  //e, far more than our abilities

var str = "today is a summy day";
console.log(str.split());
console.log(str.split(""));
console.log(str.split(" "));
console.log(str.split(" ",1))
console.log(str.split(/\s*is\s*/)); //[ 'today', 'a summy day' ]
console.log(str.split(/(\s*is\s*)/));

var str = "Yesterday is history. Tomorrow is mystery. But today is a gift";
console.log(str.substr(47));
console.log(str.substr(-15));

var str = "Get outside every day. Miracles are waiting everywhere.";
console.log(str.substring(1,1),1);
console.log(str.substring(0));
console.log(str.substring(-1));
console.log(str.substring(0,100));
console.log(str.substring(22,NaN));

console.log("ABCdE".toLocaleLowerCase());
console.log("abcDe".toLocaleUpperCase());
console.log("ABCDe".toLowerCase());
console.log("abcdE".toUpperCase());


var str = "abc";
console.log(str.toString()); //abc
console.log(str.toString() === str.valueOf()); //true

var x = {
  toString: function(){ return "test" },
  valueOf: function(){ return 123 }
}
console.log(x);   //{ toString: [Function: toString], valueOf: [Function: valueOf] }
console.log("x=" + x); //x=123
console.log(x + "=x"); //123=x
console.log(x+"1");  //1231
console.log(x+1);  //124
console.log(["x=",x].join("")); //x=test

console.log("a".codePointAt(0));
console.log("\u4f60\u597d".codePointAt(0));
console.log("好啊".codePointAt(0));

var str = "Practice makes perfect.";
console.log(str.includes("perfect"))
console.log(str.includes("perfect",100))

var str = "Learn and live.";
console.log(str.endsWith("live."));
console.log(str.endsWith("Learn",5))

var str = "\u4f60\u597d";
console.log(str.normalize());
console.log(str.normalize('NFC'));
console.log(str.normalize('NFD'));
console.log(str.normalize('NFKC'));
console.log(str.normalize('NFKD'));

var str = 'hello';
console.log(str.repeat(0));
console.log(str.repeat(1));
console.log(str.repeat(2));
console.log(str.repeat(-1));