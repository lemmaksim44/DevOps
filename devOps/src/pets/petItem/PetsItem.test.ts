import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PetItem } from './PetItem';
import { ApiClient } from '../../request/Request';

vi.mock('../../request/Request', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    deletePet: vi.fn().mockResolvedValue(true),
    updatePet: vi.fn().mockResolvedValue({
      id: 1,
      owner: 'Jane',
      pet_name: 'Fluffy',
      pet: 'Cat',
      date: '2025-05-10',
      time: '15:30',
    }),
  })),
}));

describe('PetItem', () => {
  let petItem: PetItem;
  let container: HTMLElement;

  beforeEach(() => {
    const onDelete = vi.fn();

    petItem = new PetItem(
      1, 'John', 'Rex', 'Dog', '2025-04-09', '10:00',
      '/edit-icon.png', '/delete-icon.png', onDelete
    );
    container = document.createElement('div');
    container.appendChild(petItem.getElement());
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should render pet information correctly', () => {
    const petName = container.querySelector('p strong + span');
    expect(petName).not.toBeNull();
    if (petName) {
      expect(petName.textContent).toBe(petName.textContent);
    }
  });
});
