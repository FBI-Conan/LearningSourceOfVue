import { def } from "./utils";
import defineReactive from "./defineReactive";
import { arrayMthods } from "./array";
import observe from "./observe";
import Dep from "./Dep";
/**
 * @method Observer 将一个正常的object转换为每个对象层级的属性都是响应式的
 */
export default class Observer {
	constructor(obj) {
		// 每一个Observer的实例上，都有一个dep
		this.dep = new Dep()
		def(obj, "__ob__", this, false);
		if (Array.isArray(obj)) {
			// 如果是数组，则需要强行改变数组的原型为arrayMethods
			Object.setPrototypeOf(obj, arrayMthods);
			// 让这个数组变的observe
			this.observeArray(obj);
		} else {
			this.walk(obj);
		}
	}
	/**
	 * @method walk 遍历obj对象
	 * @param {*} obj
	 */
	walk(obj) {
		for (let k in obj) {
			defineReactive(obj, k);
		}
	}
	/**
	 * @method observeArray 数组的observe特殊遍历，数组的深层响应式处理
	 * @param arr 遍历的数组
	 */
	observeArray(arr) {
		for (let i = 0, l = arr.length; i < l; i++) {
			// 逐项进行observe
			observe(arr[i]);
		}
	}
}
