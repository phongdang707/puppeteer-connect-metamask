const puppeteer = require("puppeteer");
const delay = require("delay");

(async () => {
  const pathToExtension = require("path").join(__dirname, "10.4.1_0");
  const customArgs = [
    `--start-maximized`,
    `--load-extension=${pathToExtension}`,
  ];
  const browser = await puppeteer.launch({
    defaultViewport: null,
    executablePath: process.env.chrome,
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    args: customArgs,
    // product: "chrome",
  });

  const page = await browser.newPage();

  await page.goto(
    "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/select-action",
    {
      waitUntil: "networkidle2",
    }
  );
  await page.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > div.select-action__wrapper > div > div.select-action__select-buttons > div:nth-child(1) > button"
      )[0]
      .click();
  });
  await page.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > div > div.metametrics-opt-in__footer > div.page-container__footer > footer > button.button.btn--rounded.btn-primary.page-container__footer-button"
      )[0]
      .click();
  });

  await page.waitForSelector(
    "#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div > input"
  );
  const tk =
    "viable submit essence flash now cover dolphin hub genre winner gate retreat";
  const p = "asdasdasd";
  await page.type(
    "#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__textarea-wrapper > div.MuiFormControl-root.MuiTextField-root.first-time-flow__textarea.first-time-flow__seedphrase > div > input",
    `${tk}`
  );
  await page.type("#password", `${p}`);
  await page.type("#confirm-password", `${p}`);

  await page.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > form > div.first-time-flow__checkbox-container > div"
      )[0]
      .click();
  });
  await page.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > form > button"
      )[0]
      .click();
  });

  const allPages = await browser.pages();

  // await allPages[1].close();
  // await allPages[2].close();

  const pageLoginMetaMask = await browser.newPage();

  await pageLoginMetaMask.goto(
    "chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/unlock",
    {
      waitUntil: "networkidle2",
    }
  );
  await pageLoginMetaMask.type("#password", `${p}`);
  await pageLoginMetaMask.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > div > button"
      )[0]
      .click();
  });

  await pageLoginMetaMask.waitForSelector(".button.btn--rounded.btn-primary");
  await pageLoginMetaMask.evaluate(() => {
    document.querySelectorAll(".button.btn--rounded.btn-primary")[0].click();
  });
  await pageLoginMetaMask.evaluate(() => {
    document
      .querySelectorAll(
        "#app-content > div > div.main-container-wrapper > div > div > div.reveal-seed-phrase > div.reveal-seed-phrase__buttons > button.button.btn--rounded.btn-secondary.first-time-flow__button"
      )[0]
      .click();
  });

  const openSea = await browser.newPage();
  await openSea.goto("https://opensea.io/login?referrer=%2Fasset%2Fcreate");
  await openSea.evaluate(() => {
    const allDoc = document.querySelectorAll(
      "#__next > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.FlexColumnreact__FlexColumn-sc-1wwz3hp-0.OpenSeaPagereact__DivContainer-sc-65pnmt-0.dBFmez.jYqxGr.ksFzlZ.fiudwD > main > div > div > div > div.Blockreact__Block-sc-1xf18x6-0.eOSaGo > ul > li:nth-child(1) > button > div.Blockreact__Block-sc-1xf18x6-0.Flexreact__Flex-sc-1twd32i-0.FlexColumnreact__FlexColumn-sc-1wwz3hp-0.VerticalAlignedreact__VerticalAligned-sc-b4hiel-0.Itemreact__ItemContent-sc-1idymv7-1.dBFmez.jYqxGr.ksFzlZ.iXcsEj.hTefVc > span"
    );
    allDoc.forEach((each) => {
      if (each.textContent === "MetaMask") {
        each.click();
      }
    });
  });

  const newPagePromise = new Promise((x) =>
    browser.once("targetcreated", (target) => x(target.page()))
  );
  const popup = await newPagePromise;
  const url = popup.url();
  await popup.close();

  const metaMaskConnectOpenSeaPage = await browser.newPage();

  await metaMaskConnectOpenSeaPage.goto(url, {
    waitUntil: "networkidle2",
  });

  await metaMaskConnectOpenSeaPage.waitForSelector(
    "button.btn--rounded.btn-primary"
  );

  await metaMaskConnectOpenSeaPage.evaluate(() => {
    document.querySelectorAll(".button.btn--rounded.btn-primary")[0].click();
  });
  await metaMaskConnectOpenSeaPage.evaluate(() => {
    document
      .querySelectorAll(
        "button.button.btn--rounded.btn-primary.page-container__footer-button"
      )[0]
      .click();
  });

  const browser2 = await puppeteer.launch({
    defaultViewport: null,
    executablePath: process.env.chrome,
    headless: false,
    ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
    args: customArgs,
    // product: "chrome",
  });

  const openSea2 = await browser2.newPage();
  await openSea2.evaluate(() => {
    document.querySelectorAll(".button.btn--rounded.btn-primary")[0].click();
  });
})();
