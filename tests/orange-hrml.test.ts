import { test, expect } from '@playwright/test';
// Page Object Model (POM) class that encapsulates elements and actions of the main page
import { OrangePage, CandidateData } from './../pages/orange-page';
// POM class for authentication operations
import { LoginPage } from '../pages/login-page';

// Function that groups related tests into a suite
test.describe('OrangeHRM Tests', () => { //isolated context

    // Function executed before each test
    test.beforeEach(async ({ page }) => { // { page } -> Page object from Playwright context (destructuring)
        // Create an object to use the login page
        // Instantiation of the POM class with page injection
        const loginPage = new LoginPage(page); // page -> Page object for browser interaction
        await loginPage.login();
        await expect(page, "The login should be done and go to the Dashboard").toHaveTitle(/OrangeHRM/);
    });

    // Integration test for candidate registration functionality
    test('Add new candidate', async ({ page }) => {
        // Create an object to use the main page
        const orangePage = new OrangePage(page);

        // Candidate data for testing
        const candidateData: CandidateData = {
            firstName: 'New',
            middleName: 'candidate',
            lastName: 'test',
            email: 'newcandidate@gmail.com'
        };

        await orangePage.recruitementPage();
        await expect(orangePage.viewRecruitmentCandidatesTitle()).toBeVisible();
        await orangePage.addNewCandidate();
        await expect(orangePage.addCandidateTitleValidation()).toBeVisible();
        await orangePage.newCandidate(candidateData);
        await expect(orangePage.validateSuccessMessage(), "Success message must be displayed").toBeVisible();
    });

    // Test to verify the newly added candidate
    test('View new candidate added', async ({ page }) => {
        const orangePage = new OrangePage(page);
        await orangePage.recruitementPage();
        await expect(orangePage.viewRecruitmentCandidatesTitle()).toBeVisible();
        await expect(orangePage.registerSavedUser()).toBeVisible();
    });
});