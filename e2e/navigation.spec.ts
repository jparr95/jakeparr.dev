import { test, expect } from "@playwright/test"
import { projects } from "../content/projects"

test.describe("Navigation", () => {
  test("desktop nav links navigate to sections", async ({ page }) => {
    await page.goto("/")
    await page.setViewportSize({ width: 1280, height: 720 })

    const nav = page.getByRole("banner").getByRole("navigation")
    await nav.getByRole("link", { name: "projects", exact: true }).click()
    await expect(page.locator("#projects")).toBeInViewport()

    await nav.getByRole("link", { name: "about", exact: true }).click()
    await expect(page.locator("#about")).toBeInViewport()

    await expect(nav.getByRole("link", { name: "writing", exact: true })).toHaveCount(0)
  })

  test("mobile menu toggles and closes on link click", async ({ page }) => {
    await page.goto("/")
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.getByRole("button", { name: "Open menu" })
    await expect(menuButton).toBeVisible()

    await menuButton.click()
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible()
    // The desktop list is display:none at this width, so role queries only see the mobile menu.
    const banner = page.getByRole("banner")
    await expect(banner.getByRole("link", { name: "about", exact: true })).toBeVisible()
    await expect(banner.getByRole("link", { name: "projects", exact: true })).toBeVisible()
    await expect(banner.getByRole("link", { name: /OmniPhys Particle Sandbox/ })).toBeVisible()

    await banner.getByRole("link", { name: "about", exact: true }).click()
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

  test("project page opens from the projects section", async ({ page }) => {
    await page.goto("/")
    const first = projects.filter((p) => p.category === "mine")[0]
    await page.locator("#projects").getByRole("link", { name: first.title }).click()
    await expect(page).toHaveURL(`/projects/${first.slug}`)
    await expect(page.getByRole("heading", { level: 1, name: first.title })).toBeVisible()
    await expect(page.getByRole("link", { name: /back/ })).toBeVisible()
    await expect(page.getByRole("link", { name: /source/ })).toHaveAttribute("href", first.repoUrl)
    if (first.embed) {
      await expect(page.locator("iframe")).toHaveAttribute("src", first.embed.path)
    }
  })
})
