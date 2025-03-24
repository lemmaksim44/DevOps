// @ts-ignore
import './Form.css';

export class Form {
  private formContainer: HTMLElement;

  constructor() {
    this.formContainer = this.createForm();
  }

  private createForm(): HTMLElement {
    const form = document.createElement('form');
    form.classList.add('form-container');

    const loginField = this.createInputField('login', 'text', 'Login');
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

    container.append(input);

    return container;
  }

  private createSubmitBtn(text: string): HTMLElement {
    const btnSubmit = document.createElement('button');
    btnSubmit.setAttribute('type', 'submit');
    btnSubmit.classList.add('submit-btn');
    btnSubmit.textContent = text;

    return btnSubmit;
  }

  public getFormElement(): HTMLElement {
    return this.formContainer;
  }
}