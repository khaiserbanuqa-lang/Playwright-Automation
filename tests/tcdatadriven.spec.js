import { test, expect } from '@playwright/test'
import { POManager } from '../pageObjects/POManager'
import testData from '../utils/data.json' assert { type: 'json' }

for (const data of testData) {

  test(`tcregister ${data.username}`, async ({ page }) => {

    const pomanager = new POManager(page)
    const homepage = pomanager.getHomePage()

    await homepage.goTo()
    await homepage.clickRegisterLink()

    const registerpage = pomanager.getRegistrationPage()

    await registerpage.registerUser(data.firstname, data.lastname, data.city, data.address,
      data.state, data.zipcode, data.phonenumber, data.ssn, data.username, data.confirmpassword)

    await registerpage.clickOnRegisterButton()

    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm')
    await page.waitForTimeout(2000)
  })
}