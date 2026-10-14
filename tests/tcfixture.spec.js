import { POManager } from "../pageObjects/POManager"
import { customtest as test, expert } from '../fixtures/testfixture'

test('tcregister', async ({ page,testdataForregistration }) => {

    const pomanager = new POManager(page)   
    const homepage = pomanager.getHomePage()

    await homepage.goTo()
    await homepage.clickRegisterLink()

    const registerpage = pomanager.getRegistrationPage()
    
   await registerpage.registerUser(testdataForregistration.firstname, testdataForregistration.lastname, testdataForregistration.city, testdataForregistration.address,
        testdataForregistration.state, testdataForregistration.zipcode, testdataForregistration.phonenumber, testdataForregistration.ssn, testdataForregistration.username, testdataForregistration.confirmpassword)

    await registerpage.clickOnRegisterButton()

})