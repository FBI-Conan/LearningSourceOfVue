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
        }else if (token[1].includes(".")) {
          // 将每个.分隔的变量找出来
          const variateArr = token[1].split(".");
          // 创建一个接受每次循环得到的值
          let val = data;
          variateArr.forEach(variate => {
            val = val[variate]
          });
          resultStr += val;
        }else {
          resultStr += data[token[1]]
        }
        break
      }
      case "#": {
        // 这个时候得观察数据结构  此时的token[2]其实又是一个新的tokens 
        // 我们需要把新的tokens和相应新的data在此传给renderTemplate函数
        data[token[1]].forEach(newData => {
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