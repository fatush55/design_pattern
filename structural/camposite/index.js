class Component {
	set setPrice(price) {
		this.price = price;
	}

	set setName(name) {
		this.name = name;
	}

	get getPrice() {
		return this.price;
	}

	get getName() {
		return this.name;
	}
}

class MobileComponent extends Component {
	static camera = 'camera';
	static screen = 'screen';
	static cpu = 'cpu';
	static battery = 'battery';

	constructor(price, name) {
		super();
		this.setPrice = price;
		this.setName = name;
	}
}

class MobileFactory {
	create(type) {
		if (MobileComponent.cpu === type) {
			return new MobileComponent(200, 'CPU');
		}

		if (MobileComponent.camera === type) {
			return new MobileComponent(400, 'Camera');
		}

		if (MobileComponent.screen === type) {
			return new MobileComponent(600, 'Screen');
		}

		if (MobileComponent.battery === type) {
			return new MobileComponent(300, 'Battery');
		}
	}
}

class MobileComposite extends Component{
	constructor() {
		super();

		this.componets = [];
	}

	add(component) {
		this.componets.push(component);
	}

	get _price() {
		return this.componets
			.map(val => val.getPrice)
			.reduce((a, b) => a + b);
	}

	get _description() {
		return this.componets
			.map(val => val.getName)
			.join(', ')
	}

	get getInfo() {
		return {
			brent: 'Apple',
			model: 'iPhone 12s',
			price: this._price,
			description: this._description,
		}
	}
}

const componentList = [MobileComponent.cpu, MobileComponent.battery, MobileComponent.camera, MobileComponent.screen]
const mobileFactory = new MobileFactory();
const mobileComposite = new MobileComposite();

componentList.forEach(val => {
	const component = mobileFactory.create(val)
	mobileComposite.add(component)
});

console.log(mobileComposite.getInfo)
/* {
  brent: 'Apple',
  model: 'iPhone 12s',
  price: 1500,
  description: 'CPU, Battery, Camera, Screen'
} */

