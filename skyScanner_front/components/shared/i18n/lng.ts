const lngs:Lngs  = {
    ru: { nativeName: 'Русский' },
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
}

export interface Lngs {
    ru: { nativeName: 'Русский' },
    en:{ nativeName: 'English'},
    de: { nativeName: 'Deutsch' }
}

export type LngsKeys = keyof Lngs;
export default lngs