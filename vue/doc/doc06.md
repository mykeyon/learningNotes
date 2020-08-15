### 列表渲染
##### [用v-for把一个数组对应为一组元素](./../demo/day04/demo01.html)
我们可以用v-for指令基于一个数组来渲染一个列表。v-for指令需要使用 item in items 形式的特殊语法。其中items是源数据数组，而item则是被迭代的数组元素的别名。
```html
<ul id = "example">
    <li v-for = "item in items" :key = "item.message">{{ item.message }}</li>
</ul>
var example = new Vue({
    el: '#example',
    data: {
        items: [ { message: 'Foo' }, { message: 'Bar' }]
    }
})
```
在v-for块中，可以访问到父作用域的property。v-for还支持一个可选的第二个参数，及当前项的索引。

也可以用of替代in作为分隔符，因为它更接近JavaScript迭代器的语法：
```html
<div v-for = "item of items"></div>
```

##### [在v-for里使用对象](./../demo/day04/demo01.html)
可以直接渲染一个对象。
* 如果只有一个参数则直接将object的value(键值)渲染出来
* 也可以提供第二个参数，作为object的键名
```html
<div v-for = "(value, name) in object">
    {{ name }} : {{ value }}
</div>
```
* 还可以提供第三个参数作为索引：
```html
<div v-for = "(value, name, index) in object">
    {{ index }}. {{ name }}: {{ value }}
</div>
```
> 注意：在遍历对象时，会按Object.keys()的结果遍历，但是不能保证它的结果在不同的浏览器JavaScript引擎下都是一致的。

### 维护状态
当Vue正在更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。这个类似Vue1.x的track-by="$index"
。
这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时DOM状态(例如：表单输入值)的列表渲染输出。

为了给Vue一个标识，以便跟踪每个节点，重用和重排序现有元素。需要给每个遍历项提供一个key值 attribute
```html
<div v-for = "item in items" v-bind:key = "item.id">
    <!-- 内容 -->
</div>
```
> 建议尽可能的使用v-for时候给每个元素都提供key

因为他是Vue标识节点的一个通用机制，key并不仅与v-for特别关联

> 不要使用对象或数组之类的非基本类型值作为v-for的key。使用字符串或数字作为key

##### 数组更新检测
###### 变更方法
Vue将被侦听的数组的变更方法进行了包裹，所以它们也将会出发视图的更新，方法包括：
* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

###### 替换数组
变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下也有非变更的方法，例如：filter(), concat() 和slice()。它们不会变更原数组，会返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组。
```js
example1.items = example1.items.filter(function(item){
    return item.message.match(/Foo/)
})
```
> 注：在vue中，用一个含有相同元素的数组去替换原来的数组时非常高效的操作。

> 注：由于JavaScript的显示，Vue不能检测数组和对象的变化。

##### [显示过滤/排序后的结果](./../demo/day04/demo03.html)
有时候，我们想要显示一个过滤后的元素，但又不想改变源数据，这时可以创建一个计算属性，来返回过滤后或排序后的数组。
```html
<li v-for = "n in evenNumber">{{ n }}</li>

data: {
    numbers: [1, 2, 3, 4, 5]
},
computed: {
    evenNumber: function(){
        return this.numbers.filter(function(num){
            return num % 2 == 0
        })
    }
}
```
在计算属性不适用的情况下(例如：在嵌套v-for循环中)可以使用一个方法
```html
<ul v-for = "set in sets">
    <li v-for = "n in even(set)">{{ n }}</li>
</ul>
data: {
    sets: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]
},
methods: {
    even: function(numbers){
        return numbers.filter(function(number){
            return number % 2 === 0
        })
    }
}
```
##### 在v-for里使用值范围
v-for也可以接受整数。这种情况下，它会吧模板重复对应次数
```html
<div>
    <span v-for = "n in 10">{{ n }}</span>
</div>
```
##### 在template上使用v-for
类似于v-if，也可以利用v-for在<template>来循环一段包含多个元素的内容，比如：
```html
<ul>
    <template v-for = "item in items">
        <li>{{ item.msg }}</li>
        <li ckass = "divider" role = "presentation"></li>
    </template>
</ul>
```

##### v-for 与 v-if一起使用
> 注意：不推荐v-for和v-if一起使用。如果使用了v-for的优先级更高

##### 在组件上使用v-for
在自定义的组件上，可以像普通元素一样使用v-for
```html
<my-component v-for = "item in items" :key = "item.id"></my-component>
```
> 在2.2.0+的版本里，组件使用v-for时，key是必输字段
