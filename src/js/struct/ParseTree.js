class ParseTree {
	constructor() {
		this.root = null;
		this.size = 0;
		this.leaves = [];
	}
};

class Node {
	constructor(value) {
		this.value = value;
		this.parent = null;
		this.left = null;
		this.right = null;
	}
	get getValue() {
		return this.value;
	}
};