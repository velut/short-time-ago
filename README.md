# simple-time-ago

This package exports a single function, `timeAgo`,
which describes the time elapsed between a given date and the current date
in a human readable format (e.g., _10 minutes ago_, _in 3 seconds_).

## Pros

-   Simple API and usage
-   Small size (< 1KB)
-   No dependencies
-   Written in Typescript
-   Well tested
-   Accepts a custom `now` anchor time

## Cons

-   Only `en_US` locale support.

## Install

Using `npm`:

```
npm i simple-time-ago
```

Using `yarn`:

```
yarn add simple-time-ago
```

## Usage

Basic usage:

```typescript
import { timeAgo } from 'simple-time-ago';

const myDate = new Date();
const description = timeAgo(myDate);

// Output: `just now`.
console.log(description);
```

Specifying the current date (i.e., the `now` anchor time):

```typescript
import { timeAgo } from 'simple-time-ago';

const myDate = new Date('2019-01-01T00:00:00.000Z');
const now = new Date('2019-01-01T00:01:00.000Z');
const description = timeAgo(myDate, now);

// Output: `1 minute ago`.
console.log(description);
```

```typescript
import { timeAgo } from 'simple-time-ago';

const myDate = new Date('2019-01-02T00:00:00.000Z');
const now = new Date('2019-01-01T00:00:00.000Z');
const description = timeAgo(myDate, now);

// Output: `in 1 day`.
console.log(description);
```

## API

```typescript
timeAgo: (date: Date, now?: Date) => string;
```

## Output

The following table describes `timeAgo`'s output.

| Time elapsed          | Past output       | Future output    |
| --------------------- | ----------------- | ---------------- |
| < 1 second            | `just now`        | `just now`       |
| < 1 minute            | `N second(s) ago` | `in N second(s)` |
| < 1 hour              | `N minute(s) ago` | `in N minute(s)` |
| < 1 day               | `N hour(s) ago`   | `in N hour(s)`   |
| < 1 month (30.5 days) | `N day(s) ago`    | `in N day(s)`    |
| < 1 year (365 days)   | `N month(s) ago`  | `in N month(s)`  |
| > 1 year              | `N year(s) ago`   | `in N year(s)`   |

## License

MIT License

Copyright (c) 2020 Edoardo Scibona

See LICENSE file.
