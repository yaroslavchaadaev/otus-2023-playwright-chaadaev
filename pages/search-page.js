const SearchResultPage = require("./search-result-page");

class SearchPage {

    constructor(page) {
        this.page = page;
        this._searchInput = page.locator('input[name=q]');
        this._startSearchBtn = page.locator('[class*=tm-search__icon]');

    }

    async open() {
        await this.page.goto('/search')
    }

    async searchArticle(query) {
        await this._searchInput.fill(query);
        await this._startSearchBtn.click();
        return new SearchResultPage(this.page);
    }

}

module.exports = SearchPage
