class LaptopTemplate {
	static AMOUNT_COMPONENTS = 3;

	constructor() {
		this.step = 0;
		this.price = 0;
		this.name = null;
		this.componetns = [];
	}

	set addComponent(component) {
		this.componetns.push(component);
	}

	set addPrice(price) {
		this.price += price;
	}

	set increaseStep(price) {
		this.step += price;
	}

	get product() {
		if (this.step !== LaptopTemplate.AMOUNT_COMPONENTS) {
			return false;
		}

		return {
			name: this.name,
			price: this.price,
			components: this.componetns,
		}
	}

	build(){
		this.motherBoard();
		this.graphicBoard();
		this.CPU();
	}
}

class ComponentLaptop {
	constructor(name, price, description = '') {
		this.name = name;
		this.price = price;
		this.description = description;
	}

	get component() {
		return {
			name: this.name,
			price: this.price,
			description: this.description,
		}
	}
}

class Asus130CX extends LaptopTemplate {
	constructor() {
		super();
		this.name = 'Asus130CX';
	}

	motherBoard() {
		const motherBoard = new ComponentLaptop('rog 130c', 2500, 'the best mother');
		const { name, price, description } = motherBoard.component;

		this.addPrice = price;
		this.addComponent = { component: 'Mother Board', name, description };
		this.increaseStep = 1;
	}

	graphicBoard() {
		const graphicBoard = new ComponentLaptop('nvideo rtx 3060', 50000, 'the best graphic');
		const { name, price, description } = graphicBoard.component;

		this.addPrice = price;
		this.addComponent = { component: 'Graphic Board', name, description };
		this.increaseStep = 1;
	}

	CPU() {
		const cpu = new ComponentLaptop('intel i9', 30000, 'the best graphic');
		const { name, price, description } = cpu.component;

		this.addPrice = price;
		this.addComponent = { component: 'cpu', name, description };
		this.increaseStep = 1;
	}
}

class Asus30 extends LaptopTemplate {
	constructor() {
		super();
		this.name = 'Asus30';
	}

	motherBoard() {
		const motherBoard = new ComponentLaptop('rog 50', 1000, 'mother is normal');
		const { name, price, description } = motherBoard.component;

		this.addPrice = price;
		this.addComponent = { component: 'Mother Board', name, description };
		this.increaseStep = 1;
	}

	graphicBoard() {
		return false;
	}

	CPU() {
		const cpu = new ComponentLaptop('intel i9', 30000, 'the best graphic');
		const { name, price, description } = cpu.component;
		const graphicBoard = new ComponentLaptop('intel graphic', 50000, 'it is not normal graphic');
		const componentGraphicBoard = graphicBoard.component;

		this.addPrice = price + componentGraphicBoard.price;
		this.addComponent = { component: 'cpu', name, description }
		this.addComponent = { component: 'Graphic Board', name: componentGraphicBoard.name, description: componentGraphicBoard.description }
		this.increaseStep = 2;
	}
}

const asus130CX = new Asus130CX();
asus130CX.build();
console.log(asus130CX.product);
/* {
  name: 'Asus130CX',
  price: 82500,
  components: [
    { component: 'Mother Board', name: 'rog 130c', description: 'the best mother' },
    { component: 'Graphic Board', name: 'nvideo rtx 3060', description: 'the best graphic' },
    { component: 'cpu', name: 'intel i9', description: 'the best graphic' },
  ]
}*/

const asus30 = new Asus30();
asus30.build();
console.log(asus30.product);
/* {
  name: 'Asus30',
  price: 81000,,
  components: [
    { component: 'Mother Board', name: 'rog 50', description: 'mother is normal' },
    { component: 'Graphic Board', name: 'intel graphic', description: 'it is not normal graphic' },
    { component: 'cpu', name: 'intel i9', description: 'the best graphic' },
  ]
}*/