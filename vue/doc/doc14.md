### [动态组件 & 异步组件 ](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)
##### 再动态组件上使用keep-alive
之前再多标签的界面中用is attribute来切换不同的组件：
```html
<!-- 不会保存之前的状态 -->
<component v-bind:is = "currentTabComponent"></component>

<!-- 这样可以缓存之前的状态 -->
<keep-alive>
  <component v-bind:is = "currentTabComponent"></component>
</keep-alive>
```

##### 异步组件
```js
Vue.component('async-example', function(resolve, reject){
  setTimeout(function(){
    resolve({
      template: `<div>I am async!!!</div>`
    })
  },1000)
})
```

推荐的做法是将异步组件和webpack的code-spliting功能一起使用：
```js
Vue.component('async-webpack-example', function(resolve){
  /**
  * 这个特殊的 require 语法将会告诉webpack
  * 自动将我们构建的代码切割成多个包，这些包通过ajax请求加载
  */
  require(['./my-async-component'], resolve)
})
```

也可以再工厂函数中返回一个promise，所以吧webpack2和ES2015语法加在一起：
```js
Vue.component('async-webpack-example',
  //这个动态导入会返回一个 Promise 对象
  () => import('./my-async-component')
)
```
当使用局部注册的时候，也可以直接提供一个返回Promise的函数：
```js
new Vue({
  //...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

##### 处理加载状态
> 2.3.0+新增

这里的异步组件工厂函数也可以返回一个如下格式的对象：
```js
const AsyncComponent = () =>({
  //需要加载的最近(应该是一个Promise 对象)
  component: import('./MyComponent.vue'),
  //异步组件加载时使用的组件
  loading: LoadingComponent,
  //加载失败时使用的组件
  error: ErrorComponent,
  //展示加载时组件的延时时间。默认值时200ms
  delay: 200,
  //如果提供了超时间且组件加载也超时了，
  //则使用加载失败时使用的组件。默认值时：Infinity
  timeout: 3000
})
```
