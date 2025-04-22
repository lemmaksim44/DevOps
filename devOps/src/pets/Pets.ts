// @ts-ignore
import './Pets.css';
import { PetItem } from './petItem/PetItem';
import { Crud } from '../crud/Crud';
import { ApiClient } from '../request/Request';

export class PetsContainer {
  protected petsContainer: HTMLElement;
  protected petsCardsContainer: HTMLElement;
  protected pets: PetItem[] = [];
  private crud: Crud;

  constructor() {
    this.petsContainer = this.createPetsContainer();
    this.petsCardsContainer = this.createCardsContainer();
    this.crud = new Crud(() => this.loadPets());

    this.petsContainer.append(this.petsCardsContainer, this.crud.getCrudElement());
  }

  private createPetsContainer(): HTMLElement {
    const petsContainer = document.createElement('div');
    petsContainer.classList.add('pets__container');
    return petsContainer;
  }

  private createCardsContainer(): HTMLElement {
    const container = document.createElement('div');
    container.classList.add('pets__cards-container');
    container.scrollTop = 1;
    return container;
  }

  public addPet(
    id: number,
    owner: string,
    petName: string,
    species: string,
    date: string,
    time: string,
    editIconSrc: string,
    deleteIconSrc: string
  ): void {
    const pet = new PetItem(
      id,
      owner,
      petName,
      species,
      date,
      time,
      editIconSrc,
      deleteIconSrc,
      () => this.removePet(pet)
    );
    this.pets.push(pet);
    this.petsCardsContainer.append(pet.getElement());
  }

  public getPetsElement(): HTMLElement {
    return this.petsContainer;
  }

  private removePet(pet: PetItem): void {
    const index = this.pets.indexOf(pet);
    if (index > -1) {
      this.pets.splice(index, 1);
      pet.getElement().remove();
    }
  }

  public async loadPets(): Promise<void> {
    const apiClient = new ApiClient();
    try {
      const petsData = await apiClient.getPet<Array<any>>();
      this.petsCardsContainer.innerHTML = '';
      this.pets = []

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

    } catch (error) {
      console.error('Error downling data:', error);
    }
  }
}
