/**
 * 折叠tokens 将#和/之间的tokens能够整合起来
 */
export default function nestTokens(tokens) {
	// 创建折叠tokens数组
	const nestedTokens = [];
  // 创建一个栈  用以存放#和/的token
  const sections = [];
  function addToken(token) {
    const length = sections.length
    if(length===0){
      nestedTokens.push(token)
    }else {
      sections[length-1][2].push(token);
    }
  }
	tokens.forEach(token => {
    switch(token[0]){
      case "#":
        // 压栈前还是需要将当前token先放置好
        addToken(token);
        // 压栈
        sections.push(token);
        // token下标为2的地方生成一个空数组  用来存放后续的token
        token[2] = [];
        break;
      case "/":
        // 出栈
        sections.pop();
        break;
      default:
        // 判断栈中是否右内容  如果有  则往栈顶section下标为2的数组中添加token
        addToken(token);
    }
  });
	return nestedTokens;
}
