import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("desktop nav links navigate to sections", async ({ page }) => {
    await page.goto("/")
    await page.setViewportSize({ width: 1280, height: 720 })

    const nav = page.getByRole("banner").getByRole("navigation")
    await nav.getByRole("link", { name: "about", exact: true }).click()
    await expect(page.locator("#about")).toBeInViewport()

    await nav.getByRole("link", { name: "writing", exact: true }).click()
    await expect(page.locator("#writing")).toBeInViewport()

    await nav.getByRole("link", { name: "projects", exact: true }).click()
    await expect(page.locator("#projects")).toBeInViewport()
  })

  test("mobile menu toggles and closes on link click", async ({ page }) => {
    await page.goto("/")
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.getByRole("button", { name: "Open menu" })
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible()
    const mobileNav = page.getByRole("banner").locator("ul").last()
    await expect(mobileNav.getByRole("link", { name: "about", exact: true })).toBeVisible()

    await mobileNav.getByRole("link", { name: "about", exact: true }).click()
    await expect(page.locator("#about")).toBeInViewport()

    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible()
  })

  test("home link returns to top", async ({ page }) => {
    await page.goto("/")
    await page.locator("#about").scrollIntoViewIfNeeded()
    await page.getByRole("link", { name: "jakeparr.dev" }).first().click()
    await expect(page).toHaveURL("/")
    const heroHeading = page.getByRole("heading", { name: "Jake Parr" })
    await heroHeading.scrollIntoViewIfNeeded()
    await expect(heroHeading).toBeVisible()
  })
})
