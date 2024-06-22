import { TimeComponents, computeTimeComponents } from "./TimeComponents";

test('computing time components from milliseconds', () => {
	expect(computeTimeComponents(0)).toStrictEqual(new TimeComponents(0, 0, 0));
	expect(computeTimeComponents(0.1)).toStrictEqual(new TimeComponents(0, 0, 0));
	expect(computeTimeComponents(100)).toStrictEqual(new TimeComponents(0, 0, 100));
	expect(computeTimeComponents(999)).toStrictEqual(new TimeComponents(0, 0, 999));
	expect(computeTimeComponents(1000)).toStrictEqual(new TimeComponents(0, 1, 0));
	expect(computeTimeComponents(1000.1)).toStrictEqual(new TimeComponents(0, 1, 0));
	expect(computeTimeComponents(59999)).toStrictEqual(new TimeComponents(0, 59, 999));
	expect(computeTimeComponents(60000)).toStrictEqual(new TimeComponents(1, 0, 0));
	expect(computeTimeComponents(60000.1)).toStrictEqual(new TimeComponents(1, 0, 0));
	expect(computeTimeComponents(61000.1)).toStrictEqual(new TimeComponents(1, 1, 0));
	expect(computeTimeComponents(61123)).toStrictEqual(new TimeComponents(1, 1, 123));
	expect(computeTimeComponents(1230000)).toStrictEqual(new TimeComponents(20, 30, 0));

	expect(computeTimeComponents(-100)).toStrictEqual(new TimeComponents(0, 0, 0));
});

test('formatting time components', () => {
	expect(new TimeComponents(0, 0, 0).toString()).toBe('00:00:00');
	expect(new TimeComponents(0, 0, 100).toString()).toBe('00:00:10');
	expect(new TimeComponents(0, 0, 999).toString()).toBe('00:00:99');
	expect(new TimeComponents(0, 1, 0).toString()).toBe('00:01:00');
	expect(new TimeComponents(0, 59, 999).toString()).toBe('00:59:99');
	expect(new TimeComponents(1, 0, 0).toString()).toBe('01:00:00');
	expect(new TimeComponents(1, 1, 0).toString()).toBe('01:01:00');
	expect(new TimeComponents(1, 1, 123).toString()).toBe('01:01:12');
	expect(new TimeComponents(20, 30, 0).toString()).toBe('20:30:00');
});
