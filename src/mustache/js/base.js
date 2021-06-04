import parseTemplateToTokens from "./parseTemplateToTokens";
import renderTemplate from "./renderTemplate";
window.SSG_TemplateEngine = {
	render(templateStr, data) {
		// 将模板字符串转换为tokens
		const tokens = parseTemplateToTokens(templateStr);
		console.log(tokens);
		// 调用renderTemplate函数，将tokens变成DOM字符串
		const domStr = renderTemplate(tokens, data);
		console.log(domStr);
		return domStr
	},
};
