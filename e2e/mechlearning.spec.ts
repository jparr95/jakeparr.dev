import { test, expect } from "@playwright/test"

test.describe("MechLearning takeover", () => {
  test("fills the viewport below the site header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto("/projects/mechlearning")

    await expect(page.getByRole("banner")).toBeVisible()
    const iframe = page.locator("iframe")
    await expect(iframe).toHaveAttribute("src", "/apps/mechlearning/index.html")

    const header = await page.getByRole("banner").boundingBox()
    const frame = await iframe.boundingBox()
    expect(header && frame).toBeTruthy()
    expect(Math.round(frame!.y)).toBe(Math.round(header!.y + header!.height))
    expect(Math.round(frame!.y + frame!.height)).toBe(720)

    const scrolls = await page.evaluate(
      () => document.scrollingElement!.scrollHeight > window.innerHeight
    )
    expect(scrolls).toBe(false)
  })

  test("loads a lesson and switches lessons", async ({ page }) => {
    test.setTimeout(90_000)
    await page.goto("/projects/mechlearning")
    const app = page.frameLocator("iframe")
    const root = app.locator("[data-ready='1']")
    await expect(root).toBeVisible({ timeout: 60_000 })

    const first = await root.getAttribute("data-lesson")
    await app.getByRole("button", { name: "Choose a lesson", exact: true }).click()
    await app.getByRole("button", { name: /PD control/i }).click()
    await expect(root).not.toHaveAttribute("data-lesson", first ?? "")
  })
})
