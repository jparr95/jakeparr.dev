import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("has correct page title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Jake Parr/)
  })

  test("displays hero section with name, labels and tagline", async ({ page }) => {
    await page.goto("/")
    const hero = page.locator("section").first()
    await expect(hero.getByText("Software Developer")).toBeVisible()
    await expect(hero.getByText("Automation Specialist")).toBeVisible()
    await expect(hero.getByText("Robotics Hobbyist")).toBeVisible()
    await expect(page.getByRole("heading", { name: "Jake Parr" })).toBeVisible()
    await expect(
      page.getByText(/intersection of software and hardware/)
    ).toBeVisible()
  })

  test("displays all main sections and no writing section", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible()
    await expect(page.locator("#writing")).toHaveCount(0)
    await expect(page.getByRole("heading", { name: "Writing" })).toHaveCount(0)
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
    await expect(page.getByRole("link", { name: /View projects/ })).toBeVisible()
    await expect(page.getByRole("link", { name: /More about me/ })).toBeVisible()
    await expect(page.getByRole("link", { name: /Read the blog/ })).toHaveCount(0)
  })

  test("uses a custom favicon, not the template one", async ({ page }) => {
    await page.goto("/")
    const icons = page.locator('link[rel="icon"]')
    expect(await icons.count()).toBeGreaterThan(0)
    const hrefs = await icons.evaluateAll((els) => els.map((el) => el.getAttribute("href") ?? ""))
    for (const href of hrefs) {
      const res = await page.request.get(href)
      expect(res.ok(), `${href} should be served`).toBeTruthy()
      if (href.endsWith(".svg")) {
        // The template icon was the Vercel mark, which carried this clip-path id.
        expect(await res.text()).not.toContain("clip0_7960_43945")
      }
    }
  })

  test("hero background reacts to a click with a blast", async ({ page }) => {
    await page.goto("/")
    const hero = page.locator("section").first()
    const canvas = hero.locator("canvas")
    await expect(canvas).toBeVisible()
    // The effect marks the canvas once the animation loop and listeners are attached.
    await expect(canvas).toHaveAttribute("data-ready", "1")
    await expect(canvas).not.toHaveAttribute("data-blasts", /./)

    // Click empty background in the hero's bottom-right corner (no text or links there).
    const box = (await hero.boundingBox())!
    await page.mouse.click(box.x + box.width - 40, box.y + box.height - 40)
    await expect(canvas).toHaveAttribute("data-blasts", "1")

    // Clicking a link in the hero must not count as a blast.
    await page.getByRole("link", { name: /More about me/ }).click()
    await expect(canvas).toHaveAttribute("data-blasts", "1")
  })

  test("hero pointer movement is tracked for repulsion", async ({ page }) => {
    await page.goto("/")
    const hero = page.locator("section").first()
    const canvas = hero.locator("canvas")
    await expect(canvas).toHaveAttribute("data-ready", "1")

    const box = (await hero.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await expect(canvas).toHaveAttribute("data-pointer", "1")

    await page.mouse.move(box.x + box.width / 2, box.y + box.height + 200)
    await expect(canvas).toHaveAttribute("data-pointer", "0")
  })
})
