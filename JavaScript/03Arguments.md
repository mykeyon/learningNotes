##### 参考：http://louiszhai.github.io/2015/12/15/arguments/
### 详解JS之Arguments对象

## 概述：
 Arguments对象已经不再是函数的属性了，它是函数内部的本地变量，包括如下几个属性：
  1.callee——指向当前函数的引用
  2.length——真正传递的参数个数
  3.properties-index(字符串类型的整数)属性值就是函数的参数值(按参数列表从左到右排序)，properties-indexs内部元素的个数等于arguments.length,properties-indexs的值和实际传递进来的参数直接是共享的。

##### arguments.callee引用来写几个常见的递归，如下：
  //求阶乘 1*2*3*...
  function n(i){
    return i < 2 ? 1 : i*arguments.callee(i-1);
  }
  console.log(n(5)); //120
  //求1+2+3+...
  function m(i){
    return i < 2 ? 1 : i + arguments.callee(i-1);
  }
  console.log(m(5));
  //斐波那契1,1,2,3,5,8...
  function q(i){
    var _f = arguments.callee;
    return i < 3 ? 1 : _f(i-1) + _f(i-2);
  }
  console.log(q(5)); //5
  遗憾的是：严格模式下("use string")下，arguments.callee并不可用

##### arguments.length
  js方法中形参个数并不能实际泛型实参个数，所幸的是arguments.length可以获取实参个数，如下：
  function a(a,b,c){
    console.log("实参个数是："+arguments.length)
  }
  a(1,2); //实参个数是：2

##### arguments[]
  这个共享其实不是真正的共享一个内存地址，而是2个不同的内存地址，使用JavaScript引擎来保证2个值是随时一样的，当然这也有一个前提，那就是这个索引值小于你传入的参数个数，也就是说如果你只传2个参数，而还继续使用arguments[2]赋值的话，就会不一致(索引从0开始)，例如：
    function b(x,y,z){
      arguments[2] = 10; //参数可以被重新赋值
      console.log(z);
    }
    b(1,2) //undefined
  这时候因为没有传递第三个参数z，所以赋值10以后，console.log(z)的结果仍然为undefined，而不是10.

鸭式辨型
  arguments对象并不是一个真正的Array，它类似于数组，但没有数组所持有的属性和方法，除了length。例如，它没有pop方法，不过可以将其转化为数组。
    var args = Array.prototype.slice.call(arguments); //args为数组
  项上面这种arguments虽然不是数组，但我们可以把它当成数组处理，这种现象叫做：鸭式辨型
    如果一个对象可以像鸭子一样走路，有用，并且嘎嘎嘎叫，就认为这个对象是鸭子，哪怕它并不是从鸭子对象继承过来的。
  在JavaScript里面，很多函数都不做对象类型的检测，而是只关心这些对象能做什么，因此，我们尽可利用鸭式辨型的便利，以下就充分演示了把arguments当做一个数组处理。
  //合并参数
  function myConcat(separator){
    var args = Array.prototype.slice.call(arguments,1); //相当于arguments调用了Array的slice方法
    return args.join(separator);
  }
  console.log(myConcat('','hello','world')); //helloworld

  警告：此处不应该arguments对象上使用slice方法，这会阻碍JavaScript引擎的优化(比如V8引擎)。作为替代，应通过遍历arguments对象的方式来构建一个新的数组。
  如果Array generics可以用的话，可以使用下面代码替代：
    var args = Array.slice(arguments); //注意，arguments对象仅在函数的内部有效
