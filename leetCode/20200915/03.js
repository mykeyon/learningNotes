//https://www.nowcoder.com/practice/74d74be449af4c66907fe2d6961c255c?tpId=2&tqId=10851&rp=1&ru=%2Factivity%2Foj&qru=%2Fta%2Ffront-end%2Fquestion-ranking
/*
题目描述
查找两个节点的最近的一个共同父节点，可以包括节点自身

输入描述:
oNode1 和 oNode2 在同一文档中，且不会为相同的节点
*/

function commonParentNode(oNode1, oNode2) {
  for(;oNode1;oNode1=oNode1.parentNode){
    if(oNode1.contains(oNode2)){
      return oNode1;
    }
  }
} 