### 介绍
vue是一套用于构建用户界面的 `渐进式框架`。
##### 基本应用
```js
<div id = "app"> {{ message }}</div>

<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'hello world'
        }
    })
</script>
```

##### 可以通过v-bind来绑定元素(简写:)
```js
<div id = "app-2">
    <span :title = "message">鼠标悬停</span>
</div>
<script>
    var app = new Vue({
        el: "#app-2",
        data: {
            message: "Hello world " + new Date().toLocaleString()
        }
    })
</script>
```

##### 条件与循环
```js
<div id = "app-3">
    <div>判断是否显示的值：{{ showFlag }}</div>
    <span v-if = "showFlag">随机显示</span>
</div>
<script>
    var app = new Vue({
        el:　"#app-3",
        data: {
            showFlag: Math.random() > 0.5
        }
    })
</script>
```
##### 常用的指令以及事件
```js
v-if v-show //判断内容显示隐藏
v-for //循环遍历
v-on:click = "reversMessage" //绑定点击事件
v-model //双向绑定
```
