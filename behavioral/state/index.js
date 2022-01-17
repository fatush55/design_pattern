class LoanState {
	constructor(name, nextState) {
		this.name = name;
		this.nextState = nextState;
	}

	next() {
		return new this.nextState();
	}
}

class ApplyForALoan extends LoanState {
	constructor() {
		super('ApplyForALoan', CheckLoan);
	}

	fillIn() {
		console.log(this.name, ': fill in data')
	}
}

class CheckLoan extends LoanState {
	constructor() {
		super('CheckLoan', GiveLoan);
	}

	approve() {
		console.log(this.name, ': approve')
	}

	reject() {
		console.log(this.name, ': reject')
	}
}

class GiveLoan extends LoanState {
	constructor() {
		super('GiveLoan', GiveLoan);
	}

	createLoan() {
		console.log(this.name, ': createLoan')
	}
}

class Loan {
	constructor() {
		this.state = new ApplyForALoan();
	}

	nextState() {
		this.state = this.state.next();
	}
}

const loan = new Loan();

loan.state.fillIn &&  loan.state.fillIn();
loan.nextState();

loan.state.approve && loan.state.approve();
loan.nextState();

loan.state.createLoan && loan.state.createLoan();
/*
	ApplyForALoan : fill in data
	CheckLoan : approve
	GiveLoan : createLoan
 */