type ValidationResult = {
  isValid: boolean;
  error?: string;
}

export class FormValidation {
  static validationLogin(login: string): ValidationResult {
    if (!login.trim()) {
      return {
        isValid: false,
        error:  'Login cannot be empty'
      };
    }

      const firstChar = login.trim()[0];
      if (firstChar !== firstChar.toUpperCase()) {
        return {
          isValid: false, error: 'Login must start with a capital letter'
        };
    }
    return { isValid: true };
  }

static validationPassword(password: string): ValidationResult {
    if (password.length < 6) {
      return {
        isValid: false,
        error:  'Password must be at least 6 characters long'
      };
    }
    return { isValid: true };
  }
}

