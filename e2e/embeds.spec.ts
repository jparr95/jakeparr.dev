import { test, expect } from "@playwright/test"
import { projects } from "../content/projects"

const embedded = projects.filter((p) => p.embed)

test.describe("Embedded projects", () => {
  // Each embed creates a WebGL context; headless software GL can't create several at once.
  test.describe.configure({ mode: "serial", timeout: 90_000 })

  for (const project of embedded) {
    test(`${project.title} becomes ready without errors`, async ({ page }) => {
      const errors: string[] = []
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text())
      })
      page.on("pageerror", (err) => errors.push(err.message))

      await page.goto(`/projects/${project.slug}`)
      const ready = page.frameLocator("iframe").locator("[data-ready='1']")
      await expect(ready).toBeAttached({ timeout: 60_000 })
      expect(errors).toEqual([])
    })
  }
})
