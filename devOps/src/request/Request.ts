export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8000') {
    this.baseUrl = baseUrl;
  }

  public async postAuth<T>(data: { username: string; password: string }): Promise<T> {
    const endpoint = '/auth';
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      // mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json(); // попробуем прочитать ошибку
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}