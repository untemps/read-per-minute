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

export default class ReadPerMinute {
  static readonly rates: Rates;

  constructor(rates?: Partial<Rates> | null);

  /** Returns whether the specified lang is indexed in the rate list. */
  isLangExist(lang?: string): boolean;

  /**
   * Parses a string, counts the number of words and divides it by the lang rate
   * to get an estimated reading time.
   */
  parse(
    text?: string | null,
    langOrRate?: string | number | null
  ): { time: number; words: number; rate: number };
}

