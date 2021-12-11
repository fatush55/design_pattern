const tableUsers = [
	{ id: 1, firstName: 'Dima', secondName: 'Cheremis', birthday: '11/12/1993' },
];

const tableDoctors = [
	{ id: 1, firstName: 'Vasa', secondName: 'Puchkov', birthday: '11/12/1990', experience: 2 },
	{ id: 2, firstName: 'Nasta', secondName: 'Pritula', birthday: '10/06/1991', experience: 3 },
];

const tableAppointments = [
	{
		id: 1,
		userId: 1,
		doctorId: 1,
		timeStart: new Date(2021, 12, 18, 3, 24, 0),
		timeFinish: new Date(2021, 12, 18, 6, 24, 0),
	},
];

class Doctor {
	constructor() {
		this.doctors = tableDoctors;
	}

	getDoctorId(doctorId){
		return this.doctors.find(({ id }) => id === doctorId);
	}
}

class User {
	constructor() {
		this.users = [];

		this.updateUsers();
	}

	updateUsers() {
		this.users = tableUsers;
	}

	getUserId (userId) {
		return this.users.find(({ id }) => id === userId);
	}

	checkUser({ firstName, secondName }) {
		return this.users.find(v => v.firstName === firstName && v.secondName === secondName);
	}

	set createUser({ firstName, secondName, birthday }) {
		if (!firstName || !secondName || !birthday) {
			console.log('Data is not valid');
			return false;
		}

		const user = this.checkUser({ firstName, secondName })

		if (user) {
			console.log('This user has already exists');
			return user;
		}

		const id = this.users.length + 1;

		tableUsers.push({ id, firstName, secondName, birthday });

		this.updateUsers();

		return this.getUserId(id);
	}
}

class Appointment {
	constructor() {
		this.appointments = [];

		this.updateAppointments();
	}

	updateAppointments() {
		this.appointments = tableAppointments;
	}

	getAppointmentId(appointmentId){
		return this.appointments.find(({ id }) => id === appointmentId);
	}

	checkEmptyTime(timeStart) {
		const currentDate = new Date();

		return this.appointments
			.filter(v => {
				const year = v.timeStart.getFullYear() === currentDate.getFullYear();
				const month = v.timeStart.getMonth() === currentDate.getMonth();
				const day = v.timeStart.getDate() === currentDate.getDate();

				return year && month && day;
			})
			.find(({ timeFinish }) => {
				const sameHour = timeFinish.getHours() === timeStart.getHours();
				const isEmptyMinutes = timeFinish.getMinutes() < timeStart.getMinutes();
				const IsEmptyHours = timeFinish.getHours() < timeStart.getHours();

				return (sameHour && isEmptyMinutes) || IsEmptyHours;
		});
	}

	checkFutureTime(time) {
		const correctTime = new Date();

		return time.getTime() < correctTime.getTime();
	}

	set createAppointment({ userId, doctorId, timeStart, timeFinish }) {
		if (this.checkFutureTime(timeStart) && this.checkFutureTime(timeFinish)) {
			console.log('Time is not future');
			return false;
		}

		if (this.checkEmptyTime(timeFinish)) {
			console.log('This time is not correct');
			return false;
		}

		const id = this.appointments.length + 1

		tableUsers.push({ id, userId, doctorId, timeStart });

		this.updateAppointments();

		return this.getAppointmentId(id);
	}
}

class ReceptionFacade {
	constructor() {
		this.user = new User();
		this.doctor = new Doctor();
		this.appointment = new Appointment();
	}

	createReception({ firstName, secondName, birthday, doctorId, timeStart, timeFinish}) {
		const user = this.user.createUser = { firstName, secondName, birthday };

		if (!user) {
			return false;
		}

		const doctor = this.doctor.getDoctorId(doctorId);

		if (!doctor) {
			console.log('The doctor does not exist')
			return false;
		}

		const appointment = this.appointment.createAppointment = { timeStart, timeFinish, doctorId, userId: user.id };

		if (!appointment) {
			return false;
		}

		const date = `${appointment.timeStart.getDate()}/${appointment.timeStart.getMonth()}/${appointment.timeStart.getFullYear()}`;
		const start = `${appointment.timeStart.getHours()}:${appointment.timeStart.getMinutes()}`;
		const finish = `${appointment.timeFinish.getHours()}:${appointment.timeFinish.getMinutes()}`;

		return {
			userName: `${user.firstName} ${user.secondName}`,
			doctorName: `${doctor.firstName} ${doctor.secondName}`,
			time: `from ${date} - ${start} to ${date} - ${finish}`
		}
	}
}

const reception = new ReceptionFacade();
const r1 = reception.createReception({
	firstName: 'Kosta',
	secondName: 'Zuravel',
	birthday: '15/06/1993',
	doctorId: 1,
	timeStart: new Date(2022, 1, 18, 8, 30, 0),
	timeFinish: new Date(2022, 1, 18, 11, 30, 0),
});

const r2 = reception.createReception({
	firstName: 'Kosta',
	secondName: 'Zuravel',
	birthday: '15/06/1993',
	doctorId: 1,
	timeStart: new Date(2022, 1, 18, 12, 30, 0),
	timeFinish: new Date(2022, 1, 18, 14, 30, 0),
});

console.log(r1);
/*{
  userName: 'Kosta Zuravel',
  doctorName: 'Vasa Puchkov',
  time: 'from 18/1/2022 - 8:30 to 18/1/2022 - 11:30'
} */

console.log(r2);
/*
This user has already exists
{
  userName: 'Kosta Zuravel',
  doctorName: 'Vasa Puchkov',
  time: 'from 18/1/2022 - 12:30 to 18/1/2022 - 14:30'
}
* */

