export function padWithZeroes(value: number, desiredLength: number) {
	const stringValue = value.toString();
	const padding = desiredLength - stringValue.length;
	if (padding <= 0) {
		return stringValue;
	} else {
		return "0".repeat(padding) + stringValue;
	}
}
