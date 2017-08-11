const Plugin = module.parent.require('../Structures/Plugin');
const nspell = require('nspell');
const { webFrame } = require('electron');

class SpellChecker extends Plugin {
    constructor(...args) {
        super(...args);

        require('dictionary-' + this.config.language.toLowerCase())((err, dict) => {
            if (err) {
                throw err;
            }

            const sc = nspell(dict);
            webFrame.setSpellCheckProvider(this.config.language, true, { spellCheck: sc.correct.bind(sc) });
        });

    }

    unload() {
        webFrame.setSpellCheckProvider(this.config.language, true, { spellCheck: () => true });
    }

    get configTemplate() {
        return {
            language: 'en-US',
        };
    }
}

module.exports = SpellChecker;
