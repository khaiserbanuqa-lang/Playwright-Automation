
// import { test, expect } from '@playwright/test'
// import { HomePage } from "../pageObjects/HomePage"
// import { RegistrationPage } from '../pageObjects/RegistrationPage'

// test('tcregister', async ({ page }) => {
//     const homepage = new HomePage(page)

//     await homepage.goTo()
//     await homepage.clickRegisterLink()

//     const registerpage = new RegistrationPage(page)
//    await registerpage.registerUser('john', 'saw', 'texas', 'canada',
//         'usa', '1232434', '44123068', '111111', 'js17', 'asdf')

//     await registerpage.clickOnRegisterButton()

//      await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm')
//      await page.waitForTimeout(2000)
// })


import { test, expect } from '@playwright/test'
import { POManager } from '../pageObjects/POManager'

test('tcRegister', async ({ page }) => {

    const pomanager = new POManager(page)   
    const homepage = pomanager.getHomePage()

    await homepage.goTo()
    await homepage.clickRegisterLink()

    const registerpage = pomanager.getRegistrationPage()

   await registerpage.registerUser('lolo', 'saw', 'florida', 'canada',
        'usa', '1232434', '44123068', '111111', 'js20', 'asdg')

    await registerpage.clickOnRegisterButton()

     await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm')
     await page.waitForTimeout(2000)
})