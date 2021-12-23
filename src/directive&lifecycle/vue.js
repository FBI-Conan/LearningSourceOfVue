import Compile from "./Compile";

export default class Vue {
	constructor(options) {
		// 把参数options对象存为$options
		this.$options = options;
		// 数据
		this.$data = options.data();
		// 数据变为响应式的
		// 模板的编译
		new Compile(options.el, this);
	}
}
