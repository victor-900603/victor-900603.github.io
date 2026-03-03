/**
 * i18n — 多語系切換模組
 * 使用 JSON 設定檔 (i18n/zh-TW.json, i18n/en.json) 來管理翻譯
 */

const SUPPORTED_LANGS = ['zh-TW', 'en'];
const DEFAULT_LANG = 'zh-TW';
const STORAGE_KEY = 'preferred-lang';

let currentLang = DEFAULT_LANG;
let translations = {};

/**
 * 載入指定語系的 JSON 檔
 */
async function loadTranslation(lang) {
    if (translations[lang]) return translations[lang];
    try {
        const res = await fetch(`./i18n/${lang}.json`);
        if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
        translations[lang] = await res.json();
        return translations[lang];
    } catch (err) {
        console.error(`[i18n] Error loading ${lang}:`, err);
        return null;
    }
}

/**
 * 根據 key 取得翻譯值（支援巢狀 key，如 "about.name"）
 */
function t(key) {
    const dict = translations[currentLang];
    if (!dict) return key;
    return dict[key] ?? key;
}

/**
 * 將翻譯套用到所有帶有 data-i18n 的 DOM 元素
 */
function applyTranslations() {
    const dict = translations[currentLang];
    if (!dict) return;

    // data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = dict[key];
        if (val !== undefined && typeof val === 'string') {
            el.textContent = val;
        }
    });

    // data-i18n-placeholder → placeholder 屬性
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = dict[key];
        if (val !== undefined && typeof val === 'string') {
            el.placeholder = val;
        }
    });

    // data-i18n-aria → aria-label 屬性
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        const val = dict[key];
        if (val !== undefined && typeof val === 'string') {
            el.setAttribute('aria-label', val);
        }
    });

    // 更新 html lang 屬性
    const meta = dict['meta'];
    if (meta && meta.lang) {
        document.documentElement.lang = meta.lang;
    }
}

/**
 * 切換語系
 */
async function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
        console.warn(`[i18n] Unsupported language: ${lang}`);
        return;
    }
    const dict = await loadTranslation(lang);
    if (!dict) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();

    // 發送自訂事件，讓其他模組 (如 typing effect) 可以偵聽並更新
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang, dict } }));
}

/**
 * 取得目前語系
 */
function getCurrentLanguage() {
    return currentLang;
}

/**
 * 取得翻譯值陣列（用於 typing effect）
 */
function getTaglines() {
    const dict = translations[currentLang];
    if (!dict) return [];
    return dict['about.taglines'] || [];
}

/**
 * 初始化 i18n
 */
async function initI18n() {
    // 優先使用 localStorage，其次偵測瀏覽器語系
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) {
        currentLang = saved;
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang && browserLang.startsWith('en')) {
            currentLang = 'en';
        } else {
            currentLang = DEFAULT_LANG;
        }
    }

    // 預載兩個語系
    await Promise.all(SUPPORTED_LANGS.map(l => loadTranslation(l)));

    // 首次套用
    applyTranslations();

    // 發送初始化完成事件
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang, dict: translations[currentLang] } }));
}

export { initI18n, setLanguage, getCurrentLanguage, t, getTaglines, SUPPORTED_LANGS };
