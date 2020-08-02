### 模板语法
    数据绑定最长见的形式是 双大括号({{ }})语法
    v-once指令，可以执行一次性的插值，当数据改变时，插值的内容不会更新。
    v-html指令，可以插入html片段

#### Attribute
```html
<!-- 动态的绑定属性 -->
<div v-bind:id = "dynamicId"></div>
<button v-bind:disabled = "isButtonDisabled">Button</button>
```

```js
// vue对所有的绑定语言都提供了JavaScript语法的支持
// 每个绑定语法里，只支持单个js语句
{{ number + 1}}
{{ ok ? 'Yes' : 'No'}}
{{ message.split("").resover().join("")}}
<div v-bind:id = "'list-' + id"></div>
```

##### 指令
> 指令(Directives)是带有v-前缀的特殊attribute。指令attribute的值是预期的 单个JavaScript表达式 (v-for是个例外)。指令的职责是，当表达式的值被改变时，将其产生的连带影响，响应式的作用于DOM。

##### 参数
    一些指令能够接受一个“参数”，在指令名称之后以冒号表示。例如v-bind指令可以用于响应式的更新HTML attribute：
```html
<a v-bind:href="url">...</a>
```
###### 动态参数
    从2.6.0开始，可以用方括号括起来的JavaScript表达式作为一个指令的参数：
```html
<a v-bind:[attributeName] = "url">...</a>
<!-- 这里的attributeName会被作为一个JavaScript表达啥事进行动态求值，求得的值将会作为最终的参数来使用。例如，如果vue实例有一个data property attributeName，其值为“href”，那么这个绑定等价于v-bind:href -->
<!-- 同样的，可以使用动态参数为一个动态时间名绑定处理函数： -->
<a v-on:[eventName] = "doSomething">...</a>
<!-- 在这个示例中，当eventName的值为“focus”时，v-on:[eventName]将等价于v-on:focus -->
<!-- 注意：动态事件绑定名尽量用全小写的名字 -->
```

##### 修饰符
    修饰符(modifier)是比半角句点(.)，指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如.prevent修饰符告诉v-on指令对于触发的事件调用event.preventDefault():
```html
<form v-on:submit.prevent="onSubmit">...</form>
```

##### 缩写
    v-前缀作为一种视觉提示，用来表示末班中Vue特定的attrubute。使用vue.js为现有标签添加动态行为(dynamic behavior)时，v-前缀很有帮助，然而，对于一些频繁用到的指令来说，就会有点繁琐了。在构建由vue管理所有的单页面应用程序(SPA - single page application)时，v-前缀也没那么重要，因此，vue为v-bind和v-on这两个最常用的指令，提供了特定的简写：
```html
<!-- v-bind缩写 -->
<a v-bind:href="url">...</a>
<a :href="url">...</a>

<!-- 动态参数的缩写(2.6.0) -->
<a :[key]="url">...</a>

<!-- v-on缩写 -->
<a v-on:click="doSomething">...</a>
<a @click = "doSomething">...</a>

<!-- 动态参数的缩写(2.6.0) -->
<a @[event] = "doSomething">...</a>
```
