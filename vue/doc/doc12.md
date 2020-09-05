### [自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)

##### 事件名
不同于组件和prop，事件名不存在自动大小写转换。出发事件名完全匹配监听这个事件所用的名称即可。一般用kebab-case：
```html
<my-component v-on:my-event = "doSomething"></my-component>
this.$emit('my-event')
```
> 不同于组件和prop，事件名不会被作为一个JavaScript变量名或property名，所以就没有理由使用camelCase或PascalCase了。并且v-on事件监听器在Dom模板中会被自动转化为大小写(因为HTML是大小写不敏感的)。所以v-on:myEvent将会变成v-on:myevent ——导致myEvent不可能被监听到。

因此，推荐始终使用kebab-case的事件名。
##### 自定义组件的v-model(2.2.0+新增)
一个组件上的v-model默认会利用名为value的prop和名为input的事件，但是像单选框、复选框等类型的输入空间将value attribute用于不同的目的。model选项可以用来避免这样的冲突：
###### [例如](./../demo/day06/demo01.html)
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type = "checkbox"
      v-bind:checked = "checked"
      v-on:change = "$emit('change', $event.target.checked)"
    />
  `
})
//使用
<base-checkbox v-model = "lovingVue"></base-checkbox>
```
这里的lovingVue的值将会传入这个名为checked的prop。同时当<base-checkbox>出发一个change事件并附带一个新的值的时候，这个lovingVue的property将会被更新。

注意：任需要在组件的props选项里声明checked这个prop。

##### 将原生事件绑定到组件
有时候我们需要在一个根元素上监听一个原生事件。这时，可以使用v-on的 `.native` 修饰符：
```HTML
<base-input v-on:focus.native = "onFocus"></base-input>
```
这样写有时很有用，不过在尝试监听一个类似 `<input>` 的非常特定的元素时，这并不是个好主意。比如上述的<base-input>组件可能做了如下重构，所以根元素上实际是一个<label>元素：
```HTML
<label>
  {{ label }}
  <input
    v-bind = "$attrs"
    v-bind:value = "value"
    v-on:input = "$emit('input', $event.target.value)"
  />
</label>
```
这时，父级 .native 监听器将默认失败。它不会产生任何报错，但是onFocus处理函数不会有预期被调用的结果。
为了解决这个问题，Vue提供了一个$liteners property, 它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：
```js
{
  focus: function(event){ /*   */ },
  input: function(value){ /*   */ }
}
```
有了这个$listeners property,就可以配合v-on="$listeners"，将所有的事件监听器指向这个组件的某个特定的元素的子元素。对于类似`<input>`可以配合v-model工作的组件来说，这个监听器创建一个类似下述inputListeners的计算属性通常非常有用：
```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function(){
      var vm = this;
      //Object.assign 将所有的对象合并为一个新对象
      return Object.assign({},
        //从父级添加所有的监听器
        this.$listeners,
        //然后我们添加自定义监听器，或覆写一些监听器的行为
        {
          //这里确保组件配合v-model的工作
          input: function(event){
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind = "$attrs"
        v-bind:value = "value"
        v-on = "inputListeners"
      />
    </label>
  `
})
```
现在<base-input>组件是一个完全透明的包裹器了，也就是说它完全像一个普通的`<input>`元素一样使用了：所有跟它相同的attribute和监听器都可以工作，不必使用 .native 监听器。

##### .sync修饰符(2.3.0+新增)
有些情况下，我们可能需要对一个prop进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且父组件和子组件没有明显的变更来源。

这也就是为什么推荐update:myPropName 的模式出发事件取而代之。例如，在一个包含title prop的假设组件中，我们可以用以下方法表达对其赋新值的意图：
```js
this.$emit('update:title', newTitle)
```
然后父组件可以坚挺到那个事件并根据需要更新一个本地的数据property。例如：
```HTML
<text-document
  v-bind:title = "doc.title"
  v-on:update:title = "doc.title = $event"
></text-document>
```
为了方便起见，这种模式提供了一个缩写，即.sync修饰符：
```HTML
<text-document v-bind:title.sync = "doc.title"></text-document>
```
>注意：带有.sync修饰符de v-bind不能喝表达式一起使用(例如v-bind:title.sync = "doc.title + '!'"是无效的)。取而代之的是，只能提供我们想要绑定的property名，类似v-model。

当我们用一个对象同时设置prop的时候，也可以将这个.sync修饰符和v-bind配合使用：
```HTML
<text-document v-bind.sync = "doc"></text-document>
```
这样会把doc对象中的每个property(例如title)作为一个独立的prop传进去，然后各自添加用于更新v-on监听器。
>注意：将v-bind.sync用在一个字面量的对象上，例如v-bind.sync = "{ title: doc.title }"，是无法正常工作的，因为在加息一个像这样复杂表达式的时候，有很多边缘情况需要考虑。
