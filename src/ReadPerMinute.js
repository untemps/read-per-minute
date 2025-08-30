/**
 * Rates from "How many words do we read per minute? A review and meta-analysis of reading rate" by Marc Brysbaert - Department of Experimental Psychology Ghent University
 */
export const rates = Object.freeze({
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

const mergeRates = (customRates) => {
  if (customRates && typeof customRates === 'object' && !Array.isArray(customRates)) {
    return { ...rates, ...customRates }
  }
  return rates
}

/**
 * Returns whether the specified lang is indexed in the rate list.
 * @param {string} lang Lang to test
 * @param {object|null} customRates Optional custom rates to check in
 * @returns {boolean} True if the lang is indexed, false if not
 */
export const isLangExist = (lang, customRates = null) => {
  const r = mergeRates(customRates)
  return !!lang && !!r[lang]
}

/**
 * Parses a string, counts the number the words and divides it by the lang rate to get an estimated reading time.
 * The function returns an object containing the estimated time, the number of words and the rate used in the calculation.
 * @param {string} text String to parse.
 * @param {string|number} langOrRate Lang used to retrieve the reading rate, or a custom rate value.
 * @param {object|null} customRates Optional custom rates overriding defaults.
 * @returns {{rate: number, words: number, time: number}} Object containing the estimated time, the number of words and the rate used in the calculation.
 */
export const parse = (text = '', langOrRate = 'default', customRates = null) => {
  const r = mergeRates(customRates)

  let rate = r['default'] ?? rates['default']
  if (+langOrRate > 0) {
    rate = +langOrRate
  } else if (isLangExist(langOrRate, r)) {
    rate = r[langOrRate]
  }

  if (!text?.length) {
    return { time: 0, words: 0, rate }
  }

  const words = text.trim().split(/\s+/).length
  return { time: Math.ceil(words / rate), words, rate }
}
