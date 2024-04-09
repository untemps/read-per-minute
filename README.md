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

Call the `parse` method with a string and a lang:

```javascript
rpm.parse('Long text', 'en')
```

Get the parsed values:

```javascript
const estimatedReadingTime = rpm.time
const numberOfWords = rpm.words
const langRate = rpm.rate
```

### Alternative Use with a Custom Rate

Simply pass the desired custom reading rate in words per minute instead of a language code:

```javascript
// For very fast readers: 425 words per minute.
rpm.parse('Long text', 425)
```

**NOTE**:  The custom reading rate must be greater than zero or the default value will be used.

## Rates

Reading rates by lang come from ["How many words do we read per minute? A review and meta-analysis of reading rate"](https://osf.io/4nv9f/) by Marc Brysbaert - Department of Experimental Psychology Ghent University

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

If the lang is not listed or is undefined, the default value will be used.
