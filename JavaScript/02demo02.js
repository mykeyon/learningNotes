function Father(){
  this.color = ["red", "blue", "green"]
}
function Son(){
  Father.call(this); //继承了Father，且向父类型传递参数
}
var instance1 = new Son();
instance1.color.push("black");
console.log(instance1.color); 
var instance2 = new Son();
console.log(instance2.color);
console.log("------------------");
function Father(name){
  this.name = name;
  this.color = ["red", "blue", "green"];
}
Father.prototype.sayName = function(){
  console.log("Father.prototype", this.name)
}
function Son(name, age){
  Father.call(this,name); //继承实例属性，第一次调用Father()
  this.age = age;
}
Son.prototype = new Father(); //继承父类方法，第二次调用Father();
Son.prototype.sayAge = function(){
  console.log("Son.prototype", this.age)
}
var instance1 = new Son("狗子", 5);
instance1.color.push("black");
console.log(instance1.color);
instance1.sayName();
instance1.sayAge();
var instance2 = new Son("狗剩", 8);
console.log(instance2.color);
instance2.sayName();
instance2.sayAge();

console.log("===================");
function object(o){
  function F(){};
  F.prototype = o;
  return new F();
}
var person = {
  friends: ["狗娃", "狗剩", "铁蛋"]
}
var anotherPerson = object(person);
anotherPerson.friends.push("铁军");
var yetAnotherPerson = object(person);
yetAnotherPerson.friends.push("马驹");
console.log(person.friends);

var person = {
  friends: ["狗娃", "狗剩", "狗蛋"]
}
var anotherPerson = Object.create(person);
anotherPerson.friends.push("铁蛋");
var yetAntotherPerson = Object.create(person); 
yetAntotherPerson.friends.push("铁军");
console.log(person.friends); //[ '狗娃', '狗剩', '狗蛋', '铁蛋', '铁军' ]

var person = {
  name: "狗娃"
}
var anotherPerson = Object.create(person,{
  name: {
    value: "狗剩"
  }
});
console.log(anotherPerson.name) //狗剩