function curry(func, minArgs){
  if(minArgs == undefined){
    minArgs = 1;
  }
  function A(frozenargs){
    return function(){ //优化处理，如果调用没有参数，返回该函数本身
      var args = Array.prototype.slice.call(arguments);
      var newArgs = frozenargs.concat(args);
      if(newArgs.length >= minArgs){
        return func.apply(this, newArgs);
      }else{
        return A(newArgs);
      }
    }
  }
  return A([]);
}
var plus = curry(function(){
  var result = 0;
  for(var i = 0; i < arguments.length; ++i){
    result += arguments[i]
  }
  return result;
},2);
console.log(plus(2,3)); //正常调用，返回5
console.log(plus(3))
console.log(plus()(3)()()(2)); //返回5
console.log(plus(3,2,4,5)); //可以接收多个参数，返回14
console.log(plus(3)(2,3,5)); //同理，返回13

console.log("---------------");
var minus = curry(function(x){
  var result = x;
  for(var i = 1; i < arguments.length; ++i){
    result -= arguments[i];
  }
  return result;
},2);
console.log(minus(5,3)); //正常返回，返回2
console.log(minus(5)(3)); //完整返回，返回2
console.log(minus()(5)()(2));  //返回3
console.log(minus(8)(2,3,5)); //接收多个参数返回-2 

var flip = curry(function(f){
  return curry(function(a,b){
    return f(b,a);
  },2)
});
var flip_minus = flip()(minus); //返回一个具有柯里化能力的函数
console.log(flip_minus(2)(10)); //8
console.log(flip_minus()(1)()(6)); //5