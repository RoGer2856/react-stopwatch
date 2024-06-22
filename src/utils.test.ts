import { computeTimeComponents } from "./utils";

test('computing time components from milliseconds', () => {
	expect(computeTimeComponents(0)).toStrictEqual({ minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 0 });
	expect(computeTimeComponents(0.1)).toStrictEqual({ minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 0 });
	expect(computeTimeComponents(100)).toStrictEqual({ minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 100 });
	expect(computeTimeComponents(999)).toStrictEqual({ minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 999 });
	expect(computeTimeComponents(1000)).toStrictEqual({ minutes: 0, secondsInTheMinute: 1, millisInTheSecond: 0 });
	expect(computeTimeComponents(1000.1)).toStrictEqual({ minutes: 0, secondsInTheMinute: 1, millisInTheSecond: 0 });
	expect(computeTimeComponents(59999)).toStrictEqual({ minutes: 0, secondsInTheMinute: 59, millisInTheSecond: 999 });
	expect(computeTimeComponents(60000)).toStrictEqual({ minutes: 1, secondsInTheMinute: 0, millisInTheSecond: 0 });
	expect(computeTimeComponents(60000.1)).toStrictEqual({ minutes: 1, secondsInTheMinute: 0, millisInTheSecond: 0 });
	expect(computeTimeComponents(61000.1)).toStrictEqual({ minutes: 1, secondsInTheMinute: 1, millisInTheSecond: 0 });
	expect(computeTimeComponents(61123)).toStrictEqual({ minutes: 1, secondsInTheMinute: 1, millisInTheSecond: 123 });
	expect(computeTimeComponents(1230000)).toStrictEqual({ minutes: 20, secondsInTheMinute: 30, millisInTheSecond: 0 });

	expect(computeTimeComponents(-100)).toStrictEqual({ minutes: 0, secondsInTheMinute: 0, millisInTheSecond: 0 });
});
