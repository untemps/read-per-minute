export type Rates = Readonly<
  {
    default: number;
    ar: number;
    zh: number;
    nl: number;
    en: number;
    fi: number;
    fr: number;
    de: number;
    he: number;
    it: number;
    ko: number;
    es: number;
    sv: number;
  } & Record<string, number>
>;

export const rates: Rates;

/** Returns whether the specified lang is indexed in the rate list. */
export function isLangExist(
  lang?: string | null,
  customRates?: Partial<Rates> | null
): boolean;

/**
 * Parses a string, counts the number of words and divides it by the lang rate
 * to get an estimated reading time.
 */
export function parse(
  text?: string | null,
  langOrRate?: string | number | null,
  customRates?: Partial<Rates> | null
): { time: number; words: number; rate: number };
