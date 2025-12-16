const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Login Test without XPath', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options())
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('should login successfully', async () => {
    // 1. Перейти на страницу логина (замените на ваш URL)////////////////////////////////////////////////ИСПРАВИТТЬЬЬЬ
    await driver.get('https://your-app.com/login');

    // 2. Найти элементы БЕЗ XPath
    // Используем CSS селекторы, ID, классы, data-атрибуты
    
    // Пример: поиск по ID
    const usernameInput = await driver.findElement(By.id('username'));
    const passwordInput = await driver.findElement(By.id('password'));
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));

    // 3. Ввести данные
    await usernameInput.sendKeys('testuser');
    await passwordInput.sendKeys('testpass123');

    // 4. Нажать кнопку входа
    await loginButton.click();

    // 5. Проверить успешный вход (например, по наличию элемента dashboard)
    await driver.wait(
      until.elementLocated(By.css('.dashboard')),
      5000
    );

    const dashboard = await driver.findElement(By.css('.dashboard'));
    expect(await dashboard.isDisplayed()).toBeTruthy();
  });
});