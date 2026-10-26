import { test, expect } from "@playwright/test"

test.describe("About page", () => {
  test("opens from the home page and shows the story inline", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /Read the longer story/ }).click()
    await expect(page).toHaveURL("/about")
    await expect(page.getByRole("heading", { level: 1, name: /Hi, I'm Jake/ })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "The tiny house" })).toBeVisible()
    await expect(page.getByRole("link", { name: /back/ })).toBeVisible()
  })

  test("hobby generator produces a hobby", async ({ page }) => {
    await page.goto("/about")
    await page.getByRole("button", { name: "Generate" }).click()
    await expect(page.getByText(/I think I'm going to try .+ next!/)).toBeVisible()
  })

  test("disc golf project is listed and links out", async ({ page }) => {
    await page.goto("/")
    await page.locator("#projects").getByRole("link", { name: /In The Bag/ }).click()
    await expect(page).toHaveURL("/projects/in-the-bag")
    await expect(page.getByRole("link", { name: /Visit the live site/ })).toHaveAttribute(
      "href",
      "https://jparr95.github.io/In-The-Bag/"
    )
  })
})
