/**
 * https://www.nowcoder.com/practice/a82e035501504cedbe881d08c824a381?tpId=2&tqId=10851&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Ffront-end%2Fquestion-ranking
 * 题目描述
  根据包名，在指定空间中创建对象

  输入描述:
    namespace({a: {test: 1, b: 2}}, 'a.b.c.d')
  输出描述:
  {a: {test: 1, b: {c: {d: {}}}}}
 * 
*/

// function namespace(oNamespace, sPackage) {
//   var str1 = sPackage.slice(0,1),
//       str2 = sPackage.slice(2);
//     if(sPackage.length == 0) return oNamespace;
    
//     if(typeof oNamespace[str1] === "object"){
//       var str3 = sPackage.slice(0,1);
//       if(!oNamespace[str1][str3]){
//         oNamespace[str1][str3] = {}
//         return namespace(oNamespace, str2);
//       }else{
//         return namespace(oNamespace, str2)
//       }
//     }else{
//       return oNamespace.str1 = {}
//     }
// }

//正确答案
function namespace(oNamespace, sPackage) {
  var packNameArr=sPackage.split(".");
  var curObj=oNamespace;
  for(var i=0;i<packNameArr.length;i++){
      if(!curObj.hasOwnProperty(packNameArr[i])){
          curObj[packNameArr[i]]={};
          curObj=curObj[packNameArr[i]];
      }
  }
  return oNamespace;
}

console.log(namespace({a: {test: 1, b: 2}}, 'a.b.c.d'));