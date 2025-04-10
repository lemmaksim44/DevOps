import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PetItem } from './PetItem';
import { ApiClient } from '../../request/Request';

// Создаем моки
const mockDeletePet = vi.fn().mockResolvedValue(true);
const mockUpdatePet = vi.fn().mockResolvedValue({
  id: 1,
  owner: 'Jane',
  pet_name: 'Fluffy',
  pet: 'Cat',
  date: '2025-05-10',
  time: '15:30',
});

// Мокаем модуль Request
vi.mock('../../request/Request', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    deletePet: mockDeletePet,
    updatePet: mockUpdatePet,
  })),
}));

describe('PetItem', () => {
  let petItem: PetItem;
  let container: HTMLElement;
  const onDelete = vi.fn();

  beforeEach(() => {
    petItem = new PetItem(
      1,
      'John',
      'Rex',
      'Dog',
      '2025-04-09',
      '10:00',
      '/edit-icon.png',
      '/delete-icon.png',
      onDelete
    );

    container = document.createElement('div');
    container.appendChild(petItem.getElement());
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    vi.clearAllMocks(); // чистим моки после каждого теста
  });

  it('should render pet information correctly', () => {
    const ownerElement = container.querySelector('p:nth-child(1)');
    expect(ownerElement).not.toBeNull();
    if (ownerElement) {
      expect(ownerElement.textContent).toBe('Владелец: John');
    }
  
    const petNameElement = container.querySelector('p:nth-child(2)');
    expect(petNameElement).not.toBeNull();
    if (petNameElement) {
      expect(petNameElement.textContent).toBe('Кличка питомца: Rex');
    }
  
    const petTypeElement = container.querySelector('p:nth-child(3)');
    expect(petTypeElement).not.toBeNull();
    if (petTypeElement) {
      expect(petTypeElement.textContent).toBe('Питомец: Dog'); // Изменил на "Питомец"
    }
  
    const dateElement = container.querySelector('p:nth-child(4)');
    expect(dateElement).not.toBeNull();
    if (dateElement) {
      expect(dateElement.textContent).toBe('Дата: 2025-04-09');
    }
  
    const timeElement = container.querySelector('p:nth-child(5)');
    expect(timeElement).not.toBeNull();
    if (timeElement) {
      expect(timeElement.textContent).toBe('Время: 10:00');
    }
  });    

  it('should call deletePet and onDelete callback on delete icon click', async () => {
    const deleteIcon = container.querySelector('img[alt="Удалить"]') as HTMLImageElement;
    expect(deleteIcon).toBeTruthy();

    deleteIcon.click();

    await Promise.resolve(); // Ждем асинхронного выполнения

    expect(mockDeletePet).toHaveBeenCalledWith(1);
    expect(onDelete).toHaveBeenCalled();
  });

  it('should enter edit mode on edit icon click', () => {
    const editIcon = container.querySelector('img[alt="Редактировать"]') as HTMLImageElement;
    expect(editIcon).toBeTruthy();

    editIcon.click();

    const form = container.querySelector('.edit-form');
    expect(form).not.toBeNull();

    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('should save updated data on save button click', async () => {
    const editIcon = container.querySelector('img[alt="Редактировать"]') as HTMLImageElement;
    editIcon.click();

    const ownerInput = container.querySelector('input[name="owner"]') as HTMLInputElement;
    ownerInput.value = 'Jane';

    const saveButton = container.querySelector('button') as HTMLButtonElement;
    saveButton.click();

    await Promise.resolve(); // Ждем асинхронного выполнения

    expect(mockUpdatePet).toHaveBeenCalledWith({
      id: 1,
      owner: 'Jane',
      pet_name: 'Rex',
      pet: 'Dog',
      date: '2025-04-09',
      time: '10:00',
    });
  });
});
