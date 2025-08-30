import { describe, expect, test } from 'vitest'

import { parse, isLangExist, rates } from '../index'

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

describe('ReadPerMinute (functions)', () => {
	describe('custom rates', () => {
		const customRates = {
			default: 2000,
			ar: 1810,
			zh: 2600,
			nl: 2280,
			en: 2360,
			fi: 1950,
			fr: 2140,
			de: 2600,
			he: 2240,
			it: 2850,
			ko: 2260,
			es: 2780,
			sv: 2180,
		}
		test.each([
			[{}, rates.default],
			[[], rates.default],
			['', rates.default],
			[null, rates.default],
			[{ default: 300 }, 300],
		])('Parses text using default values', (customRates, expected) => {
			expect(parse(undefined, undefined, customRates)).toEqual({ time: 0, words: 0, rate: expected })
		})

		test.each([
			[customRates, null, customRates.default],
			[customRates, 'en', customRates.en],
		])('Parses text using custom values', (customRates, lang, expected) => {
			expect(parse('', lang, customRates)).toEqual({ time: 0, words: 0, rate: expected })
		})
	})

	describe('isLangExist', () => {
		test('Returns false as lang is not specified', () => {
			expect(isLangExist()).toBeFalsy()
		})

		test.each([
			[null, false],
			['Foo', false],
			[42, false],
			[() => null, false],
			[[], false],
			[{}, false],
			[Object.keys(rates)[1], true],
			['de', true],
		])('Returns lang existence', (value, expected) => {
			expect(isLangExist(value)).toBe(expected)
		})
	})

	describe('parse', () => {
		test('Parses text using default values', () => {
			expect(parse()).toEqual({ time: 0, words: 0, rate: rates.default })
			expect(
				parse(
					generateTokenizedText(null, rates.default, rates.default).str
				)
			).toEqual({ time: 1, words: rates.default, rate: rates.default })
		})

		test.each([
			[
				generateTokenizedText(null, 255, 255).str,
				'en',
				{ time: Math.ceil(255 / rates.en), words: 255, rate: rates.en },
			],
			[
				generateTokenizedText(null, rates.fr, rates.fr).str,
				'fr',
				{ time: 1, words: rates.fr, rate: rates.fr },
			],
			[null, 'en', { time: 0, words: 0, rate: rates.en }],
			[
				generateTokenizedText(null, rates.default, rates.default).str,
				null,
				{ time: 1, words: rates.default, rate: rates.default },
			],
			[
				generateTokenizedText(null, rates.default, rates.default).str,
				'foo',
				{ time: 1, words: rates.default, rate: rates.default },
			],
			[null, null, { time: 0, words: 0, rate: rates.default }],
		])('Parses text using specified values', (text, lang, expected) => {
			expect(parse(text, lang)).toEqual(expected)
		})

		test.each([
			[
				generateTokenizedText(null, rates.en, rates.en).str,
				'fr',
				{ time: 1, words: rates.en, rate: rates.en },
			],
		])('Parses text regarding lang rate', (text, lang, expected) => {
			expect(parse(text, lang)).not.toEqual(expected)
		})

		test.each([[generateTokenizedText(null, 425, 425).str, 425, { time: 1, words: 425, rate: 425 }]])(
			'Parses text and uses a custom rate',
			(text, rate, expected) => {
				expect(parse(text, rate)).toEqual(expected)
			}
		)
		test.each([
			[generateTokenizedText(null, 1, 1).str, 0],
			[generateTokenizedText(null, 1, 1).str, -1],
		])('Exchanges invalid numeric values with the default rate', (text, customRate) => {
			const result = parse(text, customRate)
			expect(result.rate).to.equal(rates.default)
		})
	})
})
