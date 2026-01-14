import { text } from "stream/consumers";

export const profile = {
  hero: {
    title: '',

    quote: {
      text: '',
      author: ''
    }
  }
};

export type ProfileLocale = typeof profile;