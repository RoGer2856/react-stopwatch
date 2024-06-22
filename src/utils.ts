export interface ITimecomponents {
	minutes: number,
	secondsInTheMinute: number,
	millisInTheSecond: number,
}

export function computeTimeComponents(timeMillis: number): ITimecomponents {
	if (timeMillis < 0) {
		return { minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 0 };
	}

	const seconds = Math.floor(timeMillis / 1000);
	const minutes = Math.floor(seconds / 60);
	const millisInTheSecond = Math.floor(timeMillis - seconds * 1000);
	const secondsInTheMinute = seconds - minutes * 60;

	return { minutes, secondsInTheMinute, millisInTheSecond };
}