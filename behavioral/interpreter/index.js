class NumberExpression {
	constructor(number) {
		this.number = Number(number);
	}

	interpreter() {
		return this.number;
	}
}

class PlusExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	interpreter() {
		return this.left.interpreter() + this.right.interpreter();
	}
}

class MinusExpression {
	constructor(left, right) {
		this.left = left;
		this.right = right;
	}

	interpreter() {
		return this.left.interpreter() - this.right.interpreter();
	}
}

class Context {
	constructor() {
		this.listNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',] ;
		this.operators = ['+', '-'];
		this.replase = true;
	}

	getReplaseStr(string) {
		const result = string.replace(/\s+/g, '');
		this.replase = false;

		return result;
	}

	evaluate(str) {
		const string = this.replase ? this.getReplaseStr(str) : str;
		let pos = string.length - 1;

		while (pos > 0) {
			if (this.listNumber.includes(string[pos])) {
				pos -= 1;
			} else {
				const left = this.evaluate(string.substr(0, pos));
				const right = new NumberExpression( string.substr(pos + 1, string.length));
				const operator = string[pos];
				switch (operator) {
					case this.operators[0]:
						return new PlusExpression(left, right);
					case this.operators[1]:
						return new MinusExpression(left, right);
				}
			}
		}

		if (pos > 0) {
			this.replase = true;
		}

		return new NumberExpression(string);
	}
}

const context = new Context();
const result1 = context.evaluate('1 +  1 - 51');
const result2 = context.evaluate('-21+1-11');

console.log(result1.interpreter()) // -49
console.log(result2.interpreter()) // -31