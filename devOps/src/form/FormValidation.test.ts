import { describe, it, expect } from 'vitest';
import { FormValidation } from './FormValidation';

describe('FormValidation', () => {
  
  describe('validationLogin', () => {
    it('should return error when login is empty', () => {
      const result = FormValidation.validationLogin('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Login cannot be empty');
    });

    it('should return error when login does not start with a capital letter', () => {
      const result = FormValidation.validationLogin('testUser');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Login must start with a capital letter');
    });

    it('should return valid when login is correct', () => {
      const result = FormValidation.validationLogin('TestUser');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });

  describe('validationPassword', () => {
    it('should return error when password is less than 6 characters', () => {
      const result = FormValidation.validationPassword('12345');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Password must be at least 6 characters long');
    });

    it('should return valid when password is 6 characters or more', () => {
      const result = FormValidation.validationPassword('password123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
  });
});
