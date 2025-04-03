// @ts-ignore
import './Pets.css';
import { PetItem } from './petItem/PetItem';
import { Crud } from '../crud/Crud';

export class PetsContainer {
  private petsContainer: HTMLElement;
  private pets: PetItem[] = [];
  private crud: Crud;

  constructor() {
    this.petsContainer = this.createPetsContainer();
    this.crud = new Crud();
  }

  private createPetsContainer(): HTMLElement {
    const petsContainer = document.createElement('div');
    petsContainer.classList.add('pets__container');
    return petsContainer;
  }

  public addPet(
    owner: string,
    petName: string,
    species: string,
    date: string,
    time: string,
    description: string,
    editIconSrc: string,
    deleteIconSrc: string
  ): void {
    const pet = new PetItem(owner, petName, species, date, time, description, editIconSrc, deleteIconSrc);
    this.pets.push(pet);
    this.petsContainer.append(pet.getElement());

    const crudContainer = this.crud.getPetsElement();
    this.petsContainer.append(crudContainer)
  }

  public getPetsElement(): HTMLElement {
    return this.petsContainer;
  }
}
