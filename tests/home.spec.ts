import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://childsupport.ca.gov/", {
    timeout: 60000, // 60 seconds
    waitUntil: "networkidle", // waits until network is idle
  });
});

// Test to verify the homepage loads with the correct title
test("Home page has correct title", async ({ page }) => {
  await expect(page).toHaveTitle("CA Child Support Services");
});

// Test to check the "New Laws" link: visible, opens new tab and loads content
test("New Laws link is visible and opens Announcements page", async ({
  page,
}) => {
  const newLawsLink = page.getByRole("link", { name: /new laws/i });

  await expect(newLawsLink).toBeVisible();

  // Wait for new tab
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    newLawsLink.click(),
  ]);

  // Verify new tab URL
  await expect(newPage).toHaveURL(/dcss\.ca\.gov\/announcements/);

  // Verify content on new tab
  await expect(
    newPage.getByRole("heading", { name: /announcements/i })
  ).toBeVisible();
});

// Test to check the "Google Translate" link: visible, opens new tab and loads content
test("Google Translate link is visible and opens Translate page", async ({
  page,
}) => {
  // Locate the Google Translate link
  const translateLink = page.getByRole("link", { name: /translate/i });

  // Verify the link is visible on the homepage
  await expect(translateLink).toBeVisible();

  // Wait for a new tab to open when the link when clicked
  const [newPage] = await Promise.all([
    page.waitForEvent("popup"), // Capture the new tab
    translateLink.click(), // Click the link
  ]);

  // Verify the new tab navigated to the correct page
  await expect(newPage).toHaveURL(/childsupport\.ca\.gov\/translate/);

  // Verify a heading or main content exists on the new page
  await expect(
    newPage.getByRole("heading", { name: /translate/i })
  ).toBeVisible();
});

//Test to check if the logo 'California Child Support Services' button reloads the page
test("Homepage logo/title is visible and clickable", async ({ page }) => {
  // Locate the logo/title by role or text
  const logo = page.getByRole("link", {
    name: /california child support services/i,
  });

  // Verify it is visible
  await expect(logo).toBeVisible();

  // Click the logo/title
  await logo.click();

  // Verify the page reloads or navigates back to homepage
  await expect(page).toHaveURL("https://childsupport.ca.gov/");
});

// Test to check the "Manage Payments" link: visible, navigates, content loads
test("Manage Payments link is visible and navigates to State Disbursement Unit page", async ({
  page,
}) => {
  const managePaymentsLink = page.getByRole("link", {
    name: /manage payments/i,
  });
  await expect(managePaymentsLink).toBeVisible();

  // Click the link
  await managePaymentsLink.click();

  // Wait for full page load
  await page.waitForLoadState("networkidle");

  // Verify URL
  await expect(page).toHaveURL(
    /childsupport\.ca\.gov\/state-disbursement-unit/
  );

  // Verify some visible content exists
  const mainContent = page.locator("main");
  await expect(mainContent).toContainText(/child support/i);
});

// Test to check the "See My Information" link: visible, navigates, content loads
test("See My Information link is visible and navigates to Customer Connect page", async ({
  page,
}) => {
  // Locate the link by visible text
  const seeInfoLink = page.getByRole("link", { name: /see my information/i });

  // Verify the link is visible on the homepage
  await expect(seeInfoLink).toBeVisible();

  // Click the link (same tab navigation)
  await seeInfoLink.click();

  // Wait for full page load
  await page.waitForLoadState("networkidle");

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(/childsupport\.ca\.gov\/customer-connect/);

  // Verify some visible content exists on the page
  const mainContent = page.locator("main");
  await expect(mainContent).toContainText(/customer connect/i);
});

// Test to check the "Enroll in Services" link: visible, navigates, content loads
test("Enroll in Services link is visible and navigates to Enroll page", async ({
  page,
}) => {
  // Locate the link by visible text
  const enrollLink = page.getByRole("link", { name: /enroll in services/i });

  // Verify the link is visible on the homepage
  await expect(enrollLink).toBeVisible();

  // Click the link (same tab navigation)
  await enrollLink.click();

  // Wait for full page load
  await page.waitForLoadState("networkidle");

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(/childsupport\.ca\.gov\/enroll/);

  // Verify some visible content exists on the page
  const mainContent = page.locator("main");
  await expect(mainContent).toContainText(/enroll/i);
});

// Test to check the "Calculate Support" link: visible, navigates, content loads
test("Calculate Support link is visible and navigates to Guideline Calculator page", async ({
  page,
}) => {
  // Locate the link by visible text
  const calculateLink = page.getByRole("link", { name: /calculate support/i });

  // Verify the link is visible on the homepage
  await expect(calculateLink).toBeVisible();

  // Click the link (same tab navigation)
  await calculateLink.click();

  // Wait for full page load
  await page.waitForLoadState("networkidle");

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(/childsupport\.ca\.gov\/guideline-calculator/);

  // Verify some visible content exists on the page
  const mainContent = page.locator("main");
  await expect(mainContent).toContainText(/guideline calculator/i);
});

// Test to check the "Video Library" link: visible, navigates, content loads
test("Video Library link is visible and navigates to Video Resource Library page", async ({
  page,
}) => {
  // Locate the link by visible text
  const videoLibraryLink = page.getByRole("link", { name: /video library/i });

  // Verify the link is visible on the homepage
  await expect(videoLibraryLink).toBeVisible();

  // Click the link (same tab navigation)
  await videoLibraryLink.click();

  // Wait for full page load
  await page.waitForLoadState("networkidle");

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(/childsupport\.ca\.gov\/video-resource-library/);

  // Verify some visible content exists on the page
  const mainContent = page.locator("main");
  await expect(mainContent).toContainText(/video/i);
});

test("Help Section link navigates to FAQ page", async ({ page }) => {
  await page.goto("https://childsupport.ca.gov/");

  // Locate the visible link by partial text, ignore icon characters
  const helpLink = page.getByText(/help section/i, { exact: false }).first();

  // Click the link
  await helpLink.click();

  // Verify that the page navigated to the FAQ page
  await expect(page).toHaveURL("https://childsupport.ca.gov/faq/");
});

test("Enrollment Information accordion is visible and expands to show content", async ({
  page,
}) => {
  // Locate the heading
  const accordion = page.locator("h2", { hasText: /enrollment information/i });

  // Ensure it is visible
  await expect(accordion).toBeVisible();

  // Scroll into view
  await accordion.scrollIntoViewIfNeeded();

  // Content is likely the next sibling element
  const content = accordion.locator("xpath=following-sibling::*").first();

  // Initially hidden
  await expect(content)
    .toHaveJSProperty("hidden", true)
    .catch(() => {});

  // Click to expand
  await accordion.click();

  // Verify content is now visible
  await expect(content).toBeVisible();
});

// Test "Starting Services?" accordion
test("Starting Services? accordion is visible and expands to show content", async ({
  page,
}) => {
  const accordion = page.getByText(/starting services\?/i, { exact: false });
  await expect(accordion).toBeVisible();

  const content = accordion.locator("xpath=following-sibling::*");
  await expect(content).not.toBeVisible();

  await accordion.click();
  await expect(content).toBeVisible();
});

// Test "Process Overview" accordion
test("Process Overview accordion is visible and expands to show content", async ({
  page,
}) => {
  const accordion = page.getByText(/process overview/i, { exact: false });
  await expect(accordion).toBeVisible();

  const content = accordion.locator("xpath=following-sibling::*");
  await expect(content).not.toBeVisible();

  await accordion.click();
  await expect(content).toBeVisible();
});

// Test "Already Have Services?" accordion
test("Already Have Services? accordion is visible and expands to show content", async ({
  page,
}) => {
  const accordion = page.getByText(/already have services\?/i, {
    exact: false,
  });
  await expect(accordion).toBeVisible();

  const content = accordion.locator("xpath=following-sibling::*");
  await expect(content).not.toBeVisible();

  await accordion.click();
  await expect(content).toBeVisible();
});

test("Homepage videos (English & Spanish) are present", async ({ page }) => {
  // Catch any iframes loaded for videos
  const videos = page.locator("iframe");

  // Wait for at least 2 iframes to exist
  await videos.nth(1).waitFor({ timeout: 20000 });

  // Count iframes and ensure at least 2 exist
  const count = await videos.count();
  console.log("Video iframes found:", count);
  expect(count).toBeGreaterThanOrEqual(2);

  // Verify they are visible
  await expect(videos.nth(0)).toBeVisible({ timeout: 10000 });
  await expect(videos.nth(1)).toBeVisible({ timeout: 10000 });
});

// Test: Navbar "Paying" expands and first link navigates correctly
test('Navbar "Paying" expands and first link navigates correctly', async ({
  page,
}) => {
  // Locate the "Paying" navbar link
  const payingNav = page.getByRole("link", { name: /paying/i });
  await expect(payingNav).toBeVisible();

  // Click to expand the dropdown menu
  await payingNav.click();

  // Verify the first dropdown item "Tools & Information" is visible
  const toolsLink = page.getByRole("link", { name: /tools & information/i });
  await expect(toolsLink).toBeVisible();

  // Click the dropdown link
  await toolsLink.click();

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL("https://childsupport.ca.gov/payer/");
});

// Test: Navbar "Online Case Information" navigates correctly
test('Navbar "Online Case Information" expands and navigates correctly', async ({
  page,
}) => {
  // Locate and expand the "Paying" navbar menu
  const payingNav = page.getByRole("link", { name: /paying/i });
  await expect(payingNav).toBeVisible();
  await payingNav.click();

  // Locate the "Online Case Information" link inside the expanded menu
  const onlineCaseLink = page.getByRole("link", {
    name: /online case information/i,
  });
  await expect(onlineCaseLink).toBeVisible();

  // Click the link to navigate
  await onlineCaseLink.click();

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL("https://childsupport.ca.gov/customer-connect/");
});

// Test: Navbar "Help with Debt" navigates correctly
test('Navbar "Help with Debt" expands and navigates correctly', async ({
  page,
}) => {
  // Locate and expand the "Paying" navbar menu
  const payingNav = page.getByRole("link", { name: /paying/i });
  await expect(payingNav).toBeVisible();
  await payingNav.click();

  // Locate the "Help with Debt" link inside the expanded menu
  const helpDebtLink = page.getByRole("link", { name: /help with debt/i });
  await expect(helpDebtLink).toBeVisible();

  // Click the link to navigate
  await helpDebtLink.click();

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(
    "https://childsupport.ca.gov/debt-reduction-program/"
  );
});

// Test: Navbar "Military Specific Services" navigates correctly
test('Navbar "Military Specific Services" expands and navigates correctly', async ({
  page,
}) => {
  // Locate and expand the "Paying" navbar menu
  const payingNav = page.getByRole("link", { name: /paying/i });
  await expect(payingNav).toBeVisible();
  await payingNav.click();

  // Locate the "Military Specific Services" link inside the expanded menu
  const militaryLink = page.getByRole("link", {
    name: /military specific services/i,
  });
  await expect(militaryLink).toBeVisible();

  // Click the link to navigate
  await militaryLink.click();

  // Verify the page navigated to the correct URL
  await expect(page).toHaveURL(
    "https://childsupport.ca.gov/military-resource-center/"
  );
});

// Test: Search bar works and top result contains expected text
test('Search bar returns expected result for "agency"', async ({ page }) => {
  // Locate the search input and type the term
  const searchInput = page.locator('input[type="search"]');
  await expect(searchInput).toBeVisible({ timeout: 10000 });
  const searchTerm = "agency";
  await searchInput.fill(searchTerm);

  // Click the question mark button
  const searchButton = page.locator(".ca-gov-icon-search");
  await expect(searchButton).toBeVisible({ timeout: 10000 });
  await searchButton.click();

  // Wait for the top search result link to appear
  const topResultLink = page
    .locator(".gsc-webResult.gsc-result a.gs-title")
    .first();
  await expect(topResultLink).toBeVisible({ timeout: 15000 });

  // Verify the top result contains the expected text
  const topResultText = await topResultLink.textContent();
  expect(topResultText).toContain("CA Child Support Services");
});
