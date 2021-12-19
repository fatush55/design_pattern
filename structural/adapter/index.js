const users = [
	{ id: '1', name: 'user 1', email: 'example1@example.com' },
	{ id: '2', name: 'user 2', email: 'example2@example.com' },
];

const usersOtherServer = [
	{ id: '1', name: 'user os 1', email: 'example101@example.com', token: '321' },
	{ id: '2', name: 'user os 2', email: 'example202@example.com', token: '123' },
];

class User {
	create({ name, email }){
		const id = users.length + 1;

		users.push({ id, name, email })

		return id;
	}

	getUserId(id) {
		return users.find(val => val.id === id);
	}

	addToken(id, token) {
		const indexUser = users.findIndex(val => val.id === id);
		if (indexUser > -1) {
			users[indexUser].token = token;

			return true;
		}

		console.log('sorry, there is no such user')
	}
}

class OtherServer {
	getUserToken(token){
		return usersOtherServer.find(val => val.token === token);
	}
}

class OtherServerAdapterUser {
	constructor(token) {
		this.server = new OtherServer();
		this.user = new User();
	}

	create(token){
		const data = this.server.getUserToken(token);
		const id =  this.user.create({ name: data.name, email: data.email});

		this.user.addToken(id, token);

		return id;
	}

	getUserId(id) {
		return users.find(val => val.id === id);

	}
}

class Account {
	constructor() {
		this.server = null;
		this.data = null;
	}

	create({ token, formData }){
		if (token) {
			this.data = token;
			this.server = new OtherServerAdapterUser();
		}

		if (!token && formData) {
			this.data = formData;
			this.server = new User();
		}

		const id = this.server.create(this.data);

		return this.server.getUserId(id);
	}
}

const account = new Account();

console.log(account.create({ token: '321' }))
/* {
  id: 3,
  name: 'user os 1',
  email: 'example101@example.com',
  token: '321'
} */

console.log(account.create({ formData: { name: 'Karlo', email: 'karlo1@example'} }))
/* {
	id: 4,
	name: 'Karlo',
	email: 'karlo1@example'
} */