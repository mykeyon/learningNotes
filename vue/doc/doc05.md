### 条件渲染

##### v-if
v-if指令用于条件性的渲染一块内容，这块内容在指令表达式返回值为true的时候被渲染。
也可以用v-else添加一个else块
```html
<h1 v-if = "awesome">Vue is awesome</h1>
<h1 v-else>Oh on</h1>
```

##### 在`<template>`元素上使用v-if条件渲染分组
因为v-if是一个指令，所以必须绑定到元素上才可以使用。可以绑定在`<template>`元素上做不可见包裹元素，并在使用v-if。最终渲染结果不会包含`<template>`元素。
```
<template v-if = 'ok'>
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
</template>
```

##### v-else
v-else元素必须紧跟在v-if或者v-else-if的元素后面，否则不会被识别。

##### v-else-if(2.1.0新增)

##### 用 key 管理可复用的元素
Vue会尽可能高效的渲染元素，通常会服用已有的元素而不是从头开始渲染。这么做使Vue变得非常快。

##### v-show
用于展示元素显示的指令v-show指令，通过改变display:block||none
> v-show不支持 `<templste>`元素

v-if vs v-show
* v-if 是 “真正”的条件渲染，因为它会确保在切换过程中条件内的事件监听和子组件适当地被销毁和重建。
* v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。
* v-show 就简单得多，不管初始条件时什么，元素总是会被渲染，并且只是简单的基于CSS进行切换。
* 一般来说，v-if有更高的切换开销，而v-show有更高的初始渲染开销。因此，如果需要非常频繁的切换，则使用v-show较好；如果在运行时条件很少改变，则使用v-if较好。

##### v-if 与v-for一起使用
> 不推荐同时使用v-if和v-for

当v-if和v-for一起使用时，v-for具有比v-if更高的优先级。
