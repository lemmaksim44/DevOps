import { describe, it, expect, beforeEach } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  let header: Header;

  beforeEach(() => {
    header = new Header();
  });

  it('should create the header with the correct title and class', () => {
    const headerElement = header.getHeaderElement();

    // Проверяем, что элемент header был создан
    expect(headerElement).toBeTruthy();
    const titleElement = headerElement.querySelector('.header__title');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toBe('Aurum Vet');
  });

  it('should return the correct header element from getHeaderElement', () => {
    const headerElement = header.getHeaderElement();
    expect(headerElement.tagName).toBe('HEADER');
  });

  it('should update styles correctly for main page', () => {
    const headerElement = header.getHeaderElement();
    expect(headerElement.classList.contains('main-page-header')).toBe(false);
    expect(headerElement.classList.contains('login-page-header')).toBe(false);
    header.updateHeaderStyle('/main');

    expect(headerElement.classList.contains('main-page-header')).toBe(true);
    expect(headerElement.classList.contains('login-page-header')).toBe(false);
  });

  it('should update styles correctly for login page', () => {
    const headerElement = header.getHeaderElement();
    expect(headerElement.classList.contains('login-page-header')).toBe(false);
    expect(headerElement.classList.contains('main-page-header')).toBe(false);

    header.updateHeaderStyle('/login');
    expect(headerElement.classList.contains('login-page-header')).toBe(true);
    expect(headerElement.classList.contains('main-page-header')).toBe(false);
  });
});
