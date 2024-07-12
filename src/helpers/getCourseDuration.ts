const getCourseDuration = (duration: number): string => {
	if (duration === 0) {
		return '0 minutes';
	}

	const hours = Math.floor(duration / 60);
	const minutes = duration % 60;

	const hoursString = hours === 1 ? 'hour' : 'hours';
	const minutesString = minutes === 1 ? 'minute' : 'minutes';

	let res = '';

	if (hours > 0) {
		res += `${hours} ${hoursString}`;
		if (minutes > 0) {
			res += ' ';
		}
	}
	if (minutes > 0) {
		res += `${minutes} ${minutesString}`;
	}

	return res;
};

export { getCourseDuration };
