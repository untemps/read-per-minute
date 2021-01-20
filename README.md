# @untemps/read-per-minute

Class to parse a string and return an estimated reading time based on a lang rate.

![npm](https://img.shields.io/npm/v/@untemps/read-per-minute?style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/untemps/read-per-minute/deploy?style=for-the-badge)
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