import 'https://freshpaint-cdn.com/consent/freshpaint-consent-helper.umd.js';
window.freshpaintConsent = CookieConsent;

function loadCSS(url) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

loadCSS("https://freshpaint-cdn.com/consent/consent.css");
document.documentElement.classList.add('cc--darkmode');


const onConsentChange = ({cookie}) => {
    const result = {"All": false};

    for (const services of Object.values(cookie.services)) {
        for (const service of Object.values(services)) {
            result[service] = true;
        }
    }

    window.freshpaint.ready(() => {
        window.freshpaint.set_consent(result);
    })
};

const defaultConfig = {
    // This is a Freshpaint specific field that can be used to add custom CSS to the consent manager
    // through the config. 
    customCSS: "",
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            services: {
                "Mixpanel": {
                    label: "Mixpanel"
                },
                "Amplitude": {
                    label: "Amplitude"
                }
            }
        },
        advertising: {
            services: {
                "Facebook Pixel": {
                    label: "Facebook Pixel"
                },
                "Google Ads": {
                    label: "Google Ads",
                },
            }
        }
    },

    language: {
        default: 'en',
        autoDetect: 'browser',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'Cookie modal description',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage consent preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: "Advertising",
                            description: "We use advertising tools to deliver relevant ads, measure the effectiveness of advertising campaigns, and improve our marketing effort",
                            linkedCategory: "advertising",
                        }, 
                        {
                            title: 'Analytics',
                            description: 'We use analytics tools for the purpose of measuring site performance, understanding user interactions, and improving our services',
    
                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'analytics'
                        }, 
                    ]
                },
            },
            fr:  {
                consentModal: {
                title: 'French: we use cookies',
                description: 'Cookie modal description',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Manage Individual preferences'
            },
            preferencesModal: {
                title: 'Preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Accept current selection',
                closeIconLabel: 'Close modal',
                sections: [
                    {
                        title: "Advertising",
                        description: "We use advertising tools to deliver relevant ads, measure the effectiveness of advertising campaigns, and improve our marketing effort",
                        linkedCategory: "advertising",
                    },
                    {
                        title: 'Analytics',
                        description: 'We use analytics tools for the purpose of measuring site performance, understanding user interactions, and improving our services',

                        //this field will generate a toggle linked to the 'necessary' category
                        linkedCategory: 'analytics'
                    }, 
                ]
            },
        }
    }
    }
};

const config = window.CUSTOM_FRESHPAINT_CONSENT_CONFIG || defaultConfig;

const style = document.createElement('style');
style.textContent = config.customCss;
document.head.appendChild(style);

CookieConsent.run({
    onConsent: onConsentChange,
    onChange: onConsentChange,
    ...(config)

});