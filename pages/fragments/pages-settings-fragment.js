class PagesSettingsFragment {

    constructor(page) {
        this.page = page;
        // this.root = page.locator('[class=tm-popup-base__body]');
        this.engRadioBtn = page.getByText('English');
        this.submitSettingBtn = page.locator('[class*=tm-page-settings-form__submit]');

    }

    async changeLangToEng() {
        await this.engRadioBtn.click();
        await this.submitSettingBtn.click();
    }

}
module.exports = PagesSettingsFragment
