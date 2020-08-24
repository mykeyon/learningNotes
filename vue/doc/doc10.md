### 组件注册

##### 组件名
在注册组件时候我们需要给它起一个名字。例如全局注册：
```js
Vue.component('my-component-name', {
  /*....*/
})
```
##### 组件名大小写
定义组件名的方式有两种：
* 使用kebab-case
```js
Vue.component('my-component-name', { /* ... */})
```
当使用kebab-case(短线分割命名)定义一个组件时，在引用时必须也使用kabab-case。例如<my-component-name>
* 使用PascalCase
```js
Vue.component('MyComponentName', { /* ... */})
```
当使用pascalCase(首字母大写命名)定义一个组件时，在应用这个自定义元素时，两种命名方式都可以用，<my-component-name>或<MyComponentName>都是可以接受的。注意：尽管如此，直接在DOM(即非字符串的模板)中使用时只有kabab-case是有效的。

##### 全局注册

##### 局部注册
全局注册是不够理想的，使用webpack构建时，全局注册的组件即是不用了也会构建在应用里。增加了用户无谓的下载
```js
var ComponentA = { /* ...*/}
var ComponentB = { /* ...*/}
var ComponentC = { /* ...*/}
// 然后在components选项中定义想要使用的组件
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB,
  }
})
```
对于components对象中的每个property来说，其property名就是自定义元素的名字，其property值就是这个组件的选项对象。
注意局部注册的组件在其子组件中不可用。例如，如果希望ComponentA在ComponentB中使用，可以这样写：
```js
var ComponentA = { /* ... */ }
var ComponentB = {
  components: {
    'component-a': ComponentA
  }
}
```
通过Babel和webpack使用ES2015模块，代码看起来是这样的：
```js
import ComponentA from './ComponentA.vue'

export default{
  components: {
    ComponentA
  }
  //...
}
```

### 模块系统
##### 在模块系统中局部注册
推荐创建一个components目录，并将每个组件放置在其各自的文件中。
然后需要在局部注册之前导入每个我们要使用的组件，例如，在一个假设的ComponentB.js或ComponentB.vue文件中：
```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default{
  components: {
    ComponentA,
    ComponentC
  },
  //...
}
```
现在ComponentA和ComponentC都可以在ComponentB的模板中使用了

##### 基础组件自动化全局注册
可能我们许多组件值包裹了一个输入框或按钮之类的元素，是相对通用的。我们优势会把他们成为基础组件。它们会在各自组件中被频繁的用到。
所以会导致很多组件里包含了基础组件的长列表：
```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default{
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```
而只是用于模板中的一小部分：
```html
<BaseInput
  v-model = "searchText"
  @keydown.enter = "search"
/>
<BaseButton @click = "search">
  <BaseIcon name = "search" />
</BaseButton>
```
如果恰好使用了webpack(或者内部使用了webpack的Vue CLI3+)，那么久可以使用require.context只全局注册这些非常通用的基础组件。这里有一个再应用入口文件(比如src/main.js)中全局导入基础组件的示例代码：
```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  //其组件目录的相对路径
  './components',
  //是否查询其子目录
  fasle,
  //匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.key().forEach(fileName =>{
  //获取组件配置
  const componentConfig = requireComponent(fileName)
  //获取组件的PascalCase命名
  const componentName = upperFirst(
    camelCase(
      //获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  //全局注册组件
  Vue.component(
    componentName,
    //如果这个组件选项时通过 export default 导出的，
    //那么久会优选使用  .default,
    //否则回退到使用模板的根
    componentConfig.default || componentConfig
  )
})
```
