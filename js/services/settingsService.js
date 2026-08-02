/*
====================================================
SETTINGS SERVICE
====================================================
*/

const SettingsService = {

    get(){

        return Storage.getSettings();

    },

    save(settings){

        Storage.saveSettings(settings);

    },

    getCurrency(){

        const settings = this.get();

        return settings.currency || "₹";

    },

    setCurrency(currency){

        const settings = this.get();

        settings.currency = currency;

        this.save(settings);

    },

    getTheme(){

        const settings = this.get();

        return settings.theme || "light";

    },

    setTheme(theme){

        const settings = this.get();

        settings.theme = theme;

        this.save(settings);

    }

};