const BasePage = require("./base-page");

class ArticlePage extends BasePage{

    constructor(page) {
        super(page);

        this.page = page;
        this._articleText = page.locator('[class*=article-formatted-body]')

    }

    async seeArticleText() {
        await this._articleText.waitFor({state: "visible"})
    }
}

module.exports = ArticlePage;
