import { HomePage } from "./HomePage";
import { RegistrationPage } from "./RegistrationPage";
import { LoginPage } from "./LoginPage"


export class POManager
{
    constructor(page)
    {
        this.page = page;
        this.homepage = new HomePage(this.page);
        this.registerPage = new RegistrationPage(this.page);
        this.loginPage = new LoginPage(this.page);
    }
        getHomePage()
        {
            return this.homepage;
        }
        getRegistrationPage()
        {
            return this.registerPage;
        }
        getLoginPage()
        {
            return this.loginPage
        }
}