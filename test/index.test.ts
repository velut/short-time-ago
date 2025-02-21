import { describe, expect, it } from "vitest";
import { timeAgo } from "../src";

const millisecond = 1;
const second = 1000 * millisecond;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
const month = 30.5 * day;
const year = 365 * day;

describe("when `now` parameter is not given, timeAgo", () => {
	it("computes time differences based on the current time", () => {
		const date = new Date();
		expect(timeAgo(date)).toEqual("just now");
	});
});

describe("when date is in the past, timeAgo", () => {
	const now = new Date();

	it("returns `just now` if the time difference is < 1 second", () => {
		for (const i of range(0, 1000)) {
			const date = new Date(now.getTime() - i * millisecond);
			expect(timeAgo(date, now)).toEqual("just now");
		}
	});

	it("returns `N second(s) ago` if the time difference is < 1 minute", () => {
		for (const i of range(1, 59)) {
			const date = new Date(now.getTime() - i * second);
			expect(timeAgo(date, now)).toEqual(`${i} second${i > 1 ? "s" : ""} ago`);
		}
	});

	it("returns `N minute(s) ago` if the time difference is < 1 hour", () => {
		for (const i of range(1, 59)) {
			const date = new Date(now.getTime() - i * minute);
			expect(timeAgo(date, now)).toEqual(`${i} minute${i > 1 ? "s" : ""} ago`);
		}
	});

	it("returns `N hour(s) ago` if the time difference is < 1 day", () => {
		for (const i of range(1, 23)) {
			const date = new Date(now.getTime() - i * hour);
			expect(timeAgo(date, now)).toEqual(`${i} hour${i > 1 ? "s" : ""} ago`);
		}
	});

	it("returns `N day(s) ago` if the time difference is < 1 month (30.5 days)", () => {
		for (const i of range(1, 30)) {
			const date = new Date(now.getTime() - i * day);
			expect(timeAgo(date, now)).toEqual(`${i} day${i > 1 ? "s" : ""} ago`);
		}
	});

	it("returns `N month(s) ago` if the time difference is < 1 year", () => {
		for (const i of range(1, 11)) {
			const date = new Date(now.getTime() - i * month);
			expect(timeAgo(date, now)).toEqual(`${i} month${i > 1 ? "s" : ""} ago`);
		}
	});

	it("returns `N year(s) ago` if the time difference is > 1 year", () => {
		for (const i of range(1, 100)) {
			const date = new Date(now.getTime() - i * year);
			expect(timeAgo(date, now)).toEqual(`${i} year${i > 1 ? "s" : ""} ago`);
		}
	});
});

describe("when date is in the future, timeAgo", () => {
	const now = new Date();

	it("returns `just now` if the time difference is < 1 second", () => {
		for (const i of range(0, 1000)) {
			const date = new Date(now.getTime() + i * millisecond);
			expect(timeAgo(date, now)).toEqual("just now");
		}
	});

	it("returns `in N second(s)` if the time difference is < 1 minute", () => {
		for (const i of range(1, 59)) {
			const date = new Date(now.getTime() + i * second);
			expect(timeAgo(date, now)).toEqual(`in ${i} second${i > 1 ? "s" : ""}`);
		}
	});

	it("returns `in N minute(s)` if the time difference is < 1 hour", () => {
		for (const i of range(1, 59)) {
			const date = new Date(now.getTime() + i * minute);
			expect(timeAgo(date, now)).toEqual(`in ${i} minute${i > 1 ? "s" : ""}`);
		}
	});

	it("returns `in N hour(s)` if the time difference is < 1 day", () => {
		for (const i of range(1, 23)) {
			const date = new Date(now.getTime() + i * hour);
			expect(timeAgo(date, now)).toEqual(`in ${i} hour${i > 1 ? "s" : ""}`);
		}
	});

	it("returns `in N day(s)` if the time difference is < 1 month (30.5 days)", () => {
		for (const i of range(1, 30)) {
			const date = new Date(now.getTime() + i * day);
			expect(timeAgo(date, now)).toEqual(`in ${i} day${i > 1 ? "s" : ""}`);
		}
	});

	it("returns `in N month(s)` if the time difference is < 1 year", () => {
		for (const i of range(1, 11)) {
			const date = new Date(now.getTime() + i * month);
			expect(timeAgo(date, now)).toEqual(`in ${i} month${i > 1 ? "s" : ""}`);
		}
	});

	it("returns `in N year(s)` if the time difference is > 1 year", () => {
		for (const i of range(1, 100)) {
			const date = new Date(now.getTime() + i * year);
			expect(timeAgo(date, now)).toEqual(`in ${i} year${i > 1 ? "s" : ""}`);
		}
	});
});

describe("timeAgo", () => {
	it("describes the elapsed time", () => {
		const testCases = [
			// Same instant
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "just now",
			},
			// Date is in the past with respect to current date
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.001Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.100Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.999Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:01.000Z",
				want: "1 second ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:30.000Z",
				want: "30 seconds ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:59.000Z",
				want: "59 seconds ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:59.999Z",
				want: "59 seconds ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:01:00.000Z",
				want: "1 minute ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:30:00.000Z",
				want: "30 minutes ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:59:00.000Z",
				want: "59 minutes ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:59:59.999Z",
				want: "59 minutes ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T01:00:00.000Z",
				want: "1 hour ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T23:00:00.000Z",
				want: "23 hours ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-01T23:59:59.999Z",
				want: "23 hours ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-02T00:00:00.000Z",
				want: "1 day ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-10T00:00:00.000Z",
				want: "9 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-10T23:59:59.999Z",
				want: "9 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-11T00:00:00.000Z",
				want: "10 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-30T00:00:00.000Z",
				want: "29 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-30T23:59:59.999Z",
				want: "29 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-01-31T00:00:00.000Z",
				want: "30 days ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-02-01T00:00:00.000Z",
				want: "1 month ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-11-01T00:00:00.000Z",
				want: "9 months ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-11-02T00:00:00.000Z",
				want: "10 months ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-12-31T00:00:00.000Z",
				want: "11 months ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2019-12-31T23:59:59.999Z",
				want: "11 months ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2020-01-01T00:00:00.000Z",
				want: "1 year ago",
			},
			{
				date: "2019-01-01T00:00:00.000Z",
				curr: "2030-01-01T00:00:00.000Z",
				want: "11 years ago",
			},
			// Date is in the future with respect to current date
			{
				date: "2019-01-01T00:00:00.001Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:00.100Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:00.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "just now",
			},
			{
				date: "2019-01-01T00:00:01.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 second",
			},
			{
				date: "2019-01-01T00:00:30.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 30 seconds",
			},
			{
				date: "2019-01-01T00:00:59.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 59 seconds",
			},
			{
				date: "2019-01-01T00:00:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 59 seconds",
			},
			{
				date: "2019-01-01T00:01:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 minute",
			},
			{
				date: "2019-01-01T00:30:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 30 minutes",
			},
			{
				date: "2019-01-01T00:59:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 59 minutes",
			},
			{
				date: "2019-01-01T00:59:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 59 minutes",
			},
			{
				date: "2019-01-01T01:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 hour",
			},
			{
				date: "2019-01-01T23:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 23 hours",
			},
			{
				date: "2019-01-01T23:59:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 23 hours",
			},
			{
				date: "2019-01-02T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 day",
			},
			{
				date: "2019-01-10T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 9 days",
			},
			{
				date: "2019-01-10T23:59:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 9 days",
			},
			{
				date: "2019-01-11T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 10 days",
			},
			{
				date: "2019-01-30T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 29 days",
			},
			{
				date: "2019-01-30T23:59:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 29 days",
			},
			{
				date: "2019-01-31T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 30 days",
			},
			{
				date: "2019-02-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 month",
			},
			{
				date: "2019-11-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 9 months",
			},
			{
				date: "2019-11-02T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 10 months",
			},
			{
				date: "2019-12-31T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 11 months",
			},
			{
				date: "2019-12-31T23:59:59.999Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 11 months",
			},
			{
				date: "2020-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 1 year",
			},
			{
				date: "2030-01-01T00:00:00.000Z",
				curr: "2019-01-01T00:00:00.000Z",
				want: "in 11 years",
			},
		];
		for (const { date, curr: now, want } of testCases) {
			expect(timeAgo(new Date(date), new Date(now))).toEqual(want);
		}
	});
});

function range(start: number, size: number): number[] {
	return [...Array(size).keys()].map((i) => i + start);
}
