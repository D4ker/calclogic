function stringNormTest() {
	const arrayOfStrings = [
	"(A+B)", "(A+B)*(A+C)", 
	"!(A+B)", "A+B+C", "(((A+B)*C)+D)", "(!A+!B)"
	];

	for (let i = 0; i < arrayOfStrings.length; i++) {
		const currentString = arrayOfStrings[i];
		console.log("test " + i + "\nString: " + currentString + 
			"\nNorm string: " + stringNorm(currentString));
	}
};

function main() {
	stringNormTest();
}

main();