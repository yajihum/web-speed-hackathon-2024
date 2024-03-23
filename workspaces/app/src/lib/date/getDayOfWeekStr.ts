const days = [
	"sunday",
	"monday",
	"tuesday",
	"wednesday",
	"thursday",
	"friday",
	"saturday",
] as const;

export const getDayOfWeekStr = (date: Date) => {
	const dayOfWeek = date.getDay();
	const dayStr = days[dayOfWeek];
	if (dayStr == null) {
		throw new Error("dayOfWeek is invalid");
	}
	return dayStr;
};
