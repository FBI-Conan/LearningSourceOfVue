import parsettrsString from "./parseAttrsString";
/**
 *
 * @param {*} templateString 模板字符串
 */
export default function parse(templateString) {
	// 指针
	let index = 0;
	// 开头由<组成，接下来跟着一堆字母数字形成的标签，然后可能有空格和属性，最后有且只有一个>结束符
	const startReg = /^\<(\w+)([^\>]*)\>/;
	const endReg = /^\<\/(\w+)\>/;
	const wordReg = /\<\/?\w+[^\>]*\>/;
	const blankReg = /^\s+$/;
	// 准备两个栈
	const stack1 = [], // 存放标签
		stack2 = []; // 存放内容;
	while (index < templateString.length) {
		const remainTempString = templateString.slice(index);
		if (startReg.test(remainTempString)) {
			// 检测该字符是否是一个开始标签
			const startTag = remainTempString.match(startReg);
			const attrsString = startTag[2];
			// 将标签推入栈1中，空数组推入栈2中
			stack1.push(startTag[1]);
			// 将空数组推入栈2当中
			stack2.push({ attrs: parsettrsString(attrsString) });
			index += startTag[0].length;
		} else if (endReg.test(remainTempString)) {
			// 检测该字符是否是一个结束标签
			const endTag = remainTempString.match(endReg);
			// 此时的stackTag一定与栈1的栈顶是一对
			const res = stack2.pop();
			res.tag = stack1.pop();
			// 将子标签的内容放置到父标签的对象中
			if (stack2.length === 0) return res;
			const fatherChildren = stack2[stack2.length - 1].children;
			if (fatherChildren) {
				fatherChildren.push(res);
			} else {
				stack2[stack2.length - 1].children = [];
				stack2[stack2.length - 1].children.push(res);
			}
			index += endTag[1].length + 3;
		} else {
			// 检测文字 此时的内容属于stack1栈顶的标签的 放置在stack2栈顶对象中
			const wordMatch = remainTempString.match(wordReg);
			const word = remainTempString.slice(0, wordMatch.index);
			// 此处不用判断wordMatch是否为null，因为前面已经检测了stack2为空直接返回的情况
			if (!blankReg.test(word)) {
				if (stack2[stack2.length - 1].text === undefined) {
					stack2[stack2.length - 1].text = "";
				}
				// 实际上不应该这样去处理，每一段文字应该都看作是一个特殊的text标签，按顺序push进父标签，这样渲染才是按顺序渲染出来的
				stack2[stack2.length - 1].text += word;
			}
			index += wordMatch.index;
		}
	}
}
