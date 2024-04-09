/**
 * Rates from "How many words do we read per minute? A review and meta-analysis of reading rate" by Marc Brysbaert - Department of Experimental Psychology Ghent University
 */
class ReadPerMinute {
	static rates = Object.freeze({
		default: 200,
		ar: 181,
		zh: 260,
		nl: 228,
		en: 236,
		fi: 195,
		fr: 214,
		de: 260,
		he: 224,
		it: 285,
		ko: 226,
		es: 278,
		sv: 218,
	})

	_rates = null

	constructor(rates = null) {
		this._rates = rates ?? ReadPerMinute.rates
	}

	/**
	 * Returns whether the specified lang is indexed in the rate list.
	 * @param lang  {string}    Lang to test
	 * @returns {boolean}       True if the lang is indexed, false if not
	 */
	isLangExist(lang) {
		return !!lang && !!this._rates[lang]
	}

	/**
	 * Parses a string, counts the number the words and divides it by the lang rate to get an estimated reading time.
	 * The function returns an object containing the estimated time, the number of words and the rate used in the calculation.
	 * @param text  {string}                                    String to parse.
	 * @param langOrRate  {string | number}                     Lang used to retrieve the reading rate, or a custom rate value.
	 * @returns {{rate: number, words: number, time: number}}   Object containing the estimated time, the number of words and the rate used in the calculation.
	 */
	parse(text = '', langOrRate = 'default') {
		let rate = this._rates['default'] ?? ReadPerMinute.rates['default'];
		if (+langOrRate > 0) {
			rate = langOrRate
		} else if (this.isLangExist(langOrRate)) {
			rate = this._rates[langOrRate]
		}

		if (!text?.length) {
			return {
				time: 0,
				words: 0,
				rate,
			}
		}

		const words = text.trim().split(/\s+/).length
		return {
			time: Math.ceil(words / rate),
			words,
			rate,
		}
	}
}

export default ReadPerMinute
