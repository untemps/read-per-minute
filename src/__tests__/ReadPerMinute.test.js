import { describe, expect, test } from 'vitest'

import ReadPerMinute from '../ReadPerMinute'

const WORDS = [
	'year',
	'learn',
	'key',
	'cook',
	'crosswalk',
	'script',
	'chief',
	'plan',
	'meat',
	'vague',
	'demonstrator',
	'dictionary',
	'visible',
	'bomber',
	'variation',
	'leader',
	'channel',
	'litigation',
	'royalty',
	'impulse',
	'package',
	'oppose',
	'privilege',
	'begin',
	'operation',
	'herd',
	'hemisphere',
	'incongruous',
	'horror',
	'pipe',
	'start',
	'vertical',
	'worry',
	'reform',
	'unlike',
	'exhibition',
	'disagree',
	'allow',
	'patrol',
	'combine',
	'impress',
	'invisible',
	'cage',
	'log',
	'snow',
	'undertake',
	'division',
	'ethics',
	'damage',
	'responsible',
]
const generateTokenizedText = (separator = '%', maxWordCount = 50, minWordCount = 10) => {
	let str = ''
	let int = ''
	let tok = {}
	const l = Math.ceil(Math.random() * (maxWordCount - minWordCount)) + minWordCount
	for (let i = 0; i < l; i++) {
		const r = Math.random() > 0.7
		const w = WORDS[Math.floor(Math.random() * WORDS.length)]
		str += `${i > 0 ? ' ' : ''}${r ? separator : ''}${w}${r ? separator : ''}`
		if (r) {
			tok[w] = 'gag'
			int += `${i > 0 ? ' ' : ''}${r ? tok[w] : ''}`
		} else {
			int += `${i > 0 ? ' ' : ''}${r ? separator : ''}${w}${r ? separator : ''}`
		}
	}
	return { str, int, tok }
}

describe('ReadPerMinute', () => {
	describe('constructor', () => {
		test('Instantiates class with no error', () => {
			expect(() => new ReadPerMinute()).not.toThrow()
		})
	})

	describe('isLangExist', () => {
		test('Returns false as lang is not specified', () => {
			expect(ReadPerMinute.isLangExist()).toBeFalsy()
		})

		test.each([
			[null, false],
			['Foo', false],
			[42, false],
			[() => null, false],
			[[], false],
			[{}, false],
			[Object.keys(ReadPerMinute.rates)[1], true],
			['de', true],
		])('Returns lang existence', (value, expected) => {
			expect(ReadPerMinute.isLangExist(value)).toBe(expected)
		})
	})

	describe('parse', () => {
		test('Parses text using default values', () => {
			const instance = new ReadPerMinute()
			expect(instance.parse()).toEqual({ time: 0, words: 0, rate: ReadPerMinute.rates.en })
			expect(
				instance.parse(generateTokenizedText(null, ReadPerMinute.rates.en, ReadPerMinute.rates.en).str)
			).toEqual({ time: 1, words: ReadPerMinute.rates.en, rate: ReadPerMinute.rates.en })
		})

		test.each([
			[
				generateTokenizedText(null, 255, 255).str,
				'en',
				{ time: Math.ceil(255 / ReadPerMinute.rates.en), words: 255, rate: ReadPerMinute.rates.en },
			],
			[
				generateTokenizedText(null, ReadPerMinute.rates.en, ReadPerMinute.rates.en).str,
				'en',
				{ time: 1, words: ReadPerMinute.rates.en, rate: ReadPerMinute.rates.en },
			],
			[null, 'en', { time: 0, words: 0, rate: ReadPerMinute.rates.en }],
			[
				generateTokenizedText(null, ReadPerMinute.rates.default, ReadPerMinute.rates.default).str,
				null,
				{ time: 1, words: ReadPerMinute.rates.default, rate: ReadPerMinute.rates.default },
			],
			[
				generateTokenizedText(null, ReadPerMinute.rates.default, ReadPerMinute.rates.default).str,
				'foo',
				{ time: 1, words: ReadPerMinute.rates.default, rate: ReadPerMinute.rates.default },
			],
			[null, null, { time: 0, words: 0, rate: ReadPerMinute.rates.default }],
		])('Parses text using specified values', (text, lang, expected) => {
			const instance = new ReadPerMinute()
			expect(instance.parse(text, lang)).toEqual(expected)
		})

		test.each([
			[
				generateTokenizedText(null, ReadPerMinute.rates.en, ReadPerMinute.rates.en).str,
				'fr',
				{ time: 1, words: ReadPerMinute.rates.en, rate: ReadPerMinute.rates.en },
			],
		])('Parses text regarding lang rate', (text, lang, expected) => {
			const instance = new ReadPerMinute()
			expect(instance.parse(text, lang)).not.toEqual(expected)
		})

		test.each([
			[
				generateTokenizedText(null, 425, 425).str,
				425,
				{ time: 1, words: 425, rate: 425 },
			]
		])('Parses text and uses a custom rate', (text, rate, expected) => {
			const instance = new ReadPerMinute()
			expect(instance.parse(text, rate)).toEqual(expected)
		})
		test.each([
			[
				generateTokenizedText(null, 1, 1).str,
				0
			],
			[
				generateTokenizedText(null, 1, 1).str,
				-1
			],
		])('Throws an error if the custom rate is invalid', (text, customRate) => {
			const instance = new ReadPerMinute()
			expect(() => instance.parse(text, customRate)).toThrowError()
		})
	})
})
