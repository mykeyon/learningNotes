### [组件基础](https://cn.vuejs.org/v2/guide/components.html)

##### [基本示例](./../demo/day05/demo01.html)

```html
<div id = "components-demo">
  <button-conter></button-conter>
</div>
```
```js
Vue.components('button-conter',{
  data: function(){
    return{
      count: 0
    }
  },
  template: `<button v-on:click = "count++">You clicked me {{ count }} times.</button>`
})
new Vue({
  el: '#components-demo'
})
```
> 注意局部组件放在实例前

因为组件是可复用的Vue实例，所以它们与new Vue接收相同的选项，data，computed，watch，methods以及生命周期钩子等。仅有的例外el，是实例特有的。

可以将组件进行任意次的复用

##### data必须是一个函数
当我们定义这个<button-counter>组件时，data使用的是函数。组件里的data必须用函数。

组件的注册：
* 全局注册
```js
  Vue.component('my-component-name', {
    //...options...
  })
```
* 局部注册

##### 通过Prop向子组件传递数据
Prop是可以在组件上定义attribute。当一个值传递给一个prop attribute的时候，它就变成了那个组件实例的property。为了给博文传递一个标题，我们可以用props选项将其包含该组件可以接收的prop列表：
```html
<blog-post title = "My journey with Vue"></blog-post>
<blog-post title = "Blogging with Vue"></blog-post>
<blog-post title = "Why Vue is so fun"></blog-post>

Vue.component('blog-post',{
  props: ['title'],
  template: `<h3>{{ title }}</h3>`
})
```

在应用中，可能在data里有一个博文：
```html
<blog-post
  v-for = "post in posts"
  v-bind:key = "post.id"
  v-bind:title = "post.title"
/>

new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      {id: 1, title: 'My journey with Vue'},
      {id: 1, title: 'Blogging with Vue'},
      {id: 1, title: 'Why Vue is so fun'},
    ]
  }
})
```
我们可以用v-bind来动态的传递prop。

##### 单个根元素
##### [监听子组件事件](./../demo/day05/demo02.html)
我们在开发`<blog-post>`组件时，它的一些功能可能要求我们和父组件进行沟通。例如可能会放大博文的字号，同时让页面的其他部分保持默认的字号：
在其父组件添加一个postFontSize数据来支持这个功能：
```html
<div id = "blog-posts-events-demo">
  <div :style = "{fontSize: postFontSize + 'em'}">
    <blog-post
      v-for = "post in posts"
      v-bind:key = "post.id"
      v-bind:post = "post"
      v-on:enlarge-text = "postFontSize += 0.1"
    />
  </div>
</div>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class = "blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click = "$emit('enlarge-text')">
        Enlarge.text
      </button>
      <div v-html = "post.content"></div>
    </div>
  `
})
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
      {id: 1, title: 'My journey with Vue', content: `<div>hello world</div>`},
      {id: 2, title: 'Blogging with Vue', content: `<div><h1>Vue是一个渐进式框架</h1><p>欢迎学习vue</p></div>`},
      {id: 3, title: 'Why Vue is so fun', content: "你好"},
    ],
    postFontSize: 1
  }
})
```
父组件可以通过v-on监听子组件实例的任意事件
```html
<blog-post
  v-on:enlarge-text = "postFontSize += 0.1"
></blog-post>
```
同时子组件可以调用内建的$emit方法并传入事件名称来触发事件：
```html
<button v-on:click = "$emit('enlarge-text')">Enlarge text</button>
```

##### [使用事件抛出一个值](./../demo/day05/demo03.html)
有时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让`<blog-post>`组件决定它的文本要放大多少。这时可以使用$emit的第二个参数来提供这个值：
```html
<button v-on:click = "$emit('enlarge-text', 0.1)">Enlarge text</button>
```
父组件监听这个事件的时候，可以用$event访问到抛出的这个值：
```html
<blog-post
  ...
  v-on:enlarge-text = "postFontSize += $event"
/>
```
或者可以用函数来处理
```html
<blog-post
  ...
  v-on:enlarge-text = "onEnlargeText"
/>
那么这个值将作为函数的参数传递到该方法里
methods: {
  onEnlargeText: function(enlargeAmount){
    this.postFontSize += enlargeAmount
  }
}
```
##### 组件上使用v-model
自定义组件也可以使用v-model的自定义输入组件
```html
<input v-model = "searchText" />

<!-- 等价于 -->
<input
  v-bind:value = "searchText"
  v-on:input = "searchText = $event.target.value"
/>
```

当用在组件上时，v-model则会这样：
```html
<custom-input
  v-bind:value = "searchText"
  v-on:input = "searchText = $event"
></custom-input>
```
为了能正常工作，这个组件内的`<input>`必须：
* 将其value attribute绑定到一个名叫value的prop上
* 在其input事件被触发时，将新的值通过定义的input事件抛出
```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value = "value"
      v-on:input = "$emit('input', $event.target.value)"
    />
  `
})
```
现在v-model就可以再组件上完美的工作了：
```html
<custom-input v-model = "searchText"></custom-input>
```

##### 通过插槽分发内容
和HTML元素一样，我们经常需要向一个组件传递内容。例如：
```HTML
<alert-box>Something bad happened.</alert-box>

Vue.component('alert-box',{
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

##### 动态组件
可以通过Vue的`<component>`元素加一个特殊的is attribute来实现：
```HTML
<!-- 组件会在currentTabComponent改变时改变 -->
<component v-bind:is = "currentTabComponent" />
```
上述示例中，currentTabComponent可以包括：
* 已注册组件的名字
* 一个组件的选项对象

##### 解析DOM模板时注意事项
有些html元素例如：ul, ol, table 和 select，对于这些元素内部的元素有严格的限制。例如li, tr 和 option，只能出现在特定的元素内部。

这可能导致我们无法在这些元素里渲染自定义组件
```HTML
<table>
  <blog-post-row />
</table>
```
这些自定义组件blog-post-row，会被视为无效内容提升到外部，导致渲染结果出错。这是可以用特殊的is。
```HTML
<table>
  <tr is = "blog-post-row"></tr>
</table>
```
需要注意的是，如果我们从以下来源使用模板的话，这些条件就不会存在：
* 字符串(例如：template: `...`)
* 单文件组件(.vue)
* `<script type = "text/x-template"></script>`
