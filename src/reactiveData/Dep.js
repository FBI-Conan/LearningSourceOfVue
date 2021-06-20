let uid = 0;
/**
 * @method Dep 用来管理依赖(watcher实例)，包括添加并存储依赖，数据响应式变化的时候通知依赖
 */
export default class Dep {
	/**
	 * 两个地方遇到用到Dep实例
	 * 1. Observer类中，数组需要用到
	 * 2. defineReactive中，对象的属性需要用到
	 */
	constructor() {
		this.id = uid++;
		// 用数组存储自己的订阅者(watcher)。subs是英语subscribes订阅者的意思
		this.subs = [];
	}
	// 添加订阅者
	addSub(sub) {
		this.subs.push(sub);
	}
	// 添加依赖（依赖也就是订阅者，后续setter的时候，需要通知到）
	depend() {
		// Dep.target中保存的就是依赖（watcher），需要用一个我们自己指定的全局的位置，你用window.target也行
		if (Dep.target) {
			this.addSub(Dep.target);
		}
	}
	// 通知更新
	notify() {
		// 浅克隆一份
		const subs = this.subs.slice();
		// 遍历
		for (let i = 0, l = subs.length; i < l; i++) {
			subs[i].update();
		}
	}
}
