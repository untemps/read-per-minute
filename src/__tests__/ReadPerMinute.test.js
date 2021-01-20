import ReadingTimer from '../ReadPerMinute'

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
		it('Instantiates class with no error', () => {
			expect(() => new ReadingTimer()).not.toThrow()
		})
	})

	describe('isLangExist', () => {
		it('Returns false as lang is not specified', () => {
			expect(ReadingTimer.isLangExist()).toBeFalsy()
		})

		it.each([
			[null, false],
			['Foo', false],
			[42, false],
			[() => null, false],
			[[], false],
			[{}, false],
			[Object.keys(ReadingTimer.rates)[1], true],
			['de', true],
		])('Returns lang existence', (value, expected) => {
			expect(ReadingTimer.isLangExist(value)).toBe(expected)
		})
	})

	describe('parse', () => {
		it('Parses text using default values', () => {
			const instance = new ReadingTimer()
			expect(instance.parse()).toEqual({ time: 1, words: 1, rate: ReadingTimer.rates.en })
			expect(
				instance.parse(generateTokenizedText(null, ReadingTimer.rates.en, ReadingTimer.rates.en).str),
			).toEqual({ time: 1, words: ReadingTimer.rates.en, rate: ReadingTimer.rates.en })
		})

		it.each([
			[
				generateTokenizedText(null, 255, 255).str,
				'en',
				{ time: Math.ceil(255 / ReadingTimer.rates.en), words: 255, rate: ReadingTimer.rates.en },
			],
			[
				generateTokenizedText(null, ReadingTimer.rates.en, ReadingTimer.rates.en).str,
				'en',
				{ time: 1, words: ReadingTimer.rates.en, rate: ReadingTimer.rates.en },
			],
			[null, 'en', { time: 1, words: 1, rate: ReadingTimer.rates.en }],
			[
				generateTokenizedText(null, ReadingTimer.rates.default, ReadingTimer.rates.default).str,
				null,
				{ time: 1, words: ReadingTimer.rates.default, rate: ReadingTimer.rates.default },
			],
			[
				generateTokenizedText(null, ReadingTimer.rates.default, ReadingTimer.rates.default).str,
				'foo',
				{ time: 1, words: ReadingTimer.rates.default, rate: ReadingTimer.rates.default },
			],
			[null, null, { time: 1, words: 1, rate: ReadingTimer.rates.default }],
		])('Parses text using specified values', (text, lang, expected) => {
			const instance = new ReadingTimer()
			expect(instance.parse(text, lang)).toEqual(expected)
		})

		it.each([
			[
				generateTokenizedText(null, ReadingTimer.rates.en, ReadingTimer.rates.en).str,
				'fr',
				{ time: 1, words: ReadingTimer.rates.en, rate: ReadingTimer.rates.en },
			],
		])('Parses text regarding lang rate', (text, lang, expected) => {
			const instance = new ReadingTimer()
			expect(instance.parse(text, lang)).not.toEqual(expected)
		})
	})
})
