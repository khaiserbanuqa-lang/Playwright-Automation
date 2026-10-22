import { POManager } from "../pageObjects/POManager"
import { customtest as test, expect } from '../fixtures/testfixture'

test.describe.parallel('tc common test',()=>
{

test('@smoketcregister', async ({ page,testdataForregistration }) => {

    const pomanager = new POManager(page)   
    const homepage = pomanager.getHomePage()

    await homepage.goTo()
    await homepage.clickRegisterLink()

    const registerpage = pomanager.getRegistrationPage()
    
   await registerpage.registerUser(testdataForregistration.firstname, testdataForregistration.lastname, testdataForregistration.city, testdataForregistration.address,
        testdataForregistration.state, testdataForregistration.zipcode, testdataForregistration.phonenumber, testdataForregistration.ssn, testdataForregistration.username, testdataForregistration.confirmpassword)

    await registerpage.clickOnRegisterButton()
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm')
    await page.waitForTimeout(2000)

})

test('@sanitylogin', async ({ page, testdataForregistration }) => 
{
    const pomanager = new POManager(page)
    const homepage = pomanager.getHomePage()
    const loginpage = pomanager.getLoginPage()
    await homepage.goTo()

    await loginpage.clickToApplication(
        testdataForregistration.username, 
        testdataForregistration.password
    )

    await loginpage.clickOnloginButton()
 })
})
