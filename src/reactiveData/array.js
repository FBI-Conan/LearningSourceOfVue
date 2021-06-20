import { def } from "./utils";
// 得到Array.prototype
const arrayPrototype = Array.prototype;
// 以Array.prototype为原型创建arrayMethods对象（Object.create）
export const arrayMthods = Object.create(arrayPrototype);
// 要被改写的7个数组方法
const methodsNeedChange = [
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"sort",
	"reverse",
];

methodsNeedChange.forEach(method => {
	// 备份原来的方法, 因为上述7个函数的功能都需要实现
	const original = arrayPrototype[method];
	// 定义新的方法
	def(
		arrayMthods,
		method,
		function () {
			// 将原型为arrayMthods的数组调用的方法通过original方法去实现
			const result = original.apply(this, arguments);
			console.log("你正在操作数组");
			const ob = this.__ob__;
			// push、unshift、splice能够插入新项，现在要把插入的新项也变为响应式的
			let inserted = [];
			switch (method) {
				case "push":
				case "unshift":
					inserted = arguments;
					break;
				case "splice":
					// splice的格式arr.splice(startIndex, num, value1, value2...)
					inserted = Array.from(arguments).slice(2);
					break;
			}
			if (inserted.length) {
				// 将新插入的项变成响应式的
				ob.observeArray(inserted);
			}
			ob.dep.notify();
			return result;
		},
		false
	);
});
