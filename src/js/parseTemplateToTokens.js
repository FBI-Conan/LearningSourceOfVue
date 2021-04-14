import Scanner from "./scanner";
import nestTokens from "./nestTokens";
/**
 * 将模板字符串变成tokens数组
 */
export default function parseTemplateToTokens(templateStr) {
	const tokens = [];
	// 创建扫描器
	const scanner = new Scanner(templateStr);
	// 开始扫描
	let words = "";
	// 去除空格
	function removeSpace(str) {
		return str.replace(/^\s+|\s+$/g, "");
	}
	//
	while (!scanner.eos()) {
		words = scanner.scanUntil("{{");
		tokens.push(["text", words]);
		scanner.scan("{{");
		if (scanner.eos()) break;
		words = scanner.scanUntil("}}");
		// name的值代表的是变量  去除一下两旁的空格
		words = removeSpace(words);
		// 判断一下是否是#后者/开头
		const index = words.search(/^\#|^\//);
		if (index === 0) {
			// 如果是 数组第一位则将#或者/存起来 第二位才是真正的变量
			tokens.push([words.slice(0, 1), words.slice(1)]);
		} else {
			tokens.push(["name", removeSpace(words)]);
		}
		scanner.scan("}}");
	}
  // 返回折叠的tokens
	return nestTokens(tokens);
}
