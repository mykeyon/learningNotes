### Class 与 Style 绑定
>操作元素的class列表和内联样式是数据绑定的一个常见需求。因为它们都是attribute，所以我们可以用v-bind处理它们：只需要通过表达式计算出字符串结果即可。不过，字符串拼接麻烦容易出错。因此，在将v-bind用于class和style时，Vue.js做了专门的增强。表达式结果的类型除了字符串意外，还可以时对象或数组。

##### [对象语法](./../demo/day03/demo01.html)
```html
<style>
    .activeColor{
        color: red;
    }
</style>
<div id = "example">
    <div :class = "{activeColor: showFlag }" @click = "changeColor">hello world</div>
</div>

<script>
    var vm = new Vue({
        el: "#example",
        data: {
            showFlag: true
        },
        methods: {
            changeColor: function(){
                this.showFlag = !this.showFlag
            }
        }
    })
</script>
<!-- 注：可以绑定多个元素 -->
```
绑定的数据不必内联定义在模板内：
```js
<div v-bind:class = "classObject"></div>

data:{
    classObject: {
        active: true,
        "text-danger": false
    }
}
```
同样也可以绑定在返回一个计算属性上：
```js
<div v-bind:class = "classObject"></div>

data:{
    isActive: true,
    error: null
},
computed: {
    classObject: function(){
        return{
            active: this.isActive && !this.error,
            'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}
```
##### [数组语法](./../demo/day03/demo02.html)
在数组语法里还支持三元运算符
```html
<div :class="[isActive ? activeColor : '', errorClass]"></div>
<!-- 在数组语法里还可以使用对象 -->
<div :class="[{activeColor: isActive}, errorClass ]"></div>
```

##### 用在组件上
当在一个自定义组件上使用class property时，这些class将被添加到该组件根元素上。如果这个class已经存在，则会覆盖该class
```js
Vue.component('my-component',{
    template: '<p class = "foo bar">Hi</p>'
})
// 然后再html上使用该组件
<my-component class = "baz boo"></component>

//html将被渲染为
<p class = "foo bar baz boo"></p>

//自定义组件带有绑定class同样适用
```

### 绑定内联样式
##### 对象语法
v-bind:style的对象语法十分直观——看着非常想css，但其实是JavaScript的对象。css property名可以用驼峰(camelCase)或短线分割(kebab-case，记得用引号括起来)命名：
```html
<div v-bind:style = "{ color: activeColor, fontSize: fontSize + 'px'}"></div>

data{
    axtiveColor: 'red',
    fontSize: 30
}
```
同样可以直接在内联样式绑定对象
```html
<div v-bind:style = "styleObject"></div>
data:{
    styleObject: {
        color: 'red',
        fontSize: '13px'
    }
}
```
