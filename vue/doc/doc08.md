### 表单输入
##### 基础用法
可以用v-model指令在表单`<input>`、`<textarea>` 以及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选择正确的方式来更新元素。尽管神奇，但是v-model本质上不过是语法糖。它负责监听用户输入事件以及更新数据，并对一些极端场景进行了特殊的处理。
> v-model会忽略所有表单元素的value、checked、selected attribute的初始值而总是将Vue实例的数据作为数据来源。我们应该通过JavaScript再组件的data选项中声明初始值。

v-model在内部为不同的输入元素使用不同的property并抛出不同的事件：
* text和textarea元素使用value property和input事件；
* checkbox和radio使用checked property和change事件；
* select字段将value作为prop并将change作为事件。

##### 文本
```html
<input v-model = "message" placeholder = "edit me" />
<p>Message is: {{ message }}</p>
```

##### 多行文本
```html
<span>Multline message is:</span>
<p style = "white-space: pre-line;">{{ message }}</p>
<br />
<textarea v-model = "message" placeholder = "add multiple lines"></textarea>
<!-- 注意：在本区域插值(<textarea>{{ message }}</textarea>)并不会生效，应该用v-model来代替 -->
```

##### 复选框
单个复选框，绑定布尔值：
```html
<input type = "checkbox" id = "checkbox" v-model = "checked"/>
<label for = "checkbox">{{ checked }}</label>
```
多个复选框，绑定到同一个数组
```html
<input type = "checkbox" id = "jack" value = "Jack" v-model = "checkedNames" />
<label for = "jack">Jack</label>
<input type = "checkbox" id = "john" value = "John" v-model = "checkedNames" />
<label for = "john">John</label>
<input type = "checkbox" id = "mike" value = "Mike" v-model = "checkedNames" />
<label for = "mike">Mike</label>
<br />
<span>Checked names: {{ checkedNames }}</span>

new Vue({
  el: '...',
  data: {
    checkedNames: []
  }
})
```

##### 单选按钮
```html
<div id = "example-4">
  <input type = "radio" id = "one" value = "One" v-model = "picked" />
  <label for = "one">One</label>
  <br />
  <input type = "radio" id = "two" value = "Two" v-model = "picked" />
  <label for = "two">Two</label>
  <br />
  <span> Picked: {{ picked }}</span>
</div>

new Vue({
  el: "example-4",
  data: {
    picked: ''
  }
})
```

##### 选择框
单选时：
```html
<div id = "example-5">
  <select v-model = "selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
new Vue({
  el: "#example-5",
  data: {
    selected: ''
  }
})
```
>如果v-model表达式的初始值未能匹配任何选项,`<select>`元素将被渲染为“未选中”状态，在ios中，这会使用户无法选择第一个选项。因为这样的情况下，ios不会触发change事件。因此更推荐像上面一样提供一个控制为禁用的状态。

多选时(绑定到一个数组)
```html
<div id = "example-6">
  <select v-model = "selected" multiple style = "width: 50px;">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <br>
  <span>Selected: {{ selected }}</span>
</div>  
new Vue({
  el: "#example-6",
  data: {
    selected: []
  }
})
```

用v-for渲染动态选项
```html
<select v-model = "selected">
  <option v-for = "option in options" v-bind:value="option.value">{{ option.text }}</option>
</select>
<span>Selected: {{ selected }}</span>
new Vue({
  el: '...',
  data: {
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
```

##### 绑定值
对于单选按钮，复选框以及选择框的选项，v-model绑定的值通常是静态的字符串(对于复选框也可以是布尔值)：
```html
<!-- 当选中时，picked为字符串“a” -->
<input type="radio" v-model = "picked" value="a" />

<!-- toggle为true或false -->
<input type="checkbox" v-model = "toogle" />

<!-- 当选中第一个选项时，selected为字符串abc -->
<select v-model = "selected">
  <option value="abc">ABC</option>
</select>
```
但是，优势我们可能吧绑定值动态绑定到vue的property上，可以使用v-bind来实现，并且这个property的值可以不是字符串。

##### 复选框
```html
<input type="checkbox" v-model = "toggle" true-value = "yes" false-value = "no" />

<!-- 当选中时 -->
vm.toggle === 'yes'
<!-- 当没有选中时 -->
vm.toggle === 'no'
```
> 这里的true-value和false-value attribute并不会影响输入控件的value attribute，因为浏览器在提交表单是并不会包含未被选中的复选框。如果要确保表单中这两个值的一个能够被提交，（即 yes 或no），换用单选按钮。

##### 单选按钮
```html
<input type="radio" v-model = "pick" v-bind:value = 'a' />

<!-- 当选中时 -->
vm.pick === vm.a
```

##### 选择框的选项
```html
<select v-model = "selected">
  <!-- 内联对象字面量 -->
  <option v-bind:value="{number: 123}">123</option>
</select>

<!-- 当选中时 -->
typeof vm.selectd //object
vm.selected.number //123
```

##### 修饰符

.lazy
在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步(除了上述输入法组合文字时)。可以添加lazy修饰符，从而转为在change事件之后进行同步。
```html
<input v-model.lazy = "msg" />
```

.number 自动将用户输入数值转为数值类型。

.trim 自动过滤用户输入的首尾空格
