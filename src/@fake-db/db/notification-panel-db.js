import NotificationModel from 'app/fuse-layouts/shared-components/notificationPanel/model/NotificationModel';
import mock from '../mock';

const notificationPanelDB = [
	NotificationModel({
		message: 'Welcome to The Co.Hora!'
	})
];

mock.onGet('/api/notification-panel/data').reply(config => {
	return [200, notificationPanelDB];
});
