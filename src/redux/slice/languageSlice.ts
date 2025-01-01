import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../../utils/cookies";

export type TLanguage = {
  language: string;
  locale: string;
  lcid: string;
};

type TCountryInfo = {
  nativeName: string;
};

type TLanguageInfo = {
  languageName: string;
  locales: {
    [key: string]: TCountryInfo;
  };
};

type TLang = {
  [langCode: string]: TLanguageInfo;
};

export const supportedLang: TLang = {
  nl: {
    languageName: "Nederlands",
    locales: {
      BE: { nativeName: "Nederlands" },
    },
  },
  en: {
    languageName: "English",
    locales: {
      GB: { nativeName: "English" },
    },
  },
  fr: {
    languageName: "Français",
    locales: {
      FR: { nativeName: "Français" },
    },
  },
  de: {
    languageName: "Deutsch",
    locales: {
      DE: { nativeName: "Deutsch" },
    },
  },
  es: {
    languageName: "Español",
    locales: {
      ES: { nativeName: "Español" },
    },
  },
};

const isLanguageSupported = (lng: string) => {
  const normalizedLang = lng.slice(0, 2);
  return !!supportedLang[normalizedLang];
};

const lng =
  getCookie("lng") || window.navigator.languages[0] || navigator.language;

let initialState: TLanguage = {
  language: "en",
  locale: "GB",
  lcid: "en-GB",
};
if (isLanguageSupported(lng)) {
  initialState = {
    language: lng.slice(0, 2),
    locale: lng.slice(3, 5),
    lcid: lng,
  };
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (_state, action) => {
      setCookie("lng", action.payload, 2629743, true, "SameSite=Strict");
      document.documentElement.lang = action.payload;
      return {
        language: action.payload.slice(0, 2),
        locale: action.payload.slice(3, 5) || "",
        lcid: action.payload,
      };
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
