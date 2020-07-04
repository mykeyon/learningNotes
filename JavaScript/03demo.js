function n(i){
  return i < 2 ? 1 : i*arguments.callee(i-1);
}

console.log(n(5)); //120
function m(i){
  return i < 2 ? 1 : i + arguments.callee(i-1)
}
console.log(m(5));

function q(i){
  var _f = arguments.callee;
  return i < 3 ? 1 : _f(i-1) + _f(i-2);
}
console.log(q(7));

function a(a,b,c){
  console.log("实参个数是："+arguments.length)
}
a(1,2); //实参个数是：2

function b(x,y,z){
  arguments[2] = 10; //参数可以被重新赋值
  console.log(z);
  var args = Array.prototype.slice.call(arguments);
  console.log(args);
}
b(1,2) //undefined

//合并参数
function myConcat(separator){
  var args = Array.prototype.slice.call(arguments,1); //相当于arguments调用了Array的slice方法
  return args.join(separator);
}
console.log(myConcat('','hello','world'));