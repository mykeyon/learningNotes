##### 参考：https://juejin.im/post/5bde7c926fb9a049f66b8b52

#### new做了什么
    //例子1
    function Student(){};
    var student = new Student();
    console.log(student); // Student {}  student是一个对象
    console.log(toString.call(student)); //[object Object]
    /*
        平时我们也可以声明对象用new Object();
        new Object(不推荐使用)和Object()效果是一样的
    */
  在这个例子中，可以看出：声明一个函数用new操作符来调用后，生成了一个全新的对象。而且Student和Object都是函数，只不过Student使我们自定义的。Object是JS本身内置的。(如图image/img/01Student.png)
  与new Object()生成的对象不同的是new Student()生成的对象中间还嵌套了一层__proto__，它的constructor是Student这个函数。
    student.constructor === Student
    Student.prototype.constructor === Student;
###### 小结1：从这个例子可以看出，new操作符做了两件事：
  1.创建了一个全新的对象。
  2.这个对象会被执行[[Prototype]]（也就是__proto__）链接

    //例子2
    function Student(name){
      console.log('赋值前 - this', this); // Student {}
      this.name = name;
      console.log('赋值后 - this', this); // Student { name: '狗娃'}
    }
    var student = new Student('狗娃');
    console.log(student); // Student { name: '狗娃'}
  由此可以看出，这里Student函数中的this指向new Student()生成的对象student。
###### 小结2：从这个例子来看，new操作符又做了一件事：
  1.生成的新对象会绑定到函数调用的this。
    //例3
    function Student(name){
      this.name = name;
      //this.doSth = function(){
      //  return this.name;
      //}
    }
    Student.prototype.doSth = function(){
      //console.log(this.name);
      return this.name;
    }
    var student1 = new Student("狗娃");
    var student2 = new Student("狗剩);
    console.log(student1, student1.doSth()); //Student {name: "狗娃"} "狗娃"
    console.log(student2, student2.doSth()); //Student {name: "狗剩"} "狗剩"
    student1.__proto__ === Student.prototype; // true
    student2.__proto__ === Student.prototype; // true
    // __proto__ 是浏览器实现的查看圆形方案
    // 用ES5则是
    Object.getPrototypeOf(student1) === Student.prototype;
    Object.getPrototypeOf(student2) === Student.prototype;
  小结3：这个例子3再次验证了小结1中的第2点，也就是这个对象会被执行[[Prototype]](也就是__proto__)链接。并且通过new Student()创建的每个对象将最终被[[Prototype]]链接到这个Student.prototype对象上。

    注：原型关系图image/img/02JavaScript原型关系图.png
  
  小结4：如果函数没有返回对象类型Object(包含Function, Array, Date, RegExp, Error),那么new表达式中的函数调用会自动返回这个新的对象。

  结合这些小结，整理在一起就是：
   1.创建一个全新的对象。
   2.这个对象会被执行[[Prototype]](也就是__proto__)链接。
   3.生成的新对象会绑定到函数调用的this。
   4.通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
   5.如果函数没有返回对象类型Object(包含Function, Array, Date, RegExp, Error)，那么new表达式中的函数调用会自动返回这个全新的对象。


### new模拟实现
    function newOperator(ctor){
      if(typeof ctor !== 'function'){
        throw 'newOperator function the first param must be a function';
      }
      //ES6 new.target是指向构造函数
      newOperator.target = ctor;
      // 1.创建一个全新的对象
      // 2.并执行[[Prototype]]链接
      // 4.通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
      var newObj = Object.create(ctor.prototype);
      // ES5 arguments 转成数组 当然也可以用ES6[ ...arguments ], Array.from(arguments);
      // 除去ctor构造函数的其余参数
      var argsArr = [].slice.call(arguments, 1);
      //3.生成的新对象会绑定到函数调用的this
      //获取到ctor函数返回结构
      var ctorReturnResult = ctor.apply(newObj, argsArr);
      // 小结4中这些类型中合并起来只有Object和Function两种类型typeof null也是object所以要不等于null
      var isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null;
      var isFunction = typeof ctorReturnResult === 'function';
      if(isObject || isFunction){
        return ctorReturnResult;
      }
      //如果函数没有返回对象类型Object(包含Function, Array, Date, RegExp, Error),那么return newObj;
    }
    

### Object.create() 用法举例
    Object.create(proto, [propertiesObject])方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。它接受两个参数，不过第二个可选参数时属性描述符(不常用，默认是undefined)
      var anotherObject = {
        name: '狗娃'
      }
      var myObject = Object.create(anotherObject, {
        ang: {
          value: 18
        }
      })
      //获取它的原型
      Object.getPrototypeOf(anotherObject) === Object.prototype; //true 说明anotherObject的原型是Object.prototype
      Object.getPrototypeOf(myObject); //{ name: '狗娃'} 说明myObject的原型是{ name: '狗娃'}
      myObject.hasOwnProperty('name'); //false 说明name是原型上的
      myObject.hasOwnProperty('age'); //true 说明age是自身的
      myObject.name; //狗娃
      myObject.age: //18