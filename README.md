# @untemps/read-per-minute

Class to parse a long text and return an estimated reading time based on a lang rate.

![npm](https://img.shields.io/npm/v/@untemps/read-per-minute?style=for-the-badge)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/untemps/read-per-minute/index.yml?style=for-the-badge)](https://github.com/untemps/read-per-minute/actions)
![Codecov](https://img.shields.io/codecov/c/github/untemps/read-per-minute?style=for-the-badge)

## Installation

```bash
yarn add @untemps/read-per-minute
```

## Usage

Import `ReadPerMinute`:

```javascript
import { ReadPerMinute } from '@untemps/read-per-minute'
```

Create an instance of `ReadPerMinute`:

```javascript
const rpm = new ReadPerMinute()
```

Call the `parse` method with a string and a lang (see [Override the value for a one-time parsing](#override-the-value-for-a-one-time-parsing) for an alternative usage):

```javascript
rpm.parse('Long text', 'en')
```

The `parse` function returns an object with the following properties:

| Property | Description
| -------- | ------------------------------------------------- |
| time     | The estimated reading time in minutes             |
| words    | The number of words in the text                   |
| rate     | The rate value used to calculate the reading time |

## Default Rates

Default rate values come from ["How many words do we read per minute? A review and meta-analysis of reading rate"](https://osf.io/4nv9f/) by Marc Brysbaert - Department of Experimental Psychology Ghent University

| Lang    | Rate |
| ------- | ---- |
| default | 200  |
| ar      | 181  |
| zh      | 260  |
| nl      | 228  |
| en      | 236  |
| fi      | 195  |
| fr      | 214  |
| de      | 260  |
| he      | 224  |
| it      | 285  |
| ko      | 226  |
| es      | 278  |
| sv      | 218  |

If the lang is not listed or is undefined, the default value will be used instead.

## Custom Rates

### Override all the values

You can specify an entire custom rates object in the constructor of an instance:

```javascript
const customRates = {
	default: 220,
	ar: 191,
	zh: 255,
	nl: 234,
	en: 244,
}
const rpm = new ReadPerMinute(customRates)
```

**NOTE**: Set a `default` property in the object if you want the parsing to fallback to a specific value.  
Otherwise, the static value will be used (`ReadPerMinute.rates.default`).

### Override the value for a one-time parsing

Simply pass the desired custom reading rate in words per minute instead of a language code:

```javascript
// For very fast readers: 425 words per minute.
rpm.parse('Long text', 425)
```

**NOTE**: The custom reading rate must be greater than zero or the default value will be used.
