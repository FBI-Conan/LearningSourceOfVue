import "./js/base";
const templateStr = `
<ul>
	{{#info.info}}
		<li>{{name}}的爱好是：</li>
		{{#hobbies}}
			<p>{{.}}</p>
		{{/hobbies}}
	{{/info.info}}	
</ul>
`;
const data = {
	info: {
		info: [
			{ name: "Conan", age: 18, hobbies: ["侦探", "足球"] },
			{ name: "Heiji", age: 17, hobbies: ["看小说", "游泳", "拳击"] },
			{ name: "Moore", age: 17, hobbies: ["跆拳道"] },
		],
	},
};
const domStr = SSG_TemplateEngine.render(templateStr, data);
const divEl = document.querySelector(".container");
divEl.innerHTML = domStr;
