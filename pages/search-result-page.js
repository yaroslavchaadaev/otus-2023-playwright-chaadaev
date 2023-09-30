class SearchResultPage {

    constructor(page) {
        this.page = page;
        this._articlesList = page.locator('[class=tm-articles-list]')

    }

    async seeResultArticles() {
        await this._articlesList.waitFor({state: "visible"})
    }

}

module.exports = SearchResultPage;
