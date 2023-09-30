const {test, expect} = require('@playwright/test');
const MainPage = require('../pages/main-page');
const ArticlePage = require('../pages/article-page');
const LoginPage = require('../pages/login-page');
const PagesSettingFragment = require('../pages/fragments/pages-settings-fragment')


test('Changing language by page settings menu', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.header.openPageSettingsMenu();

    const pageSettingsFragments = new PagesSettingFragment(page);

    await pageSettingsFragments.changeLangToEng();

    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/en/);
})

test('Guest goes to Career page from articles', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();

    await mainPage.header.openUserMenu();

    const careerPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Карьера Профессиональное развитие в IT' }).click();
    const careerPage = await careerPagePromise;

    await page.waitForLoadState("networkidle");
    await expect(careerPage).toHaveURL('https://career.habr.com');
})

test('Guest is searching a topic', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();
    await mainPage.header.searchBarFilling('Quality Assurance')
    await expect(page).toHaveURL(/q=Quality%20Assurance/)
})

test('Guest goes to Q&A page from articles', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();

    await mainPage.header.openUserMenu();

    const careerPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Q&A Ответы на любые вопросы об IT' }).click();
    const careerPage = await careerPagePromise;

    await page.waitForLoadState("networkidle");
    await expect(careerPage).toHaveURL('https://qna.habr.com');
})

test('Guest goes to donation help article', async ({page}) => {
    const mainPage = new MainPage(page);
    await mainPage.open();

    await page.goto('https://habr.com/ru/docs/help/rules/');
    await page.getByRole('link', { name: 'Донаты' }).click();

    await expect(page).toHaveURL(/donations/)
})

