// @ts-ignore
import './PetItem.css'
import { Img } from '../../img/Img';
export class PetItem {
  private petElement: HTMLElement;

  constructor(
    private owner: string,
    private petName: string,
    private species: string,
    private date: string,
    private time: string,
    private description: string,
    private editIconSrc: string,
    private deleteIconSrc: string
  ) {
    this.petElement = this.createPetElement();
  }

  private createPetElement(): HTMLElement {
    const petCard = document.createElement('div');
    petCard.classList.add('pet__card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('pet__card-content');

    cardContent.innerHTML = `
      <p><strong>Владелец:</strong> ${this.owner}</p>
      <p><strong>Кличка питомца:</strong> ${this.petName}</p>
      <p><strong>Питомец:</strong> ${this.species}</p>
      <p><strong>Дата:</strong> ${this.date}</p>
      <p><strong>Время:</strong> ${this.time}</p>
    `;
    const descriptionField = document.createElement('textarea');
    descriptionField.classList.add('pet__description');
    descriptionField.value = this.description;
    descriptionField.addEventListener('input', (event) => {
      this.description = (event.target as HTMLTextAreaElement).value;
    });

    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('pet__icons');

    const editIcon = new Img(this.editIconSrc, 'Редактировать').getImageElement();
    const deleteIcon = new Img(this.deleteIconSrc, 'Удалить').getImageElement();
    iconsContainer.append(editIcon, deleteIcon);

    // Добавляем всё в карточку
    petCard.append(cardContent, descriptionField, iconsContainer);
    return petCard;
  }

  public getElement(): HTMLElement {
    return this.petElement;
  }
}
