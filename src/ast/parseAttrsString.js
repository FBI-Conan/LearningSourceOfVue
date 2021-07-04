/**
 * 将单个属性字符串解析为对象
 * @param {*} singleAttrsString 单个属性字符串 如id="myBox"
 * @returns 解析对象结果 {name: "class", value: "box1"}或者{name:"class", value: [box1, box2]}
 */
function parseSingleAttrsString(singleAttrsString) {
	// 根据=号分割属性名和属性值
	const arr = singleAttrsString.split(/[\=]/);
	// 定义返回结果
	const res = { name: "" };
	res.name = arr[0];
	// 去除属性值中的引号
	const attrValueStr = arr[1].replace(/[\"\']/g, "");
	// 获取所有属性值
	const attrValueArr = attrValueStr.split(" ").filter(item => item);
	if (attrValueArr.length <= 1) {
		res.value = attrValueArr[0];
	} else {
		res.value = attrValueArr;
	}
	return res;
}
/**
 * 将属性字符串转化成数组的形式
 * @param {*} attrsString 属性字符串
 */
export default function parseAttrsString(attrsString) {
	const tempAttrsString = attrsString.trim();
	const arr = [];
	// 遍历字符串，遇到不在引号之内的空格就进行分割处理
	let frontIndex = 0, // 前指针
		rearIndex = 0, // 后指针
		inQuotMark = false; // 是否在引号之内
	// 允许指针移到字符串后面一位
	while (frontIndex <= tempAttrsString.length) {
		const currentChar = tempAttrsString[frontIndex];
		if (currentChar === '"' || currentChar === "'") {
			inQuotMark = !inQuotMark;
		} else if (
			(currentChar === " " && !inQuotMark) ||
			frontIndex === tempAttrsString.length
		) {
			// 遇到不在引号内的空格或者指针到底了
			const validStr = tempAttrsString.slice(rearIndex, frontIndex);
			if (validStr) arr.push(parseSingleAttrsString(validStr));
			rearIndex = frontIndex + 1;
		}
		frontIndex++;
	}
	return arr;
}
