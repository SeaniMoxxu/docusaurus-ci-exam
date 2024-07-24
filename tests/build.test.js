const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Docusaurus Build', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: 'inherit' });
  });

  it('should generate the build folder', () => {
    const buildDir = path.join(__dirname, '../build');
    expect(fs.existsSync(buildDir)).toBe(true);
  });

  it('should have an index.html file', () => {
    const indexPath = path.join(__dirname, '../build/index.html');
    expect(fs.existsSync(indexPath)).toBe(true);
  });
});

describe('Essential Pages', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('file://' + path.resolve(__dirname, '../build/index.html'));
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load the home page', async () => {
    const title = await page.title();
    expect(title).toBe('Le meilleur docusaurus');
  });

  it('should have a working navigation', async () => {
    await page.click('nav a[href="/docs/intro"]'); // Lien de navigation par défaut
    await page.waitForSelector('.theme-doc-markdown'); // Sélecteur par défaut sur la page de documentation
    const title = await page.$eval('.theme-doc-markdown h1', el => el.textContent);
    expect(title).toBe('Introduction'); // Titre par défaut de la page attendue
  });
});
