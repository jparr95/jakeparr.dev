import { test, expect } from "@playwright/test"

test.describe("Content", () => {
  test("projects section lists all projects", async ({ page }) => {
    await page.goto("/")
    await page.locator("#projects").scrollIntoViewIfNeeded()

    await expect(page.getByRole("heading", { name: "synthwave-ui" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "devlog" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "packet" })).toBeVisible()

    await expect(
      page.getByText(
        /component library for building futuristic interfaces with React and Tailwind/
      )
    ).toBeVisible()
    await expect(
      page.getByText(/markdown-powered blogging engine built on Next.js/)
    ).toBeVisible()
    await expect(
      page.getByText(/WebSocket message inspector for debugging distributed systems/)
    ).toBeVisible()
  })

  test("writing section lists blog posts", async ({ page }) => {
    await page.goto("/")
    await page.locator("#writing").scrollIntoViewIfNeeded()

    await expect(
      page.getByRole("heading", { name: "On Building Resilient Distributed Systems" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "The Case for Server Components" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Type-Safe APIs with tRPC and Zod" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: "Rethinking State Management in 2026" })
    ).toBeVisible()
  })

  test("about section displays bio and tech stack", async ({ page }) => {
    await page.goto("/")
    const about = page.locator("#about")
    await about.scrollIntoViewIfNeeded()

    await expect(about.getByText("Internet", { exact: true })).toBeVisible()
    await expect(about.getByText("Full-stack web development")).toBeVisible()
    await expect(about.getByText("TypeScript", { exact: true }).first()).toBeVisible()
    await expect(about.getByText("React", { exact: true }).first()).toBeVisible()
    await expect(about.getByText("Go", { exact: true }).first()).toBeVisible()

    await expect(
      about.getByText(/software developer interested in the intersection of design/)
    ).toBeVisible()
  })

  test("GitHub links point to correct URL", async ({ page }) => {
    await page.goto("/")

    const headerGhLink = page.getByRole("link", { name: "github" }).first()
    await expect(headerGhLink).toHaveAttribute("href", "https://github.com/jakeparr")
    await expect(headerGhLink).toHaveAttribute("target", "_blank")
  })
})
