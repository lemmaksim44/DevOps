import { describe, it, expect, beforeEach } from 'vitest';
import { PetsContainer } from './Pets';
import { PetItem } from './petItem/PetItem';

class MockApiClient {
  getPet = async () => [
    { id: 1, owner: 'John', pet_name: 'Rex', pet: 'Dog', date: '2025-04-09', time: '10:00' },
    { id: 2, owner: 'Sarah', pet_name: 'Whiskers', pet: 'Cat', date: '2025-04-10', time: '11:00' }
  ];
}

describe('PetsContainer', () => {
  let petsContainer: PetsContainer;
  let apiClient: MockApiClient;

  beforeEach(() => {
    apiClient = new MockApiClient();

    petsContainer = new PetsContainer();
    document.body.appendChild(petsContainer.getPetsElement());

    petsContainer['loadPets'] = async function () {
      const petsData = await apiClient.getPet();
      this.petsCardsContainer.innerHTML = '';
      this.pets = [];

      petsData.forEach(pet => {
        this.addPet(
          pet.id,
          pet.owner,
          pet.pet_name,
          pet.pet,
          pet.date,
          pet.time,
          '/./pencil.png',
          './bin.png'
        );
      });
    };
  });

  it('should create a pets container', () => {
    const petsElement = petsContainer.getPetsElement();
    expect(petsElement).toBeTruthy();
    expect(petsElement.classList.contains('pets__container')).toBe(true);
  });

  it('should remove a pet from the container', () => {
    const pet = new PetItem(1, 'John', 'Rex', 'Dog', '2025-04-09', '10:00', '/pencil.png', '/bin.png', () => {});

    petsContainer.addPet(1, 'John', 'Rex', 'Dog', '2025-04-09', '10:00', '/pencil.png', '/bin.png');
    petsContainer['removePet'](pet);

    const petCards = petsContainer.getPetsElement().querySelectorAll('.pets__cards-container .pet-item');
    expect(petCards.length).toBe(0);
  });
});
