class Memento {
	constructor(value) {
		this.value = value;
	}
}

class Creator {
	constructor() {
		this.values =  [];
	}

	set add(value) {
		this.values.push(value);
	}

	getValue(key) {
		return this.values[key];
	}

	 get length() {
		return this.values.length;
	}
}

const creat = {
	save: value => new Memento(value),
	restore: memento => memento.value,
};

const creator = new Creator();

creator.add = creat.save({ id: '1', value: '1' });
creator.add = creat.save({ id: '2', value: '2' });

console.log(creat.restore(creator.getValue(creator.length - 1)));
// { id: '2', value: '2' }