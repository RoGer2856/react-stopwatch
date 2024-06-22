export class TimeComponents {
	minutes: number;
	secondsInTheMinute: number;
	millisInTheSecond: number;

	constructor(minutes: number, secondsInTheMinute: number, millisInTheSecond: number) {
		this.minutes = minutes;
		this.secondsInTheMinute = secondsInTheMinute;
		this.millisInTheSecond = millisInTheSecond;
	}

	toString(): string {
		const millis = Math.floor(this.millisInTheSecond / 10);
		return `${String(this.minutes).padStart(2, '0')}:${String(this.secondsInTheMinute).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
	}
}

export function computeTimeComponents(timeMillis: number): TimeComponents {
	if (timeMillis < 0) {
		return new TimeComponents(0, 0, 0);
	}

	const seconds = Math.floor(timeMillis / 1000);
	const minutes = Math.floor(seconds / 60);
	const millisInTheSecond = Math.floor(timeMillis - seconds * 1000);
	const secondsInTheMinute = seconds - minutes * 60;

	return new TimeComponents(minutes, secondsInTheMinute, millisInTheSecond);
}