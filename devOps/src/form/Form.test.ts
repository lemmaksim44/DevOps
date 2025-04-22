import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Form } from './Form';
import { Router } from '../router/Router';

// Мокаем ApiClient и Router
const mockPostAuth = vi.fn().mockResolvedValue({
  access_token: 'mocked_token',
  token_type: 'Bearer',
});
const mockSetToken = vi.fn();
const mockNavigateTo = vi.fn();

vi.mock('../request/Request', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    postAuth: mockPostAuth,
    setToken: mockSetToken,
  })),
}));

vi.mock('../router/Router', () => ({
  Router: vi.fn().mockImplementation(() => ({
    navigateTo: mockNavigateTo,
  })),
}));

describe('Form', () => {
  let form: Form;
  let router: Router;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    router = new Router(container);
    form = new Form(router);  // Передаем только router, так как Form ожидает только его
    document.body.append(form.getFormElement());
  });

  it('should render the form with inputs and submit button', () => {
    const formElement = form.getFormElement();
    expect(formElement).toBeTruthy();

    const usernameField = formElement.querySelector('#username');
    const passwordField = formElement.querySelector('#password');
    const submitButton = formElement.querySelector('button[type="submit"]');

    expect(usernameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should show validation errors for empty fields', () => {
    const formElement = form.getFormElement();
    const submitButton = formElement.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitButton.click();

    const errorMessages = formElement.querySelectorAll('.error-message');
    expect(errorMessages.length).toBe(2);

    expect(errorMessages[0].textContent).toMatch(/Login cannot be empty/);
    expect(errorMessages[1].textContent).toMatch(/Password must be at least 6 characters long/);
  });

});
