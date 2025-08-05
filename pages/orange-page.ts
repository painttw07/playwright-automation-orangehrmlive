import type { Locator, Page } from "@playwright/test";

// Interface for candidate data
export interface CandidateData {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
}

// Export -> Makes the class available for import in other files
// Class -> Implementation of the Page Object Model pattern
export class OrangePage {
    private page: Page; // Type that represents a browser page instance
    // Locator: Type that represents an element or set of elements on the page
    private recruitmentOption: Locator;
    private buttonAdd: Locator;
    private addCandidateTitle: Locator;
    private usernameField: Locator;
    private middleName: Locator;
    private lastName: Locator;
    private email: Locator;
    private save: Locator;
    private successMessage: Locator;
    private recruitmentCandidatesTitle: Locator;
    private savedUser: Locator;

    constructor(page: Page) { // Special method executed during instantiation
        this.page = page; // Stores the page reference
        this.recruitmentOption = page.getByText('Recruitment');
        this.buttonAdd = page.getByText(' Add ');
        this.addCandidateTitle = page.getByRole('heading', { name: 'Add Candidate' });
        this.usernameField = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name')
        this.lastName = page.getByPlaceholder('Last Name');
        this.email = page.getByPlaceholder('Type here').first();
        this.save = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.getByText('Success').first();
        this.recruitmentCandidatesTitle = page.getByRole('heading', { name: 'Candidates' });
        this.savedUser = page.getByRole('cell', { name: 'New candidate test' }).first();
    }

    public async recruitementPage(): Promise<void> { // Returns a Promise that resolves with no value
        await this.recruitmentOption.click();
    }

    public async addNewCandidate(): Promise<void> {
        await this.buttonAdd.click();
    }

    /**
     * Fills out the new candidate form with parameterized data
     * @param candidateData Object with the candidate's data
     */
    public async fillCandidateForm(candidateData: CandidateData): Promise<void> {
        await this.usernameField.fill(candidateData.firstName);
        await this.middleName.fill(candidateData.middleName);
        await this.lastName.fill(candidateData.lastName);
        await this.email.fill(candidateData.email);
    }

    /**
     * Submits the candidate form
     */
    public async submitCandidateForm(): Promise<void> {
        await this.save.click();
    }

    /**
     * Complete method to create a new candidate (compatibility)
     * @param candidateData Candidate data
     */
    public async newCandidate(candidateData: CandidateData): Promise<void> {
        await this.fillCandidateForm(candidateData);
        await this.submitCandidateForm();
    }

    /**
     * Waits for the add candidate form to be visible
     */
    public async waitForAddCandidateForm(): Promise<void> {
        await this.addCandidateTitle.waitFor({ state: 'visible' });
    }

    // Getter Methods:

    /**
     * @returns Locator for the add candidate title
     */
    public addCandidateTitleValidation(): Locator /* Exposes elements for external validation */ {
        return this.addCandidateTitle;
    }

    /**
     * @returns Locator for the success message
     */
    public validateSuccessMessage(): Locator {
        return this.successMessage;
    }

    /**
     * @returns Locator for the candidates page title
     */
    public viewRecruitmentCandidatesTitle(): Locator {
        return this.recruitmentCandidatesTitle;
    }

    /**
     * @returns Locator for the saved user in the list
     */
    public registerSavedUser(): Locator {
        return this.savedUser;
    }
}
