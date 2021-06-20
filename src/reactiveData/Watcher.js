import Dep from "./Dep";

/**
 * @method parsePath 返回可提取对象深层属性的函数
 * @param {*} str
 * @returns
 */
function parsePath(str) {
	const segments = str.split(".");
	return obj => {
    // 对obj进行深度克隆
		let temObj = JSON.parse(JSON.stringify(obj));
		segments.forEach(segment => {
			if (!temObj) return;
			temObj = temObj[segment];
		});
		return temObj;
	};
}
let uid = 0;
/**
 * @method Watcher 监听对象的某个属性
 * @param target 监听的对象
 * @param expression 监听的对象中的属性
 * @param callback 监听到变化时（因此是配合响应式数据使用的，setter以及改写的数组方法）的回调函数
 */
export default class Watcher {
	constructor(target, expression, callback) {
		this.id = uid++;
		this.target = target;
		this.getter = parsePath(expression);
		this.callback = callback;
		this.value = this.get();
	}
	update() {
		this.run();
	}
	get() {
		// 进入依赖收集阶段
		Dep.target = this;
		// 获取对象的深层属性值
		const obj = this.target;
		let value;
		try {
			// 此处会触发defineReactive中的getter，中间会使用到Dep.target，收集依赖（watcher）
			value = this.getter(obj);
		} finally {
			Dep.target = null;
		}
		return value;
	}
	run() {
		this.getAndInvoke(this.callback);
	}
	getAndInvoke(callback) {
		const value = this.get();
		if (value !== this.value || typeof value === "object") {
			const oldValue = this.value;
			this.value = value;
			callback.call(this.target, value, oldValue);
		}
	}
}
