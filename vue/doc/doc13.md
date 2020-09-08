### [插槽](https://cn.vuejs.org/v2/guide/components-slots.html)
>在2.6.0以后，具名插槽和作用域引入了一个新的同意语法(即v-slot指令)。它取代了slot和slot-scope这两个已经废弃但未被一出的attribute。

##### 插槽的内容
Vue实现了一套内容分发的API，将`<slot>`元素作为承载分发内容的出口。
```HTML
<navigation-link url = "/profile">
  Your Profile
</navigation-link>
<!-- 然后在navigation-link的模板中可以这样写 -->
<a b-bind:href="url"
  class = "nav-link"
>
  <slot></slot>
</a>
```
当组件渲染的时候，<slot></slot>将会被替换为 Your Profile。插槽内可以包含任何模板代码，包括HTML。

如果`<navigation-link>`的template中没有包含一个`<slot>`元素，则该组件起始标志和结束标志之间的任何内容都会被抛弃。

##### 编译作用域
如果想在插槽里使用数据时：
```HTML
<navigation-link url = "/profile">
  Logged in as {{ user.name }}
</navigation-link>
```
该插槽跟模板的其他地方一样可以访问相同的property(也就是相同的作用域)，而不能访问`<navigation-link>`的作用域。例如url是访问不到的。
> 父模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的

##### 后背内容
有时为一个插槽设置具体的后备(也就是默认值)内容是很有用的，它只会在没有提供内容的时候被渲染。例如一个`<submit-button>`组件中：
```HTML
<button type = "submit">
  <slot></slot>
</button>
```
我们可能希望这个`<button>`内绝大多数情况下渲染 submit，为了将submit作为后备内容，我们可以将他放在`<slot>`标签内：
```HTML
<button type="submit">
  <slot>Sumbit</slot>
</button>
```

##### 具名插槽
> 自2.6.0起有所更新，已废弃slot attrubute的语法

有时候我们需要多个插槽，例如一个由如下模板的`<base-layout>`组件：
```HTML
<div class="container">
  <header>
    <!-- 我们希望吧页面头放在这里 -->
  </header>
  <main>
    <!-- 我们希望把内容放在这里 -->
  </main>
  <footer>
    <!-- 页面希望把页脚放在这里 -->
  </footer>
</div>
```
对于这样的情况，`<slot>`元素有一个特殊的attribute：name。这个attribute可以用来定义额外的插槽：
###### [具名插槽例子](./../demo/day06/demo02.html)
```HTML
<div class="container">
  <header>
    <slot name = "header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name = "footer"></slot>
  </footer>
</div>
```
一个不带name的`<slot>`出口会带有隐含的名字 default。
在想具名插槽提供内容的时候，我们可以在一个`<template>`元素上使用v-slot指令，并以v-slot的参数的形式提供其名称：
```HTML
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
现在`<template>`元素中的所有内容都将会被传入响应的插槽。任何没有被包裹在带v-slot的`<template>`中的内容都被视为默认插槽的内容。也可以在没有v-slot的temolate上标明：v-slot:default.
>注意：v-slot只能添加在`<template>`上(只有一种例外情况)。这一点和已经废弃的slot attrubute不同。

##### [作用域插槽](./../demo/day06/demo03.html)
>自2.6.0起有所更新，已经废弃使用slot-scope attrubute的语法

有时让插槽内容能够访问子组件中才有的数据时很有用的。例如，摄像一个带有如下模板的`<current-user>`组件：
```HTML
<span>
  <slot>{{ user.lastName }}</slot>
</span>
```
我们可能想换掉备用内容，用名而非用姓来显示。如下：
```HTML
<current-user>
  {{ user.firstName }}
</current-user>
```
然而上述代码不会正常工作，因为只有`<current-user>`组件可以访问到user而我们提供的内容是父级渲染的。
为了让user在父级的插槽内容中可用，我们可以将user作为`<slot>`元素的一个attrubute绑定上去：
```HTML
<span>
  <slot v-bind:user = "user">
    {{ user.lastName }}
  </slot>
</span>
```
绑定在`<slot>`元素上的attrubute被称为插槽prop。现在在父级作用域中，我们可以使用带值的v-slot来绑定我们提供的插槽prop的名字：
```HTML
<current-user>
  <template v-slot:default = "slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
在这个例子中，选中将包含所有插槽prop的对象命名为slotProps，但可以使用任意名字。

##### 独占默认插槽的缩写语法
当被提供的内容只有默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把v-slot直接用在组件上：
```HTML
<current-user v-slot:default = "slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```
注意默认插槽的缩写不能喝具名插槽混用，因为它会导致作用域不明确：
```HTML
<!-- 无效，会导致警告 -->
<current-user v-slot= "slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other = "otherSlotProps">
    slotProps is Not available here.
  </template>
</current-user>
```
只要出现多个插槽，始终为所有的插槽使用完整的基于 template 的语法：
```HTML
<current-user>
  <template v-slot:default = "slotProps">
    {{ slotProps.user.firstName }}
  </template>
  <template v-slot:other = "otherSlotProps">
    ...
  </template>
</current-user>
```

##### 解构插槽的Prop
作用域的内部工作原理是讲插槽内容包括在一个传入单个参数的函数里：
function(slotProps){
  //插槽的内容
}
这意味着v-slot的值实际上可以是任何能够作为函数定义中的参数的JavaScript表达式。所以在支持的环境下(单文件组件或现代浏览器)，也可以使用ES2015结构来传入具体的插槽prop。如下：
```html
<current-user v-slot = "{ user }">
  {{ user.firstName }}
</current-user>
```
这样可以使得模板更简洁，尤其是在该插槽提供了多个prop的时候，它同样开启了prop重命名等其他可能。例如将user重命名为person：
```HTML
<current-user v-slot = "{ user:person }">
  {{ person.firstName }}
</current-user>
```
甚至可以定义后备内容，用于插槽prop是undefined的情形：
```HTML
<current-user v-slot = "{ user = { firstName: 'Guest'}}">
  {{ user.firstName }}
<current-user>
```

##### 动态插槽名
> 2.6.0新增

动态指令参数也可以用在v-slot上，来定义动态的插槽名：
```HTML
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

##### 具名插槽的缩写
>2.6.0新增

根v-on和v-bind一样，v-slot也有缩写，即吧参数之前的所有内容(v-slot:)替换为字符#。例如v-slot:header可以被重写为#header：
```html
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
和其他指令一样，该缩写只在其有参数的时候才可用。这意味着以下语法是无效的：
```HTML
<!-- 这样会触发一个警告 -->
<current-user #= "user">
  {{ user.firstName }}
</current-user>
```
如果希望使用缩写的话，必须始终以明确插槽名取而代之：
```HTML
<current-user #default = "user">
  {{ user.firstName }}
</current-user>
```
##### 其他示例
插槽prop允许我们将插槽转化为可复用的模板，这些模板可以基于输入的prop渲染出不同的内容。
