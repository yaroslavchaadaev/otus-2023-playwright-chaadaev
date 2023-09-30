const SearchPage = require("../search-page");
const LoginPage = require("../login-page");

class Header {
    constructor(page) {
        this.page = page;
        this.root = page.locator('[class*=tm-base-layout__header_is-sticky]')
        this._searchBtn = page.locator('[class*=tm-header-user-menu__search]');
        this._userMenu = page.locator('[class*=tm-dropdown__head]').first();
        this._inputField = page.locator('input[name=q]');
        this._searchIcon = page.locator('[class*=tm-search__icon]');
        this._pageSettingsBtn = page.locator('[data-test-id="menu-toggle-guest"]');
        this._articlesList = page.locator('[class=tm-articles-list]');
        this._pageLangSettings = page.locator('[class*=tm-user-menu__menu-link-text]')
        this._loginBtninMenu = page.locator('[class*=tm-user-menu__auth-button]').nth(1)
    }

    async clickSearchBtn() {
        await this._searchBtn.click();
        return new SearchPage(this.page);
    }

    async searchBarFilling(payload) {
        await this.clickSearchBtn()
        await this._inputField.fill(payload);
        await this._searchIcon.click();
        await this._articlesList.waitFor({state: "visible"});
    }

    async openPageSettingsMenu() {
        await this._pageSettingsBtn.click();
        await this._pageLangSettings.click();
    }

    async openUserMenu(){
        await this._userMenu.click();
    }
    async clickLoginBtn() {
        await this._userMenu.click();
        await this._loginBtninMenu.click();
        return new LoginPage(this.page);
    };
}

module.exports = Header;
