import es from '../data/i18n/es.json';
import en from '../data/i18n/en.json';

const translations = { es, en };
const languageButton = document.querySelector('#languageButton');

let currentLanguage = localStorage.getItem('language') || 'es';

function translatePage(language) {
    const dictionary = translations[language];

    if (!dictionary) return;

    // translate general page content
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const keys = element.dataset.i18n.split('.');
        let value = dictionary;

        for (const key of keys) {
            value = value?.[key];
        }

        if (typeof value !== 'string') return;

        if (element.dataset.i18n === 'about.aboutme') {
            element.innerHTML = value;
        } else {
            element.textContent = value;
        }
    });

    // update CV link
    const cvButton = document.querySelector('[data-cv-es][data-cv-en]');

    if (cvButton) {
        cvButton.href =
            language === 'es'
                ? cvButton.dataset.cvEs
                : cvButton.dataset.cvEn;

        cvButton.download =
            language === 'es'
                ? 'Curriculum Juan Gomez.pdf'
                : 'Juan Gomez resume.pdf';
    }

    // translate project cards
    document.querySelectorAll('.projectCard').forEach((card) => {
        const title = card.querySelector('[data-project-title]');
        const subtitle = card.querySelector('[data-project-subtitle]');
        const laurel = card.querySelector('.laurel');

        const titleKey = language === 'es' ? 'titleEs' : 'titleEn';
        const subtitleKey = language === 'es' ? 'subtitleEs' : 'subtitleEn';
        const laurelKey = language === 'es' ? 'laurelEs' : 'laurelEn';

        if (title) {
            title.textContent = card.dataset[titleKey] || '';
        }

        if (subtitle) {
            subtitle.textContent = card.dataset[subtitleKey] || '';
        }

        if (laurel) {
            const image = laurel.dataset[
                language === 'es' ? 'laurelEs' : 'laurelEn'
            ];

            laurel.style.display = image ? '' : 'none';

            if (image) {
                laurel.src = image;
            }
        }
    });

    // update page language
    document.documentElement.lang = language;
    localStorage.setItem('language', language);
    currentLanguage = language;

    languageButton?.setAttribute(
        'aria-label',
        language === 'es' ? 'Switch to English' : 'Cambiar a español'
    );
}

languageButton?.addEventListener('click', (event) => {
    event.preventDefault();

    const nextLanguage = currentLanguage === 'es' ? 'en' : 'es';
    translatePage(nextLanguage);
});

translatePage(currentLanguage);