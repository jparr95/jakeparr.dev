import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Jake Parr/)
  })

  test("displays hero section with name and tagline", async ({ page }) => {
    await page.goto("/")
    const hero = page.locator("section").first()
    await expect(hero.getByText("Software Developer", { exact: true })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Jake Parr" })).toBeVisible()
    await expect(
      page.getByText(/Building software and writing about web development/)
    ).toBeVisible()
  })

  test("displays all main sections", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Writing" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible()
  })

  test("displays header with site branding", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("banner")).toBeVisible()
    await expect(page.getByRole("link", { name: "jakeparr.dev" })).toBeVisible()
  })

  test("displays footer", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("contentinfo")).toBeVisible()
    await expect(page.getByText("Built with Next.js")).toBeVisible()
  })

  test("hero CTA links are present", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("link", { name: /Read the blog/ })).toBeVisible()
    await expect(page.getByRole("link", { name: /More about me/ })).toBeVisible()
  })
})
