export const getNextMonthFromDate = (startDate, index) =>
	new Date(startDate.getFullYear(), startDate.getMonth() + index, 1);

export const getNextMonth = (date) =>
	new Date(date.getFullYear(), date.getMonth() + 1, 1);

export const getPrevMonth = (date) =>
	new Date(date.getFullYear(), date.getMonth() - 1, 1);

export const getMonthDayCount = (date) =>
	new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const getNumberFirsDayOfWeekByMonth = (date) => {
	const day = new Date(date.getFullYear(), date.getMonth()).getDay();

	return day === 0 ? 7 : day;
};

export const getDateWithoutTime = (date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate());