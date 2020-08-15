### 事件处理
##### [监听事件](./../demo04/)
可以用v-on指令监听DOM事件，并在触发时运行一些JavaScript代码。
```html
<div id = "example1">
    <button v-on:click = "counter += 1">Add1</button>
    <p>The button above has bee clicked {{ counter }} times.</p>
</div>
var example1 = new Vue({
    el: '#example1',
    data: {
        counter: 0
    }
})
```
##### 事件处理方法
然而许多事件处理逻辑会比较复杂，直接把JavaScript代码写在v-on指令中不可行。因此v-on还可以接受一个需要调用的方法名。
```html
<div id = "example">
    <button v-on:click = "greet">Greet</button>
</div>
var example = new Vue({
    el: '#example',
    data: {
        name: 'vue.js'
    },
    methods: {
        greet: function(event){
            alert("Hello " + this.name + "!");
            if(event){
                alert(event.target.tagName)
            }
        }
    }
})
example.greet() // 'Hello Vue.js!'
```
##### 内联处理器中的方法
除了直接绑定一个方法，也可以在内联JavaScript语句中调用方法：
```html
<div id = "example">
    <button v-on:click = "say('hi')">Say hi</button>
    <button v-on:click = "say('what')">Say what</button>
</div>

new Vue({
    el: '#example',
    methods: {
        say: function(message){
            alert(message)
        }
    }
})
```
有时候，需要在内联语句中访问原始的DOM事件。可以用特殊变量$event把它传入方法中：
```html
<button v-on:click = "warn('Form cannot be submitted yet.', $event)">Submit</button>
methods: {
    warn: function(message, event){
        if(event){
            event.preventDefault()
        }
        alert(message)
    }
}
```

##### 事件修饰符
在事件处理程序中调用event.preventDefault()或event.stopPropagation()是非常常见的需求。尽管我们可以再方法中轻松实现这点，但更好的方式是：方法值有纯粹的数据逻辑，而不是去处理DOM事件细节。
为了解决这个问题，Vue.js为v-on提供了事件修饰符。修饰符是由点开头的指令后缀来表示的。
* .stop
* .prevent
* .capture
* .self
* .once
* .passive
```html
<!-- 阻止单机事件继续传播 -->
<a v-on:click.stop = "doThis"></a>
<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent = "onSubmit"></form>
<!-- 修饰符可串联 -->
<a v-on:click.stop.prevent = "doThat"></a>
<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>
<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素出发的事件先在此处理，然后才交由内部元素处理 -->
<div v-on:click.capture = "doThis">...</div>
<!-- 只有当在event.target是当前元素映射时出发处理函数 -->
<!-- 即事件不是从内部元素出发的 -->
<div v-on:click.self = "doThat">...</div>
```

>使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用v-on:click.prevent.self会阻止所有的点击，而v-on:click.self.prevent只会阻止对元素自身的点击。

```html
<!-- 2.1.4新增 -->
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once = "doThis">...</a>
<!-- 不像其他只能对原生的DOM事件起作用的修饰符，.once修饰符还能被用到自定义的组件事件上。 -->
```

```html
<!-- 2.3.0新增 -->
<!-- Vue还对应addEventListener中的passive选项提供了.passive修饰符 -->
<!-- 滚动事件的默认行为（即滚动行为）将会立即触发 -->
<!-- 而不会等待`onScroll`完成 -->
<!-- 这其中包含event.preventDefault()的情况 -->
<div v-on:scroll.passive = "onScroll">...</div>
<!-- 这个.passive修饰符尤其能够提升移动端的性能 -->
<!-- 不要把.passive和.prevent一起使用，因为.prevent将会被忽略，同时浏览器可能会展示一个警告。记住：.passive会告诉浏览器不想阻止事件的默认行为 -->
```

##### 按键修饰符
在监听键盘事件时，我们经常需要检查详细的按键。Vue允许为v-on在监听键盘事件时天津按键修饰符：
```html
<!-- 只有在`key`是Enter时，调用vm.submit() -->
<input v-on:keyup.enter = "submit"/>
```
可以直接将KeyboardEvent.key暴露在任意有效按键名转换为kebab-case来作为修饰符
```html
<input v-on:keyup.page-down="onPageDown"/>
```
在上述示例中，处理函数只会在$event.key等于PageDown时被调用。

##### 按键码
> keyCode的事件用法已经被遗弃了，并可能不会被最新的浏览器支持。
使用keyCode attribute也是允许的：
```html
<input v-on:keyup.13="submit">
```
为了在必要情况下支持旧浏览器，Vue提供了绝大多数常用的按键码的别名：
* .enter
* .tab
* .delete(捕获 删除 和 退格 键)
* .esc
* .space
* .up
* .down
* .left
* .right

> 有一些按键(.esc以及所有的方向键)在IE9中有不同的key值，如果想支持IE9，这些内置的别名应该是首选。
还可以通过全局config.keyCodes对象自定义按键修饰符别名：
```js

可以使用`v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

##### 系统修饰符
> 2.1.0新增
可以用以下修饰符来实现仅在按下响应键是才出发鼠标或键盘事件的监听器
* .ctrl
* .alt
* .shift
* .meta
```html
<!-- Alt+C -->
<input v-on:keyup.alt.67 = "clear">
<!-- Ctrl + Click -->
<div v-on:click.ctrl = "doSomething">Do something</div>
```
##### .exact修饰符
```html
<!-- 2.5.0新增 -->
<!-- .exact修饰符允许控制由精确的系统修饰符组合出发的事件 -->
<!-- 即使Alt或Shift被同时按下也会出发 -->
<button v-on:click.ctrl = "onClick">A</button>
<!-- 有且只有Ctrl被按下时才触发 -->
<button v-on:click.ctrl.exact = "onCtrlClick">A</button>
<!-- 没有任何系统修饰符时被按下的时候才会触发 -->
<button v-on:click.exact = "onClick">A</button>
```
##### 鼠标按钮修饰符
2.2.0新增
* .left
* .right
* .middle
这些修饰符会限制处理函数仅响应特定的鼠标按钮。

##### 使用v-on的好处
* 扫一眼HTML模板就能轻松定位JavaScript代码里对应的方法
* 无需再JavaScript里手动绑定事件，ViewModel代码可以是非常纯粹的逻辑，和DOM完全解耦，易于测试。
* 当一个ViewModel被销毁时，所有的事件处理器都会自动被删除。无需担心如何清理它们。
