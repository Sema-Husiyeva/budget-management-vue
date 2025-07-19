import { createI18n } from "vue-i18n";
import en from "./locales/en/nav.json";
import az from "./locales/az/nav.json";

interface MessageSchema {
  navbar: {
    home: string;
    help: string;
    faq: string;
    blog: string;
    subscription: string;
    login: string;
  };
}

const i18n = createI18n<[MessageSchema], 'en' | 'az'>({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    az
  }
})

export default i18n;