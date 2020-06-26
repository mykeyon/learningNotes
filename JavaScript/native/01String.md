### 参考地址：http://louiszhai.github.io/2016/01/12js.String
# JavaScript字符串所有API全解密
### String构造器方法
##### fromCharCode
  fromCharCode()方法返回使用指定的Unicode序列创建的字符串，也就是传入Unicode序列，返回基于此的字符串。语法：fromCharCode(num1, num2, ...)，传入的参数均为数字。
  如下这个简单的例子，将返回ABC、abc、*、+、-和/：
    String.fromCharCode(65, 66, 67); //ABC
    String.fromCharCode(97, 98, 99); //abc
    String.fromCharCode(42); // *
    String.fromCharCode(43); // +
    String.fromCharCode(45); // -
    String.fromCharCode(47); // /
  看起来fromCharCode像满足了需求，但实际上由于js语言设计的先天不足(只能处理USC-2编码，即所有字符串都是2个字节，无法处理4个字节字符)，通过该方法并不能返回一个4字节的字符，为了弥补这个缺陷，ES6新增了fromCodePoint方法。
##### fromCodePoint(ES6)
  fromCOdePoint()方法基于ECMAScript 2015(ES6)规范，作用和语法同fromCharCode方法，该方法主要扩展了对4个字符的支持。
    //"𝌆"是一个4字节字符，我们先看他的数字形式
    "𝌆".codePointAt(); //119558 codePointAt方法是查看字符的编码
    //调用fromCharCode解析之，返回乱码
    String.fromCharCode(119558); //"팆"
    //调用fromCodePoint解析之，正常解析
    String.fromCodePoint(119558); //"𝌆"
  除了扩展对4字节的支持外，fromCodePoint还规范了错误处理，只要是无效的Unicode编码，就会抛出错误 RangeError:Invalid code point...这就意味着，只要不是符合Unicode字符范围正整数(Unicode最多可容纳1114112个码位)，均会抛出错误。
    String.fromCodePoint("abc"); //直接报错
    String.fromCodePoint(Infinity);
    String.fromCodePoint(-1.23);

##### raw(ES6)
    raw()方法基于ECMAScript 2015(ES6)规范，它是一个末班字符串的标签函数，作用类似于Python的r和C#的@字符串前缀，都是用来获取一个模板字符串的原始字面量。
    语法：String.raw(callSite, ...substitutions),callSite即模板字符串的 调用对象 ，...substitutions表示任意个内插表达式对应的值。
    如下是String.raw作为前缀的用法：
      //防止特殊字符被转义
      String.raw`a\nb\tc`; //a\nb\tc
      //支持内插表达式
      let name = "louis";
      String.raw`Hello \n ${name}`; //Hello \n louis
      //内插表达式还可以转换
      String.raw`1+2=${1+2},2*3=${2*3}`; // 1+2=3,2*3=6
    String.raw作为函数来调用的场景不太多，如下是用法
      //对象的raw属性值为字符串时，从第二个参数起，它们反别插入到下标为0,1,2,...n的元素后面
      String.raw({raw: 'abc'},1,2,3); //a1b2c3
      //对象的raw属性值为数组时，从第二个参数起，它们分别插入到组下标为0,1,2,...n的元素后面
      String.raw({raw: ['a','b', 'c', 'd']},1,2,3) //a1b2c3d

##### String.prototype
    和其他所有对象一样，字符串实例的所有方法均来自String.prototype
    属性
      String.prototype共有两个属性，如下：
        String.prototype.constructor指向构造器(String())
        String.prototype.length表示字符串长度
    方法
      字符串原型方法分为两种，一种是与html无关的方法，一种是与html有关的方法。
      HTML无关的方法：
        常用的方法有：charAt、charCodAt、concat、indexOf、lastIndexOf、localeCompare、match、replace、search、slice、split、substr、substring、toLocaleLowerCase、toLocaleUpperCase、toLowerCase、toString、toUpperCase、trim、valueof等ES5支持的，以及codePointAt、contains、endsWith、normalize、repeat、startsWith等ES6支持的，还包括quote、toSource、trimLeft、trimRight等非标准的。
    
    charAt
      charAt()方法返回字符串中指定位置的字符。
      语法：str.charAt(index);
      index为字符串索引(取值从0至length-1)，如果超出该范围，则返回空字符串。
        console.log("Hello, world".charAt(8)); //o
    charCodeAt
      charCodeAt()返回指定索引处字符的Unicode数值。
      语法：str.charCodeAt(index)
      index为一个从0至length-1的整数。如果不是一个数值，则默认为0，如果小于或者大于字符串长度，则返回NaN。
      Unicode编码单元(code points)的范围从0至1114111。开头的128个Unicode编码单元和ASCII字符编码一样。
      charCodeAt()总是返回一个小于65536的值。因为高位编码单元需要由一对字符来表示，为了查看其编码的完成字符，需要查看charCodeAt(i+1)的值。
        console.log("Hello, world".charCodeAt(8)); //111
        console.log("前端工程师".charCodeAt(2)); //24037
    concat
      concat()方法将一个或多个字符串拼接在一起，组成新的字符串返回。
      语法：str.concat(string1,string2,...);
      但是concat的性能表现不佳，强烈推荐使用赋值操作符(+或+=)代替concat。"+"操作符大概快了concat几十倍
      console.log("早".concat("上","好")); //早上好
    indexOf lastIndexOf
      indexOf()方法用于查找子字符串中首次出现的位置，没有则返回-1。改方法严格区分大小写，并且从左往右查找。而lastIndexOf则从右往左查找，其他与前者一致。
      语法：str.indexOf(searchValue,[,fromIndex = 0]), str.lastIndexOf(searchValue, [,fromeIndex=0])
      searchValue表示被查找的字符串，fromIndex表示开始查找的位置，默认为0，如果小于0，则查找整个字符串，若超过字符串长度，则该方法返回-1，除非被查找的是空字符串，此时返回字符串长度。
        console.log("".indexOf("",100)) //0
        console.log("IT改变世界".indexOf("世界")) //4
        console.log("IT改变世界".lastIndexOf("世界")); //4
    localeCompare 目前Safari浏览器咱不支持
    match
      match()方法用于测试字符串是否支持指定正则表达式的规则，即是传入的是非正则表达式对象，也会隐式地使用new RegExp(obj)将其转换为正则表达式对象。
      语法：str.match(regExp)
      该方法返回包含匹配结果的数组，如果没有匹配项，则返回null。
      描述：
        1.若正则表达式没有g标志，则返回同RegExp.exec(str)相同的结果。而且返回的数组拥有一个额外的input属性，该属性包含原始字符串，另外该数组还拥有一个index属性，该属性表示匹配字符串在原始字符串中索引(从0开始)。
        2.若正则表达式包含g标识，则该方法返回一个包含所有匹配结果的数组，没有匹配到则返回null。
        var str = "World Internet Conference";
        console.log(str.match(/[a-d]/i));//[ 'd',index: 4,input:'World Internet Conference']
        console.log(str.match(/[a-d]/gi)); //[ 'd', 'C', 'c' ]
        //正则
        console.log(/[a-d]/gi.test(str)); //true
        console.log(/[a-d]/gi.exec(str)); //['d',index:4,input:'World Internet Conference']
      由上可知，RegExp.test(str)方法值匹配到了一个字符串也返回true。而RegExp.exec(str)方法无论正则有没有包含g标识，RegExp.exec将直接返回第一个匹配结果。且该结果同str.match(regExp)方法不包含g标识时的返回一致。
    replace


    search
      search()方法用于测试字符串对象是否包含某个正则匹配，相当于正则表达式的test方法，且该方法比match()方法更快。如果匹配成功，search()返回正则表达式在字符串中首次匹配项的索引，否则返回-1.
      注意： search方法与indexOf方法基本一致，都是查到了就返回子串第一次出现的下标，否则返回-1，唯一区别就在于search默认会将子串转化为正则表达式形式，而indexOf不做处理，也不能处理正则。
      语法：str.search(regexp);
      var str = "abcdefg";
      console.log(str.search(/[d-g]/)); //3 匹配到子串"defg"，而d在原字符串的索引为3
      search()方法不支持全局匹配(正则中包含g参数)，如下：
      console.log(str.search(/[d-g]/g)); //3 与无g参数时，返回的结果相同
    slice
      slice()方法提取字符串的一部分，并返回新的字符串。该方法有些类似于Array.prototype.slice方法。
      语法：str.slice(strat,end)
      首先end参数可选，start可取正值，也可取负值。
      取正值时表示从索引为start的位置截取到end的位置(不包含end所在位置的字符，如果end省略就截取到字符串结尾)。
      取负值时表示从索引为length+start位置截取到end所在位置的字符。
        var str = "It is our choices that show what we truly are, far more than our abilities";
        console.log(str.slice(0,-30));
        console.log(str.slice(-30));

    split
      split()方法把原字符串分割成子字符串组成的数组，并返回该数组。
      语法：str.split(separator, limit)
      两个参数均是可选的，其中separator表示分隔符，它可以是字符串也可以是正则表达式。如果忽略separator，则返回的数组包含一个由原字符串组成的元素。如果separator是一个空串，则str将被分割成一个由原字符串中字符组成的数组。limit表示从返回的数组中截取前limit个元素，从而限定返回数组的长度。
        var str = "today is a summy day";
        console.log(str.split()); //[ 'today is a summy day' ]
        console.log(str.split("")); //[ 't','o','d','a','y',' ','i','s',' ','a',' ','s','u','m','m','y',' ','d','a','y' ]
        console.log(str.split(" ")); //[ 'today', 'is', 'a', 'summy', 'day' ]
      使用limit限定后返回的数组大小，如下：
        console.log(str.split(" ",1)); //['today']
      使用正则分隔符(RegExp separator),如下：
        console.log(str.split(/\s*is\s*/)); //[ 'today', 'a summy day' ]
      若正则分隔符里包含捕获括号，则括号匹配的结果将会包含在返回的数组中。
        console.log(str.split(/(\s*is\s*)/)); //[ 'today', ' is ', 'a summy day' ]
    substr
      substr()方法返回字符串指定位置开始的指定数量的字符
      语法：str.substr(start [,length])
      start表示截取字符的位置，可取正值或负值。取正值时表示start位置的索引，取负值时表示length+start位置的索引。length表示截取的字符长度。
        var str = "Yesterday is history. Tomorrow is mystery. But today is a gift";
        console.log(str.substr(47)); //today is a gift
        console.log(str.substr(-15)); //today is a gift
      目前Microsoft's JScript 不支持start去负值的索引。
    substring
      substring()方法返回字符串两个索引直接的子串。
      语法：str.substring(indexA [,indexB])
      indexA,indexB表示字符串索引，其中indexB可选，如果省略，则表示返回从indexA到字符串末尾的子串。
      描述
        substing要截取的是从indexA到indexB(不包含)之间的字符，符合以下规律：
          1.若indexA == indexB，则返回一个空字符串；
          2.若省略indexB，则提取只付出一直到字符串末尾；
          3.若任意参数小于0或NaN，则被当做0；
          4.若任意参数大于length，则被当做length。
        而如果indexA < indexB，则substring的执行效果就像是两个参数调换一般。比如：
        str.substring(0,1) == str.substring(1,0)
          var str = "Get outside every day. Miracles are waiting everywhere.";
          console.log(str.substring(1,1)); //""
    console.log(str.substring(0)); //Get outside every day. Miracles are waiting everywhere.
    console.log(str.substring(-1)); //Get outside every day. Miracles are waiting everywhere.
  console.log(str.substring(0,100));//Get outside every day. Miracles are waiting everywhere.
          console.log(str.substring(22,NaN)); //Get outside every day. 
    
    toLocaleLowerCase 和 toLocaleUpperCase
      toLocaleLowerCase()方法返回调用该方法的字符串被转换成小写的值，转换规则根据本地化的大小写映射。toLocaleUpperCase()方法则是转换成大写的值。
      语法：str.toLocaleLowerCase(),str.toLocaleUpperCase()
      console.log("ABCdE".toLocaleLowerCase()); //abcde
      console.log("abcDe".toLocaleUpperCase()); //ABCDE
    toLowerCase 和 toUpperCase
      这两个方法分别表示字符串转换成相应的小写和大写形式。如下：
      console.log("ABCDe".toLowerCase()); //abcde
      console.log("abcdE".toUpperCase()); //ABCDE
    toString 和 valueOf
      这两个方法都是返回字符串本身。
      语法：str.toString(), str.valueOf()
      var str = "abc";
      console.log(str.toString()); //abc
      console.log(str.toString() === str.valueOf()); //true
      对于对象而言，toString和valueOf也是非常相似，它们之间有着细微的差别，如下代码：
        var x = {
          toString: function(){ return "test" },
          valueOf: function(){ return 123 }
        }
        console.log(x);  //{ toString: [Function: toString], valueOf: [Function: valueOf] }
        console.log("x=" + x); //x=123
        console.log(x + "=x"); //123=x
        console.log(x+"1");  //1231
        console.log(x+1);  //124
        console.log(["x=",x].join("")); //x=test
      当"+"操作符一边为数字时，对象x趋向于转换成数字，表达式优先调用valueOf方法，如果调用数组的join方法，对象趋向于转换成字符串，表达式会优先调用toString方法。
    trim
      trim()方法清除字符串收尾的空白并返回
      语法：str.time()
        console.log(" a b c ".trim()); //"a b c"
      trim()方法是ECMAScript 5.1标准加入的，它并不支持IE9以下的低版本IE浏览器
        //兼容低版本浏览器写法
        if(!String.prototype.trim){
          String.prototype.trim = function(){
            return this.replace(/^\s+|\s+$/g, '');
          }
        }
    codePointAt(ES6)
      codePointAt()方法基于ECMAScript 2015(ES6)规范，返回使用UTF-16编码的给定位置值的非负整数。
      语法：str.codePointAt(position)
      console.log("a".codePointAt(0)); //97
      console.log("\u4f60\u597d".codePointAt(0)); //20320
      console.log("你好".codePointAt(0)); //20320
    includes(ES6)
      includes()方法基于ECMAScript 2015(ES6)规范，它用来判断一个字符串是否属于另一个字符串。如果是则返回true，否则返回false。
      语法：str.includes(subString [, position])
      subString表示要索引的字符串，position表示从当前字符串的哪个位置开始索引字符串，默认值为0.
        var str = "Practice makes perfect.";
        console.log(str.includes("perfect")); //true
        console.log(str.includes("perfect",100)) //false
    endsWith(ES6)
      endsWith()方法基于ECMAScript 2015(ES6)规范，它基本与contains()功能相同，不同的是，它用来判断一个字符串是否是原字符串的末尾。若是则返回true，否则返回false。
      语法：str.endsWith(substring [,position])
      与contains方法不同，position参数的默认值为字符串长度。
      var str = "Learn and live.";
      console.log(str.endsWith("live.")); //true
      console.log(str.endsWith("Learn",5)) //true
    normalize(ES6)
      normalize()方法基于ECMAScript 2015(ES6)规范，它会按照指定的Unicode正规形式将原字符串正规化。
      语法：str.normalize([form])
      from参数可省略，目前只有四种Unicode正规形式，即'NFC'、'NFD'、'NFKC'以及'NFKD'，form的默认值为'NFC'。如果form传入了非法的参数，则会抛出RangeError错误。
        var str = "\u4f60\u597d";
        console.log(str.normalize()); //你好
        console.log(str.normalize('NFC')); //你好
        console.log(str.normalize('NFD')); //你好
        console.log(str.normalize('NFKC')); //你好
        console.log(str.normalize('NFKD')); //你好
      目前只有Chrome v34+和Firefox v31+实现了它。
    repeat(ES6)
      repeat()方法基于ECMAScript 2015(ES6)规范，它返回重复字符串多次的新字符串
      语法：str.repeat(count)
      count参数只能去大于等于0的数字。若该数字不为证书，将自动转换为整数形式，若为负数或者其他值将报错。
        var str = 'hello';
        console.log(str.repeat(0)); //""
        console.log(str.repeat(1)); //"hello"
        console.log(str.repeat(2)); //"hellohello"
        console.log(str.repeat(-1));//RangeError:Invalid count value
      目前只有Chrome v41+, Firefox v24+和Safari v9+版本实现了该方法
    startsWith(ES6)
      startsWith()方法基于ECMAScript 2015(ES6)规范，它用来判断当前字符串是否以给定字符串开始的，若是则返回true，否则返回false。
      语法：str.startsWith(subString [,position])
      
