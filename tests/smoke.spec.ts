import { test, expect } from "@playwright/test";

// Public site: every page renders with its heading and the WhatsApp entry point.
const PUBLIC = [
  { path: "/", heading: /tenis/i },
  { path: "/kurset", heading: "Kurset" },
  { path: "/aktivitetet", heading: "Aktivitetet" },
  { path: "/fushat", heading: "Fushat" },
  { path: "/kontakt", heading: "Kontakt" },
];

for (const { path, heading } of PUBLIC) {
  test(`public ${path} renders`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
  });
}

test("SEO files are served", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/favicon.ico", "/apple-icon.png"]) {
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
  }
  const home = await request.get("/");
  const html = await home.text();
  expect(html).toContain("application/ld+json");
  expect(html).toContain('rel="canonical"');
  // The share image URL is hashed by Next; read it from the page and fetch it.
  const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  expect(og, "og:image tag").toBeTruthy();
  const img = await request.get(og!.replace(/&amp;/g, "&"));
  expect(img.status()).toBe(200);
  expect(img.headers()["content-type"]).toContain("image/png");
});

test("health endpoint reaches the database", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  expect(await res.json()).toMatchObject({ ok: true, db: "up" });
});

test("admin is locked without a session", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/hyr$/);
  await page.goto("/admin/nxenesit");
  await expect(page).toHaveURL(/\/hyr\?next=%2Fadmin%2Fnxenesit/);
});

test("wrong password is rejected", async ({ page }) => {
  await page.goto("/hyr");
  await page.getByLabel(/email/i).fill("nobody@example.com");
  await page.getByLabel(/fjalëkalim/i).fill("definitely-wrong");
  await page.getByRole("button", { name: /hyr/i }).click();
  await expect(page).toHaveURL(/\/hyr/);
  await expect(page.getByRole("alert")).toBeVisible();
});

test.describe("staff session", () => {
  const email = process.env.SEED_COACH_EMAIL;
  const password = process.env.SEED_COACH_PASSWORD;
  test.skip(!email || !password, "SEED_COACH_EMAIL / SEED_COACH_PASSWORD not set");

  test("coach logs in and sees today", async ({ page }) => {
    await page.goto("/hyr");
    await page.getByLabel(/email/i).fill(email!);
    await page.getByLabel(/fjalëkalim/i).fill(password!);
    await page.getByRole("button", { name: /hyr/i }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByText("Paneli i trajnerit")).toBeVisible();

    await page.goto("/admin/nxenesit");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Nxënësit");
    await page.goto("/admin/fushat");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Fushat");
    await page.goto("/admin/me-shume/si-funksionon");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Si funksionon");
  });
});
