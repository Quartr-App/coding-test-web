import { test, expect } from "@playwright/test";
import { COMPANIES } from "@/app/lib/mock";
import { listOfCompanies } from "@/app/lib/helpers";
import { navigateTo, clickLink } from "./testHelpers";

const firstCompany = COMPANIES[0];
const lastCompany = COMPANIES[COMPANIES.length - 1];

/**
 * Testing - Homepage (app/page.tsx)
 * Checks if we show the right number of companies and if everything looks good
 *
 */
test.describe("Homepage", () => {
  test("should find the banner, display the correct company count in banner", async ({
    page,
  }) => {
    await navigateTo(page, "/");

    await expect(page.getByText("Companies listed")).toBeVisible();

    const totalCompanies = listOfCompanies(COMPANIES).toString();

    await expect(page.locator(".stat-number").first()).toHaveText(
      totalCompanies
    );
  });
});
/**
 * Testing - Companies List page (app/companies/page.tsx)
 * Makes sure users can browse companies and click through to see more details
 *
 */
test.describe("Companies", () => {
  test("should navigate to companies page when clicking Browse Companies button", async ({
    page,
  }) => {
    await navigateTo(page, "/");

    await clickLink(page, "Browse Companies");

    await expect(page).toHaveURL("/companies");

    await expect(page).toHaveTitle("Companies - list");
  });

  test("should display first company name correctly", async ({ page }) => {
    await navigateTo(page, "/companies");

    await expect(page.getByTestId("company-name").first()).toHaveText(
      firstCompany.displayName
    );
  });

  test("should display last company names correctly", async ({ page }) => {
    await navigateTo(page, "/companies");

    await expect(page.getByTestId("company-name").last()).toHaveText(
      lastCompany.displayName
    );
  });

  test("should not show back button on companies list page", async ({
    page,
  }) => {
    await navigateTo(page, "/companies");

    await expect(page.getByText("← Back to Companies")).not.toBeVisible();
  });

  test("should navigate to company detail page when clicking Show Detail", async ({
    page,
  }) => {
    await navigateTo(page, "/companies");

    const detailButton = page
      .getByRole("link", { name: /show detail/i })
      .first();
    await detailButton.click();

    await expect(page).toHaveURL("/companies/1");
  });
});
/**
 * Testing - Company Detail page (app/companies/[id]/page.tsx)
 * Makes sure we show all company info correctly and handling missing company
 *
 */
test.describe("Company Detail Page", () => {
  test("should show company name on company detail page", async ({ page }) => {
    await navigateTo(page, `/companies/${firstCompany.companyId}`);

    await expect(page).toHaveTitle(
      `${firstCompany.companyName} | Company Profile`
    );

    await expect(
      page.getByRole("heading", { name: firstCompany.displayName })
    ).toBeVisible();

    await expect(page.getByText(firstCompany.description)).toBeVisible();
  });

  test("should show back button on company detail page", async ({ page }) => {
    await navigateTo(page, "/companies/1");

    await expect(page.getByText("← Back to Companies")).toBeVisible();
  });

  test("should show 'not-found' page if company not existed", async ({
    page,
  }) => {
    const notExistedCompany = COMPANIES.length + 1;

    await navigateTo(page, `/companies/${notExistedCompany}`);

    await expect(page).toHaveTitle("Company Not Found");

    await expect(
      page.getByRole("heading", { name: "Not Found" })
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "Go Back" })).toBeVisible();
  });
});
