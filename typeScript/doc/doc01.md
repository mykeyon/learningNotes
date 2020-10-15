### [TypeScript学习](https://juejin.im/post/6872111128135073806)

![思维导图](0./../img/ts学习思维导图.jpg)

#### 一、TypeScript是什么？
TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript是超集，而且本质上向这个语言添加了可选的静态类型和基于类的面相对象编程。

TypeScript提供最新和不断发展的JavaScript特性，包括ES5，ES2015，ES2016等语法。

##### 1.1TypeScript与JavaScript的区别

:----------------:|:--------------------:
TypeScript|JavaScript
JavaScript的超集用于解决大型项目的代码复杂性 | 一种脚本语言，用于创建动态网页
可以编译期间发现并纠正错误                  | 作为一种解释性语言，只能在运行时发现错误
强类型，支持静态和动态类型                  | 弱类型，没有静态类型选项
最终编译成JavaScript代码，使浏览器可以理解  | 可以直接在浏览器中使用
支持模块，泛型和接口                       | 不支持模块，泛型或接口
社区的支持仍在增长，而且还不是很大          | 大量的社区支持以及大量文档和解决问题的支持

##### 1.2获取TypeScript
* 安装TypeScript
  ```
    npm install -g typescript
  ```
* 验证TypeScript
  ```
    tsc -v
    #Version 4.0.3
  ```
* 编译TypeScript文件
  [demo](./../demo/day01/demo01.ts)
  ```
    tsc helloworld.ts
    #helloworld.ts => helloworld.js
  ```

##### TypeScript初体验
新建一个hello.ts文件，并输入以下内容：
```js
function greet(person:string){
  return 'Hello' + person
}
console.log(greet("TypeScript"));
```
然后执行tsc hello.ts命令，之后会生成一个编译好的hello.js:
```js
"use strict"
function greet(person){
  return 'hello' + person;
}
console.log(greet("TypeScript"));
```
观察编译后的输出文件，会发现person参数的类型信息在编译后删除了。TypeScript只会在编译阶段对类型进行静态检查，如果发现错误，编译时就会报错。而在运行时，编译生成的JS与普通JavaScript文件一样，并不会进行类型检查。

#### 二、TypeScript基础类型
* 2.1 Boolean类型
```js
let isDone: boolean = false;
//ES5: var isDone = false;
```
* 2.2 Number类型
```js
let count: number = 10;
//ES5: var count = 10
```
* 2.3 String 类型
```js
let name: string = "semiliker";
//ES5: var name = "semiliker"
```
* 2.4 Symbol 类型
```js
const sym = symbol();
let obj = {
  [sym]: "semlinker"
};
console.log(obj[sym]); //semlinker
```
* 2.5 Array 类型
```js
let list: number[] = [1, 2, 3];
//ES5: var list = [1, 2, 3];

let list: Array<number> = [1, 2, 3]; //Array<number>泛型语法
```
* 2.6 Enum 类型

  使用枚举我们可以定义带一些名字的常量。使用枚举可以清晰的表达意图或创建一组有区别的用例。TypeScript支持数字和基于字符串的枚举。
  * 1.数字枚举
  ```js
    enum Direction {
      NORTH,
      SOUTH,
      EAST,
      WEST
    }
    let dir: Direction = Direction.NORTH;
  ```
  默认情况下，NORTH的初始值为0，其余的成员会从1开始自动增加。换句话说，Direction.SOUTH的值为1，Direction.EAST的值为2，Direction.WEST的值为3.
  以上的枚举示例经过编译后，对应的ES5的代码如下：
  ```js
    var Direction;
    (function (Direction) {
        Direction[Direction["NORTH"] = 0] = "NORTH";
        Direction[Direction["SOUTH"] = 1] = "SOUTH";
        Direction[Direction["EAST"] = 2] = "EAST";
        Direction[Direction["WEST"] = 3] = "WEST";
    })(Direction || (Direction = {}));
    var dir = Direction.NORTH;
  ```
  当然我们也可以设置NORTH的初始值。
  * 2.字符串枚举
  在TypeScript2.4版本，允许我们使用字符串枚举。在一个字符串枚举里，每个成员必须用字符串字面量。或另外一个字符串枚举成员进行初始化。
  ```js
    enum Direction{
      NORTH = "NORTH",
      SOUTH = "SOUTH",
      WAST = "WAST",
      WEST = "WEST"
    }
    //对应的ES5代码如下：
    var Direction;
    (function (Direction) {
        Direction["NORTH"] = "NORTH";
        Direction["SOUTH"] = "SOUTH";
        Direction["WAST"] = "WAST";
        Direction["WEST"] = "WEST";
    })(Direction || (Direction = {}));
  ```
  通过观察数字枚举和字符串枚举的编译结果，我们可以知道数字枚举除了支持从成员名称到成员值的普通映射外，它还支持从成员值到成员名称的反向映射：
  ```js
    enum Direction {
      NORTH,
      SOUTH,
      EAST,
      WEST
    }
    let dirName = Direction[0]; //NORTH
    let dirVal = DIrection["NORTH"]; //0
  ```
  另外，对于纯字符串枚举，我们不能生了任何初始化程序。而数字枚举如果没有显式设置时，则会使用默认规则进行初始化。
  * 3.常量枚举
  除了数字枚举和字符串枚举之外，还有一种特殊的枚举——常量枚举。它是使用const关键字修饰的枚举，常量枚举会使用内联语法，不会为枚举类型编译成任何JavaScript。为了刚好的理解这句话，具体例子如下：
  ```js
    const enum Direction{
      NORTH,
      SOUTH,
      EAST,
      WEST
    }
    let dir: Direction = Direction.NORTH;
    //对应ES5代码如下：
    var dir = 0; /* NORTH */
  ```
  * 4.异构枚举
  异构枚举的成员值是数字和字符串的混合：
  ```js
    enum Enum{
      A,
      B,
      C = 'C',
      D = 'D',
      E = 8,
      F,
    }

    //对应ES5的代码
    var Enum;
    (function (Enum) {
        Enum[Enum["A"] = 0] = "A";
        Enum[Enum["B"] = 1] = "B";
        Enum["C"] = "C";
        Enum["D"] = "D";
        Enum[Enum["E"] = 8] = "E";
        Enum[Enum["F"] = 9] = "F";
    })(Enum || (Enum = {}));
  ```
  通过观察上述生成的ES5代码，我们可以发现数字枚举相对字符串枚举多了"反向映射":
  ```js
    console.log(Enum.A); //0
    console.log(Enum[0]); //A
  ```
* 2.7 Any 类型
  在TypeScript中，任何类型都可以被归为any类型。这让any类型成为了类型系统的顶级类型(也被称作全局超级类型)。
  ```js
    let notSure: any = 666;
    notSure = "semlinker";
    notSure = false
  ```
  any类型本质上是类型系统的一个逃逸舱。
  ```js
    let value: any;
    value.foo.bar; //OK
    value.trim(); //OK
    value(); //OK
    new value(); //OK
    value[0][1]; //OK
  ```
  在许多场景下，这太宽松了。使用any类型，可以很容易的编写正确但运行时有问题的代码。如果我们使用any类型，就无法使用TypeScript提供的大量保护机制。为了解决any带来的这个问题，TypeScript3.0引入了unknown类型。
* 2.8 UnKnow 类型
  就行所有的类型可以赋值给any，所有的类型也可以赋值给unknown。这使得unknow成为TypeScript类型系统的另一种顶级类型(另一种是any)。如下是unknown类型的使用示例：
  ```js
    let value: unknown;
    value = true; //OK
    value = 42; //OK
    value = "Hello World"; //OK
    value = []; //OK
    value = {}; //OK
    value = Math.random(); //OK
    value = null; //OK
    value = undefined; //OK
    value = new TypeError(); //OK
    value = Symbol("type"); //OK
  ```
* 2.9 Tuple 类型
* 2.10 Void类型
* 2.11 Null和Undefined类型
**************