import { POManager } from "../pageObjects/POManager"
import { customtest as test, expert } from '../fixtures/testfixture'

test('login', async ({ page, testdataForregistration }) => 
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