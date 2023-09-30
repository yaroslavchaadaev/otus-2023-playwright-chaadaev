const Header = require("./fragments/header");

class BasePage {
    constructor(page) {
        this.page = page;
        this.header = new Header(page);
    }

    async changeLangCookie(lang) {
        return null

    }
}
module .exports = BasePage;
