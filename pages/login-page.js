class LoginPage {
    constructor(page) {
        this.page = page;
        this._inputEmail = page.locator('[type=email]');
        this._inputPassword = page.locator('[type=password]');
        this._loginBtn = page.locator('[name=go]');
    }

    async fillLoginForm(login, password) {
        await this._inputEmail.fill(login);
        await this._inputPassword.fill(password);
    };

    async clickLoginBtn() {
        await this._loginBtn.click();
    };

}

module.exports = LoginPage;
