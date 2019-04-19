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
};

/*
var treeTest = new ParseTree();
console.log("list: " + Object.keys(treeTest));
console.log("root: " + treeTest.root);
treeTest.root = new Node("+");
treeTest.root.left = new Node("3");
treeTest.root.right = new Node("5");
treeTest.root.right.parent = treeTest.root;

console.log("parrent of left null = " + treeTest.root.left.parent);
console.log("parrent of right + = " + treeTest.root.right.parent.value);

var nodeTest = treeTest.root.left;
nodeTest.parent = treeTest.root;

console.log("parrent of left + = " + treeTest.root.left.parent.value);
console.log("parrent of left TEMPORARY + = " + nodeTest.parent.value);
console.log(treeTest.root.left.value);
console.log(treeTest.root.right.value);
*/