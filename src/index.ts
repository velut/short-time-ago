/**
 * This package exports a single function, {@link timeAgo},
 * which describes the time elapsed between a given date and the current date
 * in a human readable format (e.g., `10 minutes ago`, `in 3 seconds`).
 *
 * @packageDocumentation
 */

/**
 * `timeAgo` returns a string describing the time elapsed between
 * a given date and the current date
 * (i.e., the time at which the function is called).
 *
 * @remarks
 * `timeAgo` only supports the `en_US` locale.
 *
 * The following table describes `timeAgo`'s output.
 *
 * ```
 * | Time elapsed          | Past output       | Future output    |
 * | --------------------- | ----------------- | ---------------- |
 * | < 1 second            | `just now`        | `just now`       |
 * | < 1 minute            | `N second(s) ago` | `in N second(s)` |
 * | < 1 hour              | `N minute(s) ago` | `in N minute(s)` |
 * | < 1 day               | `N hour(s) ago`   | `in N hour(s)`   |
 * | < 1 month (30.5 days) | `N day(s) ago`    | `in N day(s)`    |
 * | < 1 year (365 days)   | `N month(s) ago`  | `in N month(s)`  |
 * | > 1 year              | `N year(s) ago`   | `in N year(s)`   |
 * ```
 *
 * @example
 * Basic usage:
 *
 * ```typescript
 * import { timeAgo } from 'simple-time-ago';
 *
 * const myDate = new Date();
 * const description = timeAgo(myDate);
 *
 * // Output: `just now`.
 * console.log(description);
 * ```
 *
 * @example
 * Specifying the current date (i.e., the `now` anchor time):
 *
 * ```typescript
 * import { timeAgo } from 'simple-time-ago';
 *
 * const myDate = new Date('2019-01-01T00:00:00.000Z');
 * const now = new Date('2019-01-01T00:01:00.000Z');
 * const description = timeAgo(myDate, now);
 *
 * // Output: `1 minute ago`.
 * console.log(description);
 * ```
 *
 * ```typescript
 * import { timeAgo } from 'simple-time-ago';
 *
 * const myDate = new Date('2019-01-02T00:00:00.000Z');
 * const now = new Date('2019-01-01T00:00:00.000Z');
 * const description = timeAgo(myDate, now);
 *
 * // Output: `in 1 day`.
 * console.log(description);
 * ```
 *
 * @param date - a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date | Date}
 * @param now - the current date (optional, defaults to `new Date()`)
 */
export function timeAgo(date: Date, now?: Date): string {
    const units: [string, number][] = [
        ['year', 365 * 24 * 60 * 60 * 1000],
        ['month', 30.5 * 24 * 60 * 60 * 1000],
        ['day', 24 * 60 * 60 * 1000],
        ['hour', 60 * 60 * 1000],
        ['minute', 60 * 1000],
        ['second', 1000],
    ];

    const diff = (now || new Date()).getTime() - date.getTime();
    const elapsed = Math.abs(diff);

    for (const [name, size] of units) {
        const value = Math.floor(elapsed / size);
        if (value > 0) {
            const plural = value > 1 ? 's' : '';
            const description = `${value} ${name}${plural}`;
            return diff > 0 ? `${description} ago` : `in ${description}`;
        }
    }

    return 'just now';
}
