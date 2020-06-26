//例子1
// function Student(){

// }
// var student = new Student();
// console.log(student);
// console.log(toString.call(student));
// console.log(student.constructor === Student);
// console.log(Student.prototype.constructor === Student);

//例子2
// function Student(name){
//   console.log("赋值前 - this", this);
//   this.name = name;
//   console.log("赋值后 - this", this);
// }
// var student = new Student("狗娃");
// console.log(student);

//例3
function Student(name){
  this.name = name;
  // this.doSth = function(){
  //   //console.log(this.name);
  //   return this.name;
  // }
}
Student.prototype.doSth = function(){
  // console.log(this.name);
  return this.name;
}
var student1 = new Student("狗娃");
var student2 = new Student("狗剩");
console.log(student1, student1.doSth());
console.log(student2, student2.doSth());
console.log(student1.__proto__ === Student.prototype);
console.log(student2.__proto__ === Student.prototype);
console.log("------------");
console.log(Object.getPrototypeOf(student1) === Student.prototype);
console.log(Object.getPrototypeOf(student2) === Student.prototype);