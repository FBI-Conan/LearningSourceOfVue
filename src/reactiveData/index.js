import observe from "./observe";
import Watcher from "./Watcher";
const obj = {
	a: 1,
	b: {
		m: {
			n: 2,
		},
	},
	c: [3, 4, 5],
};
observe(obj);
new Watcher(obj, "c", function (val, oldVal) {
	console.log("※※※※", val, oldVal);
});
obj.c.push(6);
