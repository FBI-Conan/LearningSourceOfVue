import Observer from "./Observer";
/**
 * @method observe 观测值，如果该值使对象，则做响应式处理
 * @param {*} value 观测的值
 * @returns 
 */
export default function observe(value) {
	// 如果value不是对象，直接返回
	if (typeof value !== "object") return;
	// 定义ob
	const ob = value.__ob__ || new Observer(value);
	return ob;
}