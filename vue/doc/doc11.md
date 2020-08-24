### Prop
##### Prop的大小写(camelCase vs kebab-case)
HTML中的attribute名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当使用DOM中的模板时，camelCase(驼峰命名法)的prop名需要将其使用等价的kebab-case(短线分割命名)命名：
```HTML
<!-- 在HTML中kebab-case的 -->
<blog-post post-title = "hello"></blog-post>
Vue.component('blog-post',{
  //在JavaScript里是camelCase的
  props: ['postTitle'],
  template: `<h3>{{ postTitle }}</h3>`
})
```
注：如果是使用字符串模板，那么这个限制就不存在

##### Prop类型
到这里，我满只看到以字符串数组形式列出的prop：
```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```
但是，通常我们希望每个prop都有指定的值类型。这是，可以以对象形式列出，这些property的名字和值分别是prop各自的名称和类型：
```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

##### 传递静态或动态的Prop
静态传prop
```HTML
<blog-post title = "My journey with Vue"></blog-post>
```
动态传值是通过v-bind来赋值的，例如
```HTML
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title = "post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title = "post.title + 'by' + post.author.name"></blog-post>
```
上面的实例传的是字符串，其实任何类型都可以传给prop。

##### 传入一个数字
```HTML
<blog-post v-bind:likes = "42"></blog-post>

<blog-post v-bind:likes = "post.likes"></blog-post>
```

##### 传入一个布尔值
```HTML
<!-- 包含该prop没有值的情况在内，都以为这true -->
<blog-post is-published></blog-post>

<blog-post v-bind:is-published = "false"></blog-post>

<blog-post v-bind:is-published = "post.isPublished"></blog-post>
```

##### 传入一个数组
```HTML
<blog-post v-bind:comment-ids = "[234, 266, 273]"></blog-post>

<blog-post v-bind:comment-ids = "post.commentIds"></blog-post>
```
##### 传入一个对象
```HTML
<blog-post
  v-bind:author = "{
    name: 'Veronica',
    company: 'Veridian Dyamics'
  }"></blog-post>

<blog-post v-bind:author = "post.author"></blog-post>
```

#####传入一个对象所有property
如果想将一个对象所有property都作为prop传入，可以使用不带参数的v-bind(取代b-bind:prop-name)。例如，对于一个给定对象post：
```js
post: {
  id: 1,
  title: "My Journey with Vue"
}
```

模板
```HTML
<blog-post v-bind = "post"></blog-post>

<!-- 等价于 -->
<blog-post
  v-bind:id = "post.id"
  v-bind:title = "post.title"
></blog-post>
```

##### 单向数据流













1
