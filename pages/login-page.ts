import type { Locator, Page } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private username: Locator;
    private password: Locator;
    private loginButton: Locator;
    private forgetYourPassword: Locator;

    /**
         * @param page - The Playwright Page object
         */
    constructor(page: Page) {
        this.page = page;
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password")
        this.loginButton = page.getByRole("button", {
            name: "Login"
        })
    }

    /**
     * @param baseUrl - The base URL to navigate to
     * @returns Promise that resolves when navigation is complete
     */
    public async login(): Promise<void> {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await this.username.fill("Admin");
        await this.password.fill("admin123")
        await this.loginButton.click();
    }

    //https://front.serverest.dev/login
    //https://bugbank.netlify.app/

}