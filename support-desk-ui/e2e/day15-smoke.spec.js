import { expect, test } from '@playwright/test'

test('admin can log in and create a ticket through the protected UI', async ({ page }) => {
  const uniqueSuffix = Date.now()
  const ticketTitle = `E2E email access issue ${uniqueSuffix}`

  await page.goto('/login')
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

  await page.getByLabel('Email').fill(process.env.E2E_EMAIL || 'admin@example.com')
  await page.getByLabel('Password').fill(process.env.E2E_PASSWORD || 'Admin@12345')
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL(/\/app\/dashboard/)
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

  const mainNavigation = page.getByRole('navigation', { name: 'Main navigation' })
  await mainNavigation.getByRole('link', { name: 'Tickets', exact: true }).click()
  await expect(page).toHaveURL(/\/app\/tickets$/)
  await expect(page.getByRole('heading', { name: 'Ticket dashboard' })).toBeVisible()

  await mainNavigation.getByRole('link', { name: 'New ticket', exact: true }).click()
  await expect(page).toHaveURL(/\/app\/tickets\/new/)
  await expect(page.getByRole('heading', { name: 'Create a ticket' })).toBeVisible()

  await page.getByLabel('Title').fill(ticketTitle)
  await page.getByLabel('Description').fill('Created by the Day 15 Playwright smoke test.')
  await page.getByLabel('Category').fill('Email')
  await page.getByLabel('Priority').selectOption('HIGH')
  await page.getByLabel('Status').selectOption('OPEN')
  await page.getByRole('button', { name: 'Create ticket' }).click()

  await expect(page.getByRole('status')).toHaveText('Ticket created successfully.')
})
