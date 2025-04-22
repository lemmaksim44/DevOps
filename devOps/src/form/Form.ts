// @ts-ignore
import './Form.css';
import { FormValidation } from './FormValidation';
import { ApiClient } from '../request/Request';
import { Router } from '../router/Router';

export class Form {
  private formContainer: HTMLElement;
  private apiClient: ApiClient;
  private router: Router;

  constructor( router: Router) {
    this.apiClient = new ApiClient();
    this.formContainer = this.createForm();
    this.setupValidation();
    this.router = router;
  }

  private createForm(): HTMLElement {
    const form = document.createElement('form');
    form.classList.add('form-container');

    const loginField = this.createInputField('username', 'text', 'Username');
    form.append(loginField);

    const passwordField = this.createInputField('password', 'password', 'Password');
    form.append(passwordField);

    const submitBtn = this.createSubmitBtn('Enter');
    form.append(submitBtn);

    return form;
  }

  private createInputField(id: string, type: string, labelText: string): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('form-group');

    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', id);
    input.setAttribute('name', id);
    input.setAttribute('placeholder', `Введите ${labelText.toLowerCase()}`);

    const errorMessage = document.createElement('span');
    errorMessage.classList.add('error-message');

    container.append(input, errorMessage);

    return container;
  }

  private createSubmitBtn(text: string): HTMLElement {
    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.classList.add('submit-btn');
    btnSubmit.textContent = text;

    return btnSubmit;
  }

  private setupValidation(): void {
    const form = this.formContainer;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      this.clearErrors();

      const loginInput = form.querySelector('#username') as HTMLInputElement;
      const passwordInput = form.querySelector('#password') as HTMLInputElement;

      const loginValidation = FormValidation.validationLogin(loginInput.value);
      const passwordValidation = FormValidation.validationPassword(passwordInput.value);

      if (!loginValidation.isValid) {
        this.showError(loginInput, loginValidation.error!);
      }

      if (!passwordValidation.isValid) {
        this.showError(passwordInput, passwordValidation.error!);
      }

      if (loginValidation.isValid && passwordValidation.isValid) {
        try {
          console.log('Auth payload:', {
            username: loginInput.value,
            password: passwordInput.value
          });
          const response = await this.apiClient.postAuth<{
            access_token: string;
            token_type: string;
        }>({
            username: loginInput.value,
            password: passwordInput.value
        });
        localStorage.setItem('authToken', response.access_token);
        this.apiClient.setToken(response.  access_token);
        this.router.navigateTo('/main')
      } catch (error) {
        console.error('Ошибка авторизации:', error);
      }
      }
    })
  }

  private showError(input: HTMLInputElement, message: string): void {
    const errorElement = input.nextElementSibling as HTMLElement;
    errorElement.textContent = message;
    input.classList.add('error');
  }

  private clearErrors(): void {
    const errorMessages = this.formContainer.querySelectorAll('.error-message');
    errorMessages.forEach((el) => el.textContent = '');
    const errorInputs = this.formContainer.querySelectorAll('.error');
    errorInputs.forEach((el) => el.classList.remove('error'));
  }


  public getFormElement(): HTMLElement {
    return this.formContainer;
  }

}