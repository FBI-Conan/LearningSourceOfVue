// lookup用以返回对象中的属性值
import lookup from "./lookup"
/**
 * 将tokens变成DOM字符串
 */
export default function renderTemplate(tokens, data) {
  // 创建结果字符串
  let resultStr = ""
  tokens.forEach(token => {
    // 首先判断token[0]是什么  text  name  #
    // 从而决定处理方式
    switch(token[0]){
      case "name": {
        if(token[1]==="."){
          resultStr += data
        }else {
          resultStr += lookup(data, token[1])
        }
        break
      }
      case "#": {
        // 这个时候得观察数据结构  此时的token[2]其实又是一个新的tokens 
        // 我们需要把新的tokens和相应新的data在此传给renderTemplate函数
        lookup(data, token[1]).forEach(newData => {
          resultStr += renderTemplate(token[2], newData)
        })
        break
      }
      default: {
        resultStr += token[1]
      }
    }
  })
  return resultStr
}