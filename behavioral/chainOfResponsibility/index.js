class Notification {
	static NORMAL = 1;
	static IMPORTANT = 2;
	static ASAP = 3;


	sendNotification(message, level) {
		if (this.currentLevel <= level) {
			this.notificationAction(message);
		}
		if (this.nextNotification) {
			this.nextNotification.sendNotification(message, level);
		}
	}

	set addNextNotification (notification) {
		this.nextNotification = notification;
	}

	get show() {
		console.log(this)
	}
}

class NotificationSimple extends Notification {
	constructor() {
		super();
		this.currentLevel = Notification.NORMAL;
	}

	notificationAction(message) {
		console.log(`Simple notification: ${message}`);
	}
}

class NotificationEmail extends Notification {
	constructor() {
		super();
		this.currentLevel = Notification.IMPORTANT;
	}

	notificationAction(message) {
		console.log(`Email notification: ${message}`);
	}
}

class NotificationSMS extends Notification {
	constructor() {
		super();
		this.currentLevel = Notification.ASAP;
	}

	notificationAction(message) {
		console.log(`SMS notification: ${message}`);
	}
}

const notificationSimple = new NotificationSimple();
const notificationEmail = new NotificationEmail();
const notificationSMS = new NotificationSMS();

notificationSimple.addNextNotification = notificationEmail;
notificationEmail.addNextNotification = notificationSMS;

notificationSimple.sendNotification('Hello', Notification.NORMAL);
// Simple notification: Hello
notificationSimple.sendNotification('Hello', Notification.IMPORTANT);
// Simple notification: Hello
// Email notification: Hello
notificationSimple.sendNotification('Hello', Notification.ASAP);
// Simple notification: Hello
// Email notification: Hello
// SMS notification: Hello

