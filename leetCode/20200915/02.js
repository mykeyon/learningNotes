/*
https://www.nowcoder.com/practice/a3ded747e3884a3c86d09d88d1652e10?tpId=2&tqId=10851&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Ffront-end%2Fquestion-ranking
  获取 url 中的参数
    1. 指定参数名称，返回该参数的值 或者 空字符串
    2. 不指定参数名称，返回全部的参数对象 或者 {}
    3. 如果存在多个同名参数，则返回数组

  输入：http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key
  输出：[1, 2, 3]
*/
//我的
// function getUrlParam(sUrl, sKey) {
//   var str = sUrl.split("?")[1];
//   var arr = str.split("&").filter(item => item.indexOf(sKey) > -1);
//   var tempArr = [];
//   arr.forEach(element => {
//     tempArr.push(element.replace(/(\w+=)/g,''))
//   });

//   return tempArr
// }
// console.log(getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe", "key"));


//正确的
function getUrlParam(sUrl,sKey){
	var result = {};
	sUrl.replace(/\??(\w+)=(\w+)&?/g,function(a,k,v){
		if(result[k] !== void 0){
			var t = result[k];
			result[k] = [].concat(t,v);
		}else{
			result[k] = v;
		}
  });
  console.log(result);
	if(sKey === void 0){
		return result;
	}else{
		return result[sKey] || '';
	}
}
console.log(getUrlParam("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe", "key"));