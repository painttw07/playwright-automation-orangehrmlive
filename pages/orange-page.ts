import type { Locator, Page } from "@playwright/test";

// Interface para dados do candidato
export interface CandidateData {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
}

//Export -> Torna a classe disponível para importação em outros arquivos
//Class -> Implementação do padrão Page Object Model
export class OrangePage {
    private page: Page; //Tipo que representa uma instância de página do browser
    //Locator: Tipo que representa um elemento ou conjunto de elementos na página
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

    constructor(page: Page) { //Método especial executado na instanciação
        this.page = page; // Armazena referência da página
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
    public async recruitementPage(): Promise<void> { //Retorna Promise que resolve sem valor
        await this.recruitmentOption.click();
    }

    public async addNewCandidate(): Promise<void> {
        await this.buttonAdd.click();
    }

    /**
     * Preenche o formulário de novo candidato com dados parametrizados
     * @param candidateData Objeto com os dados do candidato
     */
    public async fillCandidateForm(candidateData: CandidateData): Promise<void> {
        await this.usernameField.fill(candidateData.firstName);
        await this.middleName.fill(candidateData.middleName);
        await this.lastName.fill(candidateData.lastName);
        await this.email.fill(candidateData.email);
    }

    /**
     * Submete o formulário de candidato
     */
    public async submitCandidateForm(): Promise<void> {
        await this.save.click();
    }

    /**
     * Método completo para criar novo candidato (compatibilidade)
     * @param candidateData Dados do candidato
     */
    public async newCandidate(candidateData: CandidateData): Promise<void> {
        await this.fillCandidateForm(candidateData);
        await this.submitCandidateForm();
    }

    /**
     * Aguarda o formulário de adicionar candidato estar visível
     */
    public async waitForAddCandidateForm(): Promise<void> {
        await this.addCandidateTitle.waitFor({ state: 'visible' });
    }    //Métodos Getter:

    /**
     * @returns Locator para o título de adicionar candidato
     */
    public addCandidateTitleValidation(): Locator /* Expõem os elementos para validação externa */ {
        return this.addCandidateTitle;
    }

    /**
     * @returns Locator para a mensagem de sucesso
     */
    public validateSuccessMessage(): Locator {
        return this.successMessage;
    }
    /**
     * @returns Locator para o título da página de candidatos
     */
    public viewRecruitmentCandidatesTitle(): Locator {
        return this.recruitmentCandidatesTitle;
    }
    /**
     * @returns Locator para o usuário salvo na lista
     */
    public registerSavedUser(): Locator {
        return this.savedUser;
    }

}