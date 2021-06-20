import Dep from "./Dep";
import observe from "./observe";
/**
 * @method defineReactive 封装Object.defineProperty函数，为getter和setter闭包提供变量
 * @param {*} data 对象
 * @param {*} key 属性
 * @param {*} val 值
 */
export default function defineReactive(data, key, val) {
	const dep = new Dep();
	// 如果未传入val
	if (arguments.length === 2) {
		val = data[key];
	}
	// 子元素要进行observe，至此形成了递归。这个递归不是函数自己调用自己，而是多个函数、类循环调用
	let childOb = observe(val);
	Object.defineProperty(data, key, {
		configurable: true,
		enumerable: true,
		get() {
			// 有了get函数就不能有value属性
			// 拦截操作内容
			console.log(`你试图访问${key}属性`);
			// 如果处于依赖收集收集阶段
			if (Dep.target) {
				dep.depend();
				if (childOb) {
					childOb.dep.depend();
				}
			}
			return val;
		},
		set(newVal) {
			// 有了set函数就不能有writable属性
			// 拦截操作内容
			console.log(`你试图修改${key}属性`);
			val = newVal;
			// 当设置了新值，新值也需要observe
			childOb = observe(newVal);
			// 发布订阅模式，通知dep，就会执行new Watcher时候传入的回调函数
			dep.notify();
		},
	});
}
