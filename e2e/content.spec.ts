import { test, expect } from "@playwright/test"
import { projects } from "../content/projects"

test.describe("Content", () => {
  test("projects section lists every one of my projects and links to its page", async ({ page }) => {
    await page.goto("/")
    const section = page.locator("#projects")
    await section.scrollIntoViewIfNeeded()

    for (const project of projects.filter((p) => p.category === "mine")) {
      const link = section.getByRole("link", { name: project.title })
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute("href", `/projects/${project.slug}`)
    }
  })

  test("about section displays bio, stack and links", async ({ page }) => {
    await page.goto("/")
    const about = page.locator("#about")
    await about.scrollIntoViewIfNeeded()

    await expect(about.getByText("Software, automation, robotics")).toBeVisible()
    await expect(about.getByText("TypeScript", { exact: true }).first()).toBeVisible()
    await expect(about.getByText("Python", { exact: true }).first()).toBeVisible()
    await expect(about.getByText("MuJoCo", { exact: true }).first()).toBeVisible()

    await expect(
      about.getByText(/software developer and automation specialist/)
    ).toBeVisible()
    await expect(about.getByRole("link", { name: "GitHub (jparr95)" })).toHaveAttribute(
      "href",
      "https://github.com/jparr95"
    )
    await expect(about.getByRole("link", { name: "GitHub (JPs-works)" })).toHaveAttribute(
      "href",
      "https://github.com/JPs-works"
    )
  })

  test("site has no blog or writing copy", async ({ page }) => {
    await page.goto("/")
    const body = await page.locator("body").innerText()
    expect(body).not.toMatch(/\bblog\b/i)
    expect(body).not.toMatch(/writing/i)
  })

  test("header GitHub link points to correct URL", async ({ page }) => {
    await page.goto("/")
    await page.setViewportSize({ width: 1280, height: 720 })

    const headerGhLink = page.getByRole("banner").getByRole("link", { name: "github" }).first()
    await expect(headerGhLink).toHaveAttribute("href", "https://github.com/jparr95")
    await expect(headerGhLink).toHaveAttribute("target", "_blank")
  })
})
