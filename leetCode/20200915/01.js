//https://www.nowcoder.com/practice/a616b3de81b948fda9a92db7e86bd171?tpId=2&&tqId=10851&rp=1&ru=/activity/oj&qru=/ta/front-end/question-ranking
//封装函数 f，使 f 的 this 指向指定的对象
function bindThis(f, oTarget) {
    return function(){
      return f.apply(oTarget, arguments)
    }
}