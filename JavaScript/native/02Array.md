### 参考地址：http://louiszhai.github.io/2017/04/28/array
# JavaScript数组所有API全解密
### Array构造器方法
  Array构造器用于创建一个新的数组。通常，我们推荐使用对象字面量创建数组，这是一个好习惯，但是总有对象字面量乏力的时候，比如说，我想创建一个长度为8的空数组，
    //使用Array构造器
    var a = Array(8); //[ <8 empty items> ]
    //使用对象字面量
    var b = [];
    b.length = 8; //[ <8 empty items> ]
  Array构造器明显要简洁一些。
  如上，我们使用了Array(8) 而不是new Array(8)，这会有影响吗？实际上，并没有影响，这得益于Array构造器内部对this指针的判断。
  从规范来看，浏览器内部大致做了如下类似的实现：
    function Array(){
      //如果this不是Array的实例，那就重新new一个实例
      if(!(this instanceof arguments.callee)){
        return new arguments.callee();
      }
    }
  Array构造器根据参数长度的不同，有如下两种不同的处理：
    1.new Array(arg1,arg2,...),参数长度为0或者长度大于等于2时，传入的参数将按照顺序依次称为新数组的第0至N项(参数长度为0时，返回空数组)。
    2.new Array(len), 当len不是数值时，返回一个只包含len元素一项的数组；当len为数值时，len最大不能超过32位无符号整型，即需要小于2的32次方(len最大为Math.pow(2,32) -1或-1>>>0),否则抛出RangeError。
##### ES6新增的构造函数的方法
  鉴于数组的常用性，ES6专门扩展了数组构造器Array，新增2个方法：Array.of, Array.from。
    Array.of
      Array.of用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数时数字还是其它。它基本上与Array构造器功能一直，唯一的区别就在于当个数字参数的处理。如下：
        Array.of(8.0); //[ 8 ]
        Array(8.0); //[ <8 empty items> ]
      参数为多个， 或单个参数不是数字时，Array.of 和 Array构造器等同。
        Array.of(8.0, 5); //[8,5]
        Array(8.0,5); //[8,5]
        Array.of("8"); //[ '8' ]
        Array("8"); //[ '8' ]
      因此，若是需要使用数组报过元素，推荐优先使用Array.of方法
      对于浏览器不支持Array.of方法的兼容：
        if(!Array.of){
          Array.of = function(){
            return Array.prototype.slice.call(arguments);
          }
        }
    Array.from
      语法：Array.from(arrayLike[, processingFn [, thisArg]])
      Array.from的设计初衷是快速便捷的基于其他对象创建新数组，准确的来说就是从一个类数组的可迭代对象创建一个新的数组实例，说人话就是，只要一个对象有迭代器，Array.from就能把它变成一个数组(当然，返回新的数组，不改变原对象)。
      从语法上来看，Array.from拥有3个形参，第一个类似数组的对象，必选。第二个为加工函数，新生成的数组会经过该函数的加工再返回。第三个为this作用域，表示加工函数执行时this的值。后两个参数都是可选的。
        var obj = {0: 'a', 1: 'b', 2: 'c', length: 3};
        Array.from(obj,function(value,index){
          console.log(value, index, this, arguments.length);
          return value.repeat(3); //必须指定返回值，否则返回undefined
        },obj);
      可以看出加工函数的this作用域被obj对象取代，也可以看到加工函数默认拥有两个形参，分别为迭代器当前元素的值和其索引。
      注意：一旦使用加工函数，必须明确指定返回值，否则将隐式的返回undefined，最终生成的数组也会变成一个只包含若干个undefined元素的空数组。
      实际上，如果不需要指定this，加工函数完全可以是一个箭头函数，上诉代码可以简化为：
        Array.from(obj,value=>value.repeat(3));
      除了上诉obj对象以外，拥有迭代器的对象还包括这些：String,set,Map,arguments等，Array.from统统可以处理。如下所示：
        //String
        Array.from('abc'); //['a', 'b', 'c']
        //Set
        Array.from(new Set(['abc', 'def'])); //['abc', 'def']
        //Map
        Array.from(new Map([[1, 'abc'],[2, 'def']])); //[[1,'abc'],[2, 'def']]
        //天生的类数组对象Arguments
        function fn(){
          return Array.from(arguments);
        }
        fn(1,2,3); //[1,2,3];
      使用Array.from生成一个从0到指定数字的新数组。
        Array.from({length: 10},(v,i)=>i);

  Array.isArray
    顾名思义，Array.isArray用来判断一个变量是否是数组类型。JS的弱类型机制导致判断变量是初级前端面试时的必考题。
      var a = [];
      //1.基于instanceof
      a instanceof Array
      //2. 基于constructor
      a.constructor === Array
      //3.基于Object.prototype.isPrototypeOf
      Array.prototype.isPrototypeOf(a);
      //4.基于getPrototypeOf
      Object.getPrototypeOf(a) === Array.prototype;
      //5.基于Object.prototype.toString
      Object.prototype.toString.apply(a) === '[object Array]';
    以上，除了Object.prototype.toString外，其他方法都不能正确判断变量的类型。
      var a = {
        __proto__: Array.prototype
      };
      //1.基于instanceof
      a instanceof Array; //true
      //2.基于constructor
      a.constructor === Array // true
      //3.基于Object.prototype.isPrototypeOf
      Array.prototype.isPrototypeOf(a); // true
      //4.基于getPrototypeOf
      Object.getPrototypeOf(a) === Array.prototype; // true
      //5.基于Object.prototype.toString
      Object.prototype.toString.apply(a) === '[object Array]' //false

  数组推到(只是ES6草案中出现，只有fixFox实现了)

### 原型
  原型的尝试告诉我们，JS中所有的数组方法均来自于Array.prototype，和其他构造函数一样，可以通过Array的prototype属性上的方法来给所有数组实例增加方法。
  值得一说的是，Array.prototype本身就是一个数组。
    Array.isArray(Array.prototype); //true
    console.log(Array.prototype.length); 0
  以下方法可以进一步验证：
    console.log([].__proto__.length); //0
    console.log([].__proto__); //[]
### 方法
  数组原型提供的方法非常之多，主要分为三种，一种是会改变自身值的，一种是不会改变自身值的，另外一种是遍历方法。
  由于Array.prototype的某些属性被设置为[[DontEnum]],因此不能用一般的方法进行遍历，我们可以通过如下方式获取Array.prototype的所有方法：
  Object.getOwnPropertyNames(Array.prototype);[ 'length','constructor','concat','pop',
  'push','shift','unshift','slice','splice','includes','indexOf','keys','entries','forEach','filter','map','every','some','reduce','reduceRight','toString','toLocaleString','join','reverse','sort','lastIndexOf','copyWithin','find','findIndex','fill' ]

## 改变自身的方法(9个)
  基于ES6，改变自身值的方法一共有几个，分别是：pop、push、reverse、shift、sort、splice、unshift,以及ES6新增的方法copyWithin和fill。
  对于能改变自身值的数组方法，日常开发需要特别注意，进了避免在循环遍历中去改变原数据的项。

  pop
  pop()方法删除数组中最后一个元素，并且返回这个元素。如果是栈的话，这个过程就是栈顶弹出。
    var array = ["cat", "dog", "cow", "chicken", "mouse"];
    var item = array.pop();
    console.log(array); //["cat", "dog", "cow", "chicken"];
    console.log(item); //mouse
  由于设计上的巧妙，pop方法可以应用在类数组对象上，即鸭式辨型，如下：
    var o = { 0: 'cat', 1: 'dog', 2: 'cow', 3: 'chicken', 4: 'mouse',length: 5};
    var item = Array.prototype.pop.call(o);
    console.log(o); //{ '0': 'cat', '1': 'dog', '2': 'cow', '3': 'chicken', length: 4 }
    console.log(item); //mouse
  单如果类数组对象不具有length属性，那么该对象将被创建length属性，length值为0,如下：
    var o = { 0: 'cat', 1: 'dog', 2: 'cow', 3: 'chicken', 4: 'mouse'};
    var item = Array.prototype.pop.call(o);
    console.log(o); //{ '0': 'cat', '1': 'dog', '2': 'cow', '3': 'chicken', length: 0 }
    console.log(item); //undefined

  push
  push()方法天津一个或多个元素到数组末尾，并且返回数组的长度。如果栈的话，这个过程就是栈顶压入。
  语法：arr.push(element1,...elementN)
    var array = ["football", "basketball", "volleyball", "Table tennis", "badminton"];
    var i = array.push("golfball");
    console.log(array);[ 'football','basketball','volleyball','Table tennis','badminton','golfball' ]
    console.log(i); //6
  同pop方法一样，push方法也可以应用到类数组对象上，如果length不能被转成一个数值或者不存在length属性时，则插入的元素索引为0，且length属性不存在，将会创建它。
    var o = {0: 'football', 1: 'basketball'};
    var i = Array.prototype.push.call(o,'golfball');
    console.log(o); //Object{0: 'golfball', 1: 'basketball', length: 1}
    console.log(i); //1
  实际上，push方法是根据length属性来觉得从哪里开始插入给定的值。
    var o = {0: 'football', 1: 'basketball', length: 1};
    var i = Array.prototype.push.call(o, 'golfball');
    console.log(o); //{ '0': 'football', '1': 'golfball', length: 2 }
    console.log(i); //2
  利用push根据length属性插入元素的这个特点，可以实现数组合并，如下：
    var array = ["football", "basketball"];
    var array2 = ["volleyball", "golfball"];
    var i = Array.prototype.push.apply(array, array2);
    console.log(array); //[ 'football', 'basketball', 'volleyball', 'golfball' ]
    console.log(i); //4

  reverse
    reverse()方法跌倒数组中元素的位置，第一个会成为最后一个，最后一个会成为第一个，该方法返回对数组的引用。
    语法：arr.reverse()
      var array = [1,2,3,4,5];
      var array2 = array.reverse();
      console.log(array); //[5,4,3,2,1];
      console.log(array2 === array );
    同上，reverse也是鸭式辨型的受益者，颠倒元素的范围受length属性的制约。如下：
      var o = {0: "a", 1: "b", 2: "c", length: 2};
      var o2 = Array.prototype.reverse.call(o);
      console.log(o); //{ '0': 'b', '1': 'a', '2': 'c', length: 2 }
      console.log(o === o2); //true
    如果length属性小于2或者length属性不为数值，那么原类型数组对象将没有变化。即是length属性不尊在，该对象也不会去创建length属性。特别是，当length属性较大时，类数组对象的[索引]会尽可能向length看起。如下：
      var o = { 0: "a", 1: "b", 2: "c", length: 100};
      var o2 = Array.prototype.reverse.call(o);
      console.log(o); //{ '97': 'c', '98': 'b', '99': 'a', length: 100 }
      console.log(o === o2); //true

  shift
    shift()方法删除数组的第一个元素，并返回这个元素。如果是栈的话，这个过程就是栈底弹出。
    语法：arr.shift()
      var array = [1,2,3,4,5];
      var item = array.shift();
      console.log(array); //[2,3,4,5];
      console.log(item); //1
    同样受益于鸭式辨型，对于类数组对象，shift仍然能够处理。如下：
      var o = {0: "a", 1: "b", 2: "c", length: 3};
      var item = Array.prototype.shift.call(o);
      console.log(o); //{0: "b", 1: "c", length: 2}
      console.log(item); //"a"
    如果类数组对象length属性不存在，将添加length属性，并初始化为0.如下：
      var o = {0: "a", 1: "b", 2: "c"};
      var item = Array.prototype.shift.call(o);
      console.log(o); //{0: "a", 1: "b", 2: "c", length: 0};
      console.log(item); //undefined

  sort
    sort()方法对数组元素进行排序，并返回这个数组。sort方法比较复杂。
    语法：arr.sort([comparefn])
    comparefn是可选的，如果省略，数组元素将按照各自转化为字符串的Unicode(万国码)位点顺序排序，例如“Boy”将排到"apple"之前。当对数字排序的时候，25将会排到8之前，因为转码为字符串后，“25”将比“8”靠前。例如：
      var array = ["apple", "Boy", "Cat", "dog"];
      var array2 = array.sort();
      console.log(array); //["Boy", "Cat", "apple", "dog"];
      console.log(array === array2); //true

      array = [10, 1, 3, 20];
      var array3 = array.sort();
      console.log(array3); //[1,10,20,3]
    如果指定了comparefn，数组将按照调用该函数的返回值来排序。若a和b是两个将要比较的元素：
      1.若comparefn(a,b) < 0, 那么a将排在b前面；
      2.若comparefn(a,b) = 0, 那么a和b相对位置不变；
      3.若comparefn(a,b) > 0, 那么a，b将调换位置；
    如果数组元素为数字，则排序函数comparefn格式如下所示：
      function compare(a,b){
        return a - b;
      }
    如果数组元素为非ASCII字符的字符串，则需要使用String.localeCompare。如下：
      var array = ["互", "联", "网", "改", "变", "世", "界"];
      var array2 = array.sort();
      var array = ["互", "联", "网", "改", "变", "世", "界"];
      var array3 = array.sort(function(a,b){
        return a.localeCompare(b);
      });
      console.log(array2); //["世", "互", "变", "改", "界", "网", "联"]
      console.log(array3); //["变", "改", "互", "界", "联", "世", "网"] node下不生效
    同上，sort一样受益于鸭式辨型，比如：
      var o = {0: "互", 1: "联", 2: "网", 3: "改", 4: "变", 5: "世", 6: "界", length: 7};
      Array.prototype.sort.call(o,function(a,b){
        return a.localeCompare(b);
      })
      console.log(o); //{0:"变",1:"改",2:"互",3:"界",4:"联",5:"世",6:"网",length: 7}
    注意：使用sort的鸭式辨型特性的时候，若类数组对象不具有length属性，它并不会进行排序，也不会为其天津length属性。
      var o = {0: "互", 1: "联", 2: "网", 3: "改", 4: "变", 5: "世", 6: "界"};
      Array.prototype.sort.call(o,function(a,b){
        return a.localeCompare(b);
      })
      console.log(o); //{0: "互", 1: "联", 2: "网", 3: "改", 4: "变", 5: "世", 6: "界"}
    
    使用映射改善排序：
      comparefn如果需要对数组元素多次转换以实现排序，那么使用map辅助排序将是一个不错的选择。基本思想就是讲数组中的每个元素实际上比较的值取出来，排序后在将数组恢复。
        //需要被排序的数组
        var array = ['dog', 'Cat', 'Boy', 'apple'];
        //对需要排序的数字和位置临时存储
        var mapped = array.map(function(el, i){
          return { index: i, value: el.toLowerCase() }
        });
        //按照多个值排序数组
        mapped.sort(function(a,b){
          return +(a.value > b.value) || +(a.value === b.value ) -1;
        });
        //根据索引得到排序的结果
        var result = mapped.map(function(el){
          return array[el.index];
        })
        console.log(result); //["apple", "Boy", "Cat", "dog"]

  splice
    splice()方法用于新元素替换就元素的方法来修改数组。它是一个常用的方法，复杂的数组操作场景通常都会有它的身影，特别是需要维持原数组引用时，就地删除或新增元素，splice是最适合的。
    语法：arr.splice(start, deleteCount[, item1 [,item2 [,... ]]])
    start指定从哪一位开始修改内容。如果超过了数组长度，则从数组末尾开始添加内容；如果是负值，则其指定的索引位置等同于length+start(length为数组的长度),表示从数组末尾开始的第-start位。
    deleteCount指定要删除的元素个数，若等于0，则不删除。这种情况下，至少应该添加一位新元素，若大于start之后的元素总和，则start以及之后的元素将都被删除。
    itemN指定新增加的元素，如果省略，则该方法只删除数组元素。
    返回值由原数组中被删除的元素组成的数据，如果没有删除，则返回一个空数组。
    下面举例说明：
      var array = ["apple", "boy"];
      var splices = array.splice(1,1);
      console.log(array); //["apple"]
      console.log(splices); //["boy"]

      array = ["apple", "boy"];
      splices = array.splice(2,1,"cat");
      console.log(array); //["apple", "boy", "cat"]
      console.log(splices); //[]

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
    同上，splice一样也受益于鸭式辨型，比如：
      var o = { 0: "apple", 1: "boy", length: 2};
      var splices = Array.prototype.splice.call(o,1,1);
      console.log(o); //{ 0: "apple", length: 1};
      console.log(splices); //["boy"] 返回的还是一个数组
    注意：如果类数组对象没有length属性，splice将为该数组对象天津length属性，并初始化为0.
    如果需要删除数组中一个已经存在的元素，如下：
      var array = ['a', 'b', 'c'];
      array.splice(array.indexOf('b'),1);
      console.log(array);

  unshift
    unshift()方法用于在数组开始插入一些元素(就像栈底插入)，并返回新数组的长度。
    语法：arr.unshift(element1,...elementN)
      var array = ["red", "green", "blue"];
      var length = array.unshift("yellow");
      console.log(array); //["yellow", "red", "green", "blue"];
      console.log(length); //4
    如果给unshift方法传入一个数组呢？
      var array = ["red", "green", "blue"];
      var length = array.unshift(["yellow"]);
      console.log(array); //[["yellow"], "red", "green", "blue"];
      console.log(length); //4
    同上，unshift也受益于鸭式辨型：
      var o = { 0: "red", 1: "green", 2: "blue", length: 3};
      var length = Array.prototype.unshift.call(o, "yellow");
      console.log(o); //{ 0: "yellow", 1: "red", 2: "green", 3: "blue", length: 4};
      console.log(length); //4
    注意：如果类数组对象不指定length属性，则返回结果是这样的{'0':'yellow','1': 'green', '2': 'blue', length: 1 }，shift会认为数组长度为0，此时将从对象下标为0的位置开始插入，响应位置属性将被替换，此时初始化类数组对象的length属性为插入元素个数。

  copyWithin(ES6)
    copyWithin()方法基于ECMAScript 2015(ES6)规范，用于数组内元素之间的替换，即替换元素和被替换元素均是数组内的元素。
    语法：arr.copyWithin(target, start[, end = this.length])
    target指定被替换元素的索引，start指定替换元素起始的索引，end可选，指的是替换元素结束位置的索引。
    如果start为负，责其指定的索引位置等同于length + start,length为数组的长度。end也是如此。
    注：目前只有Firefox(版本32及以上版本)实现了该方法。
  fill(ES6)
    fill()方法基于ECMAScript 2015(ES6)规范，它同样用于数组元素的替换，主要是讲数组指定区间内的元素替换为某个值。
    语法：arr.fill(value, start[, end = this.length])
    value指定被替换的值，start指定替换元素起始的索引。end可选，指定是替换元素结束位置的索引。
    如果start为负，则其指定的索引位置等同于length+start，length为数组的长度，end也是如此。

## 不会改变自身的方法(9个)
  基于ES7，不会改变自身的方法一共有9个，分别为concat，join，slice，toString，toLocateString，indexOf，lastIndexOf未标准的toSource以及ES7新增的方法includes。
  concat
    concat()方法将出入的数组或元素与原数组合并，组成一个新的数组并返回。
    语法：arr.concat(value1, value2, ...valueN)
      var array = [1,2,3];
      var array2 = array.concat(4,[5,6],[7,8,9]);
      console.log(array); //[1,2,3]
      console.log(array2); //[1,2,3,4,5,6,7,8,9]
    若concat方法中不传入参数，那么僵基于原数组浅赋值生成一个一模一样的新数组(指向新的地址空间)；
      var array = [{a: 1}];
      var array3 = array.concat();
      console.log(array3); //[{a: 1}];
      console.log(array3 === array); //false
      console.log(array[0] === array3[0]); //true 
    同上，concat一样受益于鸭式辨型，但效果可能达不到我们预期：
      var o = {0: 'a', 1: 'b', 2: 'c', length: 3};
      var o2 = Array.prototype.concat.call(o,'d',{3: 'e', 4: 'f', length: 2},['g','h','i'])
      console.log(o2); //[ { '0': 'a', '1': 'b', '2': 'c', length: 3 },'d',{ '3': 'e', '4': 'f', length: 2 },'g','h','i' ]
    课件，类数组对象合并后返回依然是数组，并不是我们期望的对象。

  join
    join()方法将数组中的所有元素连接成一个字符串
    语法：arr.join([separator = ","])separator可选，缺省默认为逗号。
      var array = ["we", "are", "Chinese"];
      console.log(array.join()); //"we,are,Chinese"
      console.log(array.join("+")); //"we+are+Chinese"
      console.log(array.join('')); //"weareChinese"
    同上，join一样受益于鸭式辨型：
      var o = {0: "we", 1: "are", 2: "Chinese", length: 3};
      console.log(Array.prototype.join.call(o,'+')); //"we+are+Chinese"
      console.log(Array.prototype.join.call('abc')); //"a,b,c"

  slice
    slice()方法将数组中一部分元素浅复制存入新的数组对象，并返回这个数组对象。
    语法：arr.slice([start [, end]])
    参数start指定复制开始位置的索引，end如果有值则表示复制结束位置的索引(不包括此位置)。
    如果start的值为负数，加入数组长度为length，则表示从length+start的位置开始复制，此时参数end如果有值，只能是比start大的负数，否则返回空数组。
    slice方法参数为空时，同concat方法一样，都是浅复制生成一个新数组。
      var array = ["one", "two", "three", "four", "five"];
      console.log(array.slice());  //["one", "two", "three", "four", "five"];
      console.log(array.slice(2,3));//["three"]
    浅复制是指当前对象的被复制时，值复制对象的引用，指向的依然是同一个对象。下面来说明slice为什么事浅复制。
      var array = [{color: "yellow"}, 2,3];
      var array2 = array.slice(0,1);
      console.log(array2); //[{color: "yellow"}];
      array[0]["color"] = "blue";
      console.log(array2); //[{color: "blue"}]
    由于slice是浅复制，复制到的对象只是一个引用，改变原数组array的值，array2也随之改变。
    同时，稍微利用slice方法第一个参数为负数时的特性，我们可以非常方便的拿到数组最后一项元素，如下：
      console.log([1,2,3].slice(-1)); //[3]
    同上，slice一样受益于鸭式辨型。如下：
      var o = {0: {"color": "yellow"},1: 2, 2: 3, length: 3};
      var o2 = Array.prototype.slice.call(o,0,1);
      console.log(o2); //[{color: "yellow"}]
    鉴于IE9以下版本对该方法支持不是很好，不要在低版本浏览器使用这个方法。
  
  toString
    toString()方法返回数组的字符串形式，该字符串有数组中的每个元素的toString()返回值经过调用join()方法连接(由逗号隔开)组成。
    语法: arr.toString()
      var array = ["Jan", "Feb", "Mar", "Apr"];
      var str = array.toString();
      console.log(str); //Jan,Feb,Mar,Apr
    当数组直接和字符串连接操作时，将会自动调用其toString()方法。
      var str = ["Jan", "Feb", "Mar", "Apr"] + ',May';
      console.log(str); //Jan,Feb,Mar,Apr,May
      //下面我们开试试鸭式辨型
      var o = {0: "Jan", 1: "Feb", 2: "Mar", length: 3};
      var o2 = Array.prototype.toString.call(o);
      console.log(o2); //[object Object]
      console.log(o.toString() === o2); //true
    可见，Array.prototype.toString()方法处理类数组对象时，跟类数组对象直接调用Object.prototype.toString()方法结果完全一致。说好的鸭式呢？
    
    根据ES5语义，toString()方法时通用的，可以被用于任意对象。如果对象有一个join()方法，将会被调用，其返回值将被返回，没有则调用Object.prototype.toString(),为此，我们给o对象天津一个join方法，如下：
      var o = {0: 'Jan', 1: 'Feb', 2: 'Mar', length: 3, join: function(){ return Array.prototype.join.call(this)}};
      console.log(Array.prototype.toString.call(o)); //Jan,Feb,Mar

  toLocaleString
    toLocaleString()类似于toString()的变形，该字符串由数组中的每个元素toLocaleString()返回值经过join()方法连接(由逗号隔开)组成。
    语法：arr.toLocaleString()
    数组中的元素将调用各自的toLocaleString方法：
      Object: Object.prototype.toLocaleString()
      Number: Number.prototype.toLocaleString()
      Date: Date.prototype.toLocaleString()
      
      var arr = [{ name: 'zz'}, 123456, 'abc', new Date()];
      var str = arr.toLocaleString();
      console.log(str); //[object Object],123,456,abc,2020-6-27 21:08:59
    其鸭式辨型的写法也痛toString保持一致，如下：
      var o = {
        0: 123456, 1: 'abc', 2: new Date(), length: 3,
        join: function(){
          return Array.prototype.join.call(this)
        }
      };
      console.log(Array.prototype.toLocaleString.call(o)); //123,456,abc,2020-6-27 21:11:44

  indexOf
    indexOf()方法用于查找元素在数组中第一次出现时的索引，如果没有，则返回-1.
    语法：arr.indexOf(element, fromIndex = 0);
    element 位需要查找的元素
    fromIndex为开始查找的位置，缺省默认为0，如果超出数组长度，则返回-1,。如果为复制，假设数组长度为length，则从数组的第length+fromIndex项开始往数组末尾查找，如果length+fromIndex<0则整个数组都会被查找。
    indexOf使用严格相等(即使用 === 去匹配数组中的元素)。
      var array = ['abc', 'def', 'ghi', '123'];
      console.log(array.indexOf('def')); //1
      console.log(array.indexOf('def', -1)) //-1
      console.log(array.indexOf('def', -4)); //1
      console.log(array.indexOf('def', -9)); //1
      console.log(array.indexOf(123)); //-1
    得益于鸭式辨型，indexOf可以处理类数组对象，如下：
      var o = { 0: 'abc', 1: 'def', 2: 'ghi', length: 3};
      console.log(Array.prototype.indexOf.call(o,'ghi',-4)); //2
    注：该方法不支持IE9以下版本

  lastIndexOf
    lastIndexOf()方法用于查找元素在数组中最后一次出现的索引，如果没有，则返回-1，并且它是indexOf的逆向查找，即从数组最后一个网前查找。
    语法：arr.lastIndexOf(element, fromIndex = length-1)
    
  includes(ES7)
  toSource(非标准)

## 遍历方法(12个)
  基于ES6，遍历方法一共有12个，分别是forEach, every, some, filter, map, reduce, reduceRight以及ES6新增的方法entries, find, findIndex, keys, values.

  forEach
    forEach()方法指定数组的每项元素都执行一次传入的函数，返回值为undefined。
    语法：arr.forEach(fn, thisArg)
      fn表示在数组每一项都执行的函数，接受三个参数：
        value当前正在被处理的元素的值
        index当前元素的数组索引
        array数组本身
      thisArg可选，用来当做fn函数内的this对象。
    forEach将为数组中每一项执行一次fn函数，那些已删除，新增或者从未赋值的项将被跳过(但不包括值为undefined的项)。
    遍历过程中，fn会被传入上述三个参数.
      var array = [1,3,5];
      var obj = {name: 'cc'};
      var sReturn = array.forEach(function(value, index, array){
        array[index] = value * value;
        console.log(this.name); //cc被打印了三次
      },obj);
      console.log(array); //[1, 9, 25];
      console.log(sReturn); //undefined
    得益于鸭式辨型，虽然forEach不能直接遍历对象，但它可以通过call方法遍历数组对象。如下：
      var o = { 0: 1, 1: 3, 2: 5, length: 3};
      Array.prototype.forEach.call(o,function(value,index,obj){
        console.log(value,index,obj);
        obj[index] = value * value;
      },o);
      //1 0 { '0': 1, '1': 3, '2': 5, length: 3 }
      //3 1 { '0': 1, '1': 3, '2': 5, length: 3 }
      //5 2 { '0': 1, '1': 9, '2': 5, length: 3 }
      console.log(o); //{ '0': 1, '1': 9, '2': 25, length: 3 }

  every
    every()方法适用传入的函数测试所有元素，只要其中有一个函数返回值为false，那么该方法的结果为false；如果返回值权威true，那么该方法的结果才为true。因此every方法存在如下规律：
      1.若需检测数组中存在元素大于100(即one>100)，那么我们需要在传入的函数中构造false，返回值(即返回item>100),同时整个方法结果为false才表示数组存在元素满足条件；(简单理解：若是单项判断，可用one false ===> false)
      2.若需检测数组中是否所有元素都大于100(即all>100),那么我们需要在传入的函数中构造true，返回值(即返回item>100),同时整个方法结果为true，才表示数组所有元素均满足条件.(简单理解为：若是全部判断，可用all true ===> true)
      以下是鸭式辨型的写法：
        var o = { 0: 10, 1: 8, 2: 25, length: 3};
        var bool = Array.prototype.every.call(o,function(value,index,obj){
          return value >=8;
        },o);
        console.log(bool); //true

  some
    some()方法刚好与every()相反
  filter
    filter()方法适用传入的函数测试所有元素，并返回所有通过测试的元素组成的新数组，它就好比一个过滤器，筛掉不符合条件的元素
    语法：arr.filter(fn,thisArg);
      var array = [18, 9, 10, 35, 80];
      var array2 = array.filter(function(value, index,array){
        return value > 20;
      });
      console.log(array2); //[35, 80]
  map
    map()方法遍历数组，适用传入的函数处理每个元素，并返回函数的返回值组成的新数组。
    语法：arr.map(fn,thisArg);
  reduce
    reduce()方法接受一个方法作为累加器，数组中的每个值(从左至右)开始合并，最后为一个值。
    语法：arr.reduce(fn,initialValue)
    fn表示在数组每一项上执行的函数，接受四个参数
      1.previousValue上一次调用毁掉返回值，或者是提供的初始值
      2.value数组中当前被处理元素的值
      3.index当前元素在数组中的索引
      4.array数组自身
    initialValue指定第一次调用fn的第一个参数
    当fn第一次执行时：
      1.如果initialValue在调用reduce是被提供，那么第一个previousValue将等于initialValue，此时item等于数组中第一个值；
      2.如果initialValue未被提供，那么previousValue等于数组中的第一个值，item等于数组中的第二个值，此时如果数组为空，那么僵抛出typeError。
      3.如果数组仅有一个元素，并没有提供initialValue，或提供了initialValue但数组为空，那么fn不会被执行，数组的唯一值将被返回。
        var array = [1, 2, 3, 4];
        var s = array.reduce(function(previousValue, value, index, array){
          return previousValue * value;
        },1);
        console.log(s); //24
        //ES6写法更加简洁
        array.reduce((p,v)=>p*v,1);
  reduceRight
    reduceRight()方法几首一个方法作为累加器，数组中的每个值(从右至左)开始合并，最终返回一个值。除了与reduce执行方法相反外，其他完全一致。
  entries(ES6)
    entries()方法基于ECMAScript 2015(ES6)规范，返回一个数组迭代器对象，该对象包含数组中每个索引的兼职对。
    语法：arr.entries()
      var array = ['a', 'b', 'c'];
      var iterator = array.entries();
      console.log(iterator.next().value); //[0, 'a']
      console.log(iterator.next().value); //[1, 'b']
      console.log(iterator.next().value); //[2, 'c']
      console.log(iterator.next().value); //undefined
  find & findIndex(ES6)
  keys(ES6)
  values(ES6)
  Symbol.iterator(ES6)

小结：
  1.所有插入元素的方法，比如push,unshift一律返回新数组的长度
  2.所有删除元素的方法，比如pop，shift，splice一律返回删除的元素，或者返回删除的多个元素组成的数组
  3.部分遍历方法，比如forEach,every,some,filter,map,find,findIndex它们都包含function(value,index,array){}和thisArg这样的两个形参。
  