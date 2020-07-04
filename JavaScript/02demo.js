function Father(){
  this.prototype = true;
}
Father.prototype.getFatherValue = function(){
  return this.prototype;
}
function Son(){
  this.sonProperty = false;
}
//继承Father
Son.prototype = new Father(); //Son.prototype被重写，导致Son.prototype.constructor.constructor也一同被重写
Son.prototype.getSonValue = function(){
  return this.sonProperty;
}
var instance = new Son();
console.log(instance.getFatherValue());
console.log(instance.getSonValue());

console.log(instance instanceof Object); //true
console.log(instance instanceof Father); //true
console.log(instance instanceof Son); //true
console.log("--------------");
console.log(Object.prototype.isPrototypeOf(instance)); //true
console.log(Father.prototype.isPrototypeOf(instance)); //true
console.log(Son.prototype.isPrototypeOf(instance)); //true