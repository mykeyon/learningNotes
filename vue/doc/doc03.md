### 计算属性和侦听器

#### 计算属性
    模板内的表达式非常便利，但是它只适用于简单的运算。在模板内放太多的逻辑会让模板过重且难以维护。例如：
```html
<div class="example">
    {{ message.split('').reverse().join('') }}
</div>
```

##### [基础例子](./../demo/day02/demo01.html)
```html
<div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reverse message: "{{ reverseMessage }}"</p>
</div>
```
```js
var vm = new Vue({
    el: "#example",
    data: {
        message: 'hello'
    },
    computed: {
        //计算属性的getter
        reversedMessage: function(){
            return this.message.split("").reverse().join("");
        }
    }
})
```
##### [计算属性(换成) VS 方法](./../demo/day02/demo02.html)
```js
<div id="example">
  <p>{{message}}</p>
  <p>翻转{{ reverseMessage() }}</p>
</div>
var vm = new Vue({
    el: "#example",
    data: {
        message: "Hello world"
    },
    methods: {
        reverseMessage: function(){
            return this.message.split("").resolve().join("");
        }
    }
})
```
    计算属性和方法都可以实现相同的结果，但是计算属性是基于它们的响应式缓存的。只有在响应式依赖发生变化以后才会更新内容，意思就是如果message值不变，那么reverseMessage的值就不会改变，每次访问reverseMessage都会直接返回对应的值。而函数则是每次调用都会重新计算。

##### [计算属性 VS侦听器](./../demo/day02/demo03.html)
    Vue提供了一种更为通用的方法来观察和响应Vue实例上的数据变动：侦听器。当有一些数据需要随着其他数据变动而变动时，很容易滥用watch。特别是之前使用过AngularJS。通常的更好的做法是使用计算属性而不是命令式watch回调。
```js
<div id = "example">{{ fullName }}</div>

//使用watch监听
var vm = new Vue({
    el: "#example",
    data: {
        firstName: "张",
        lastName: "狗娃",
        fullName: "张狗娃"
    },
    watch: {
        firstName: function(val){
            this.fullName = val + this.lastName;
        },
        lastName: function(val){
            this.fullName = this.firstName + val;
        }
    }
})

//使用计算属性
var vm = new Vue({
    el: "#example",
    data: {
        firstName: "张",
        lastName: "狗剩"
    },
    computed: {
        // fullName: function(){
        //     return this.firstName + this.lastName;
        // }
        fullName: {
            get: function(){
                return this.firstName + this.lastName;
            },
            set: function(val){
                var arr = val.split(" ");
                this.firstName = arr[0];
                this.lastName = arr[1];
                //可以通过vm.fullName来直接获取值，也可以通过vm.fullName = "李 二狗"，来直接修改名字
            }
        }
    }
})

/**
*计算属性相比watch监听，少定义一个变量名。并且不用逐个的监听每个变量
*/
```

##### 侦听器
    虽然大多数情况下计算属性更合适，但有时需要一个自定义的侦听器。这就是Vue通过watch选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作，侦听器是更有用的。
