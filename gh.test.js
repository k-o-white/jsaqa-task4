let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const actual = await page.title();
    const expected =
      "GitHub · Change is constant. GitHub keeps you ahead. · GitHub";
    expect(actual).toContain(expected);
  }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    const expected = "#start-of-content";
    expect(actual).toEqual(expected);
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "a[href*='free']";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    const expected = "Sign up for free";
    expect(actual).toContain(expected);
  }, 5000);
});

test("GitHub Copilot page title contains expected text", async () => {
  await page.goto("https://github.com/features/copilot");
  const actual = await page.title();
  const expected = "GitHub Copilot · Your AI coding agent · GitHub";
  expect(actual).toContain(expected);
}, 5000);

test("GitHub Articles page contains expected text", async () => {
  await page.goto("https://github.com/resources/articles");
  await page.waitForSelector("h1");
  const h1Element = await page.$("h1");
  const actual = await h1Element.evaluate(el => el.textContent.trim());
  const expected = "GitHub Articles";
  expect(actual).toEqual(expected);
}, 5000);

test("The page contains Contact Sales button", async () => {
  await page.goto("https://github.com/solutions/use-case/ci-cd");
  const btnSelector = "a[href*='sales']";
  await page.waitForSelector(btnSelector, {
    visible: true,
  });
  const actual = await page.$eval(btnSelector, (link) => link.textContent);
  const expected = "Contact sales";
  expect(actual).toContain(expected);
}, 5000);
