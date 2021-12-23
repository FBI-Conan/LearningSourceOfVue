export default class Compile {
	constructor(el, vue) {
		// vue实例
		this.$vue = vue;
		// 挂载点
		this.$el = document.querySelector(el);
		// 如果用户传入了挂载点
		if (this.$el) {
			// 调用函数，让节点变为fragment，类似于tokens。实际上用的是AST，这里就是轻量级的：fragment
			const fragment = this.node2Fragment(this.$el);
			// 编译
			this.compile(fragment);
		}
	}
	node2Fragment(el) {
		// DocumentFragment相当于占位符，暂时存放那些一次插入文档的节点，避免多次渲染
		// 在vue的底层中其实不是fragment，而是虚拟节点和diff，这里简单的fragment去替代
		const fragment = document.createDocumentFragment(el);
		let child;
		// 让所有的DOM节点，进入fragment
		while ((child = el.firstChild)) {
			// 使用appendChid方法将原dom树中的节点添加到DocumentFragment或者新的标签元素中时，会删除原来的节点
			fragment.appendChild(child);
		}
		return fragment;
	}
	compile(elFragment) {
		// 得到子元素
		const childNodes = elFragment.childNodes;
		const _this = this;
		childNodes.forEach(node => {
			if (node.nodeType === 1) {
				// 元素节点
				_this.compileElement(node);
			} else if (node.nodeType === 3) {
				// 文本节点
				_this.compileText(node);
			}
			if (node.childNodes && node.childNodes.length) {
				// 递归 深层遍历
				_this.compile(node);
			}
		});
	}
	compileElement(node) {
		const nodeAttrs = node.attributes;
		const nodeAttrsArr = Array.from(nodeAttrs);
		nodeAttrsArr.forEach(attr => {
			// 分析指令
			let attrName = attr.name;
			let value = attr.value;
			let dir;
			if (attrName.indexOf("v-") === 0) {
				// v-if v-for v-bind: v-on:
				dir = attrName.slice(2);
				if (dir.startsWith("if")) {
					console.log("发现if指令", value);
				} else if (dir.startsWith("for")) {
					console.log("发现for指令", value);
				} else if (dir.startsWith("bind:")) {
					console.log("发现bind指令", value);
				} else if (dir.startsWith("on:")) {
					console.log("发现on指令", value);
				}
			} else {
			}
		});
	}
	compileText(test) {}
}
