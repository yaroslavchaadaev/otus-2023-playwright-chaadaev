import {test, expect} from '@playwright/test'

// test('has locator', async ({page}) => {
//     await page.goto('https://demoqa.com/text-box')
//     await expect(page.getByPlaceholder('Full name')).toHaveClass('/form-control/')
// })

test('Fields have class', async ({ page }) => {
    await page.goto('https://automationintesting.online');
    await expect(page.getByTestId('ContactName')).toHaveClass('form-control')
    await expect(page.getByTestId('ContactEmail')).toHaveClass('form-control')
    await expect(page.getByTestId('ContactPhone')).toHaveClass('form-control')
    await expect(page.getByTestId('ContactSubject')).toHaveClass('form-control')
    await expect(page.getByTestId('ContactDescription')).toHaveClass('form-control')
});

test('Successfully submit', async ({ page }) => {
    await page.goto('https://automationintesting.online');

    await page.getByTestId('ContactName').click();
    await page.getByTestId('ContactName').fill('Jack Nicholson');

    await page.getByTestId('ContactEmail').click();
    await page.getByTestId('ContactEmail').fill('random@gmail.com');

    await page.getByTestId('ContactPhone').click();
    await page.getByTestId('ContactPhone').fill('79111111111');

    const timestamp = Date.now()

    await page.getByTestId('ContactSubject').click();
    await page.getByTestId('ContactSubject').fill(`Random question ${timestamp}`);

    await page.getByTestId('ContactDescription').click();
    await page.getByTestId('ContactDescription').fill('Lorem ipsum dolor sit amet');

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('//*[@class="row contact"]')).toContainText('Thanks for getting in touch')
});

test('Can\'t submit with incorrect email type', async ({ page }) => {
    await page.goto('https://automationintesting.online');

    await page.getByTestId('ContactName').click();
    await page.getByTestId('ContactName').fill('Jack Nicholson');

    await page.getByTestId('ContactEmail').click();
    await page.getByTestId('ContactEmail').fill('None');

    await page.getByTestId('ContactPhone').click();
    await page.getByTestId('ContactPhone').fill('79111111111');

    await page.getByTestId('ContactDescription').click();
    await page.getByTestId('ContactDescription').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula');


    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('//*[@class="alert alert-danger"]')).toContainText('must be a well-formed email address')
});

test('Can\'t submit with too short phone number', async ({ page }) => {
    await page.goto('https://automationintesting.online');

    await page.getByTestId('ContactName').click();
    await page.getByTestId('ContactName').fill('Jack Nicholson');

    await page.getByTestId('ContactEmail').click();
    await page.getByTestId('ContactEmail').fill('random@gmail.com');

    await page.getByTestId('ContactPhone').click();
    await page.getByTestId('ContactPhone').fill('7911111111');

    await page.getByTestId('ContactDescription').click();
    await page.getByTestId('ContactDescription').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula');


    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('//*[@class="alert alert-danger"]')).toContainText('Phone must be between 11 and 21 characters.')
});

test('Can\'t submit with empty Contact Name', async ({ page }) => {
    await page.goto('https://automationintesting.online');

    await page.getByTestId('ContactName').click();
    await page.getByTestId('ContactName').fill('');

    await page.getByTestId('ContactEmail').click();
    await page.getByTestId('ContactEmail').fill('random@gmail.com');

    await page.getByTestId('ContactPhone').click();
    await page.getByTestId('ContactPhone').fill('7911111111');

    await page.getByTestId('ContactDescription').click();
    await page.getByTestId('ContactDescription').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vehicula');


    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('//*[@class="alert alert-danger"]')).toContainText('Name may not be blank')
});
