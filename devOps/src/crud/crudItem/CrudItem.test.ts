import { describe, it, expect, vi, beforeEach } from 'vitest'
import { CrudItem } from './CrudItem'

vi.mock('../../request/Request', () => ({
  ApiClient: vi.fn().mockImplementation(() => ({
    createPet: vi.fn().mockResolvedValue({}),
  })),
}))

describe('CrudItem', () => {
  let container: HTMLElement
  let onPetAddedMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onPetAddedMock = vi.fn()
    const crudItem = new CrudItem(onPetAddedMock)
    container = crudItem.getElement()
    document.body.innerHTML = ''
    document.body.append(container)
  })

  it('should render all input fields and button', () => {
    expect(container.querySelectorAll('.crud__field').length).toBe(5)
    expect(container.querySelector('button')?.textContent).toBe('Добавить запись')
  })

  it('should render all input fields and button', () => {
    expect(container.querySelectorAll('.crud__field').length).toBe(5)
    expect(container.querySelector('button')?.textContent).toBe('Добавить запись')
  })

  it('should not call createPet if any field is empty', async () => {
    const button = container.querySelector('button')!
    await button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))

    const { ApiClient } = await import('../../request/Request')
    const mockApiClient = new ApiClient()

    expect(mockApiClient.createPet).not.toHaveBeenCalled()
    expect(onPetAddedMock).not.toHaveBeenCalled()
  })

  
})


