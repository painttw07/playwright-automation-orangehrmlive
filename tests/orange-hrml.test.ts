import { test, expect } from '@playwright/test';
//Classe Page Object Model (POM) que encapsula elementos e ações da página principal
import { OrangePage, CandidateData } from './../pages/orange-page';
//Classe POM para operações de autenticação
import { LoginPage } from '../pages/login-page';

//Função que agrupa testes relacionados em uma suíte
test.describe('OrangeHRM Tests', () => { //contexto isolado

    //Função executada antes de cada teste
    test.beforeEach(async ({ page }) => { //{ page } -> Objeto page do contexto Playwright (destructuring)
        //Create an object to use the login page
        //Instanciação da classe POM com injeção da página
        const loginPage = new LoginPage(page); //page -> Objeto de página para interação com browser
        await loginPage.login();
        await expect(page, "The login should be done and go to the Dashboard").toHaveTitle(/OrangeHRM/);

    });    //Teste de integração para funcionalidade de cadastro de candidatos
    test('Add new candidate', async ({ page }) => {
        //Create an object to use the principal page 
        const orangePage = new OrangePage(page);

        // Dados do candidato para teste
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
    test('View new candidate added', async ({ page }) => {
        const orangePage = new OrangePage(page);
        await orangePage.recruitementPage();
        await expect(orangePage.viewRecruitmentCandidatesTitle()).toBeVisible();
        await expect(orangePage.registerSavedUser()).toBeVisible();
    });

});