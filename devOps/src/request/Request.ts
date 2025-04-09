export interface PetUpdateData {
  id?: number;
  date: string;
  time: string;
  owner: string;
  pet: string;
  pet_name: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://2686-80-64-17-104.ngrok-free.app') {
    this.baseUrl = baseUrl;
  }

  public setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public async postAuth<T>(data: { username: string; password: string }): Promise<T> {
    const endpoint = '/auth';
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    if (responseData.access_token) {
      this.setToken(responseData.access_token);
    }
    return responseData;
  }

  public async getPet<T>(): Promise<T> {
    const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token is missing. Please authenticate first.');
  }
    const endpoint = '/report';
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  public async deletePet<T>(id: number): Promise<T> {
    const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Token is missing. Please authenticate first.');
  }
    const endpoint = '/report';
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  public async updatePet<T>(updatedData: PetUpdateData): Promise<T> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token is missing. Please authenticate first.');
    }
    const endpoint = `/report`;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public async createPet<T>(updatedData: PetUpdateData): Promise<T> {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Token is missing. Please authenticate first.');
    }
    const endpoint = `/report`;
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}