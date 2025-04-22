// @ts-ignore
import './PetItem.css'
import { Img } from '../../img/Img';
import { ApiClient } from '../../request/Request';
import { PetUpdateData } from '../../request/Request';

export class PetItem {
  private petElement: HTMLElement;
  private apiClient: ApiClient;
  private editIcon!: HTMLImageElement;

  constructor(
    private id: number,
    private owner: string,
    private petName: string,
    private species: string,
    private date: string,
    private time: string,
    private editIconSrc: string,
    private deleteIconSrc: string,
    private onDelete: () => void
  ) {
    this.apiClient = new ApiClient();
    this.petElement = this.createPetElement();
  }

  private createPetElement(): HTMLElement {
    const petCard = document.createElement('div');
    petCard.classList.add('pet__card');

    const cardContent = document.createElement('div');
    cardContent.classList.add('pet__card-content');

    const ownerP = document.createElement('p');
    ownerP.innerHTML = `<strong>Владелец:</strong> <span>${this.owner}</span>`;

    const petNameP = document.createElement('p');
    petNameP.innerHTML = `<strong>Кличка питомца:</strong> <span>${this.petName}</span>`;

    const speciesP = document.createElement('p');
    speciesP.innerHTML = `<strong>Питомец:</strong> <span>${this.species}</span>`;

    const dateP = document.createElement('p');
    dateP.innerHTML = `<strong>Дата:</strong> <span>${this.date}</span>`;

    const timeP = document.createElement('p');
    timeP.innerHTML = `<strong>Время:</strong> <span>${this.time}</span>`;

    cardContent.append(ownerP, petNameP, speciesP, dateP, timeP);
    const iconsContainer = document.createElement('div');
    iconsContainer.classList.add('pet__icons');

    this.editIcon = new Img(this.editIconSrc, 'Редактировать').getImageElement() as HTMLImageElement;
    const deleteIcon = new Img(this.deleteIconSrc, 'Удалить').getImageElement();

    this.editIcon.addEventListener('click', () => {
      this.enableEditMode();
    });

    deleteIcon.addEventListener('click', async () => {
      try {
        await this.apiClient.deletePet(this.id);
        this.onDelete();
      } catch (error) {
        console.error('Error delete:', error);
      }
    });

    iconsContainer.append(this.editIcon, deleteIcon);
    petCard.append(cardContent, iconsContainer);
    return petCard;
  }

  private enableEditMode() {
    const fields = [
      { label: 'Владелец:', value: this.owner, name: 'owner' },
      { label: 'Кличка питомца:', value: this.petName, name: 'petName' },
      { label: 'Питомец:', value: this.species, name: 'species' },
      { label: 'Дата:', value: this.date, name: 'date' },
      { label: 'Время:', value: this.time, name: 'time' },
    ];

    const editForm = document.createElement('div');
    editForm.classList.add('edit-form');

    fields.forEach(field => {
      const fieldContainer = document.createElement('div');
      fieldContainer.classList.add('edit-field');

      const label = document.createElement('label');
      label.textContent = field.label;

      const input = document.createElement('input');
      input.name = field.name;
      input.type = field.label === 'Дата:' ? 'date' : field.label === 'Время:' ? 'time' : 'text';
      input.value = field.value;

      fieldContainer.append(label, input);
      editForm.append(fieldContainer);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Сохранить';
    saveButton.addEventListener('click', () => {
      this.saveUpdatedData(editForm);
    });

    editForm.append(saveButton);
    this.petElement.innerHTML = '';
    this.petElement.append(editForm);
  }

  private async saveUpdatedData(editForm: HTMLElement) {
    const updatedData: PetUpdateData = {
      id: this.id,
      owner: (editForm.querySelector('input[name="owner"]') as HTMLInputElement)?.value || '',
      pet_name: (editForm.querySelector('input[name="petName"]') as HTMLInputElement)?.value || '',
      pet: (editForm.querySelector('input[name="species"]') as HTMLInputElement)?.value || '',
      date: (editForm.querySelector('input[name="date"]') as HTMLInputElement)?.value || '',
      time: (editForm.querySelector('input[name="time"]') as HTMLInputElement)?.value || '',
    };

    try {
      const updatedPet = await this.apiClient.updatePet(updatedData) as PetUpdateData;;
      this.updatePetCard(updatedPet);
      this.exitEditMode();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  }

  /*
  private exitEditMode() {
    this.petElement.innerHTML = '';
    const petCard = this.createPetElement();
    this.petElement.append(petCard);
  }
  */

  private exitEditMode() {
    const petCard = this.createPetElement();
    this.petElement.replaceWith(petCard); // Заменяем текущий элемент полностью
    this.petElement = petCard; // Обновляем ссылку
  }

  private updatePetCard(updatedPet: PetUpdateData) {
    this.owner = updatedPet.owner;
    this.petName = updatedPet.pet_name;
    this.species = updatedPet.pet;
    this.date = updatedPet.date;
    this.time = updatedPet.time;

    const ownerP = this.petElement.querySelector('p strong')?.parentElement?.querySelector('span');
    const petNameP = this.petElement.querySelector('p strong')?.parentElement?.querySelector('span');
    const speciesP = this.petElement.querySelector('p strong')?.parentElement?.querySelector('span');
    const dateP = this.petElement.querySelector('p strong')?.parentElement?.querySelector('span');
    const timeP = this.petElement.querySelector('p strong')?.parentElement?.querySelector('span');

    if (ownerP && petNameP && speciesP && dateP && timeP) {
      ownerP.textContent = updatedPet.owner;
      petNameP.textContent = updatedPet.pet_name;
      speciesP.textContent = updatedPet.pet;
      dateP.textContent = updatedPet.date;
      timeP.textContent = updatedPet.time;
    }
  }

  public getElement(): HTMLElement {
    return this.petElement;
  }
}
