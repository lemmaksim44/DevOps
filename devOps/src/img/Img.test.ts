import { describe, it, expect, beforeEach } from 'vitest';
import { Img } from './Img';

describe('Img', () => {
  let img: Img;

  beforeEach(() => {
    img = new Img('https://example.com/image.jpg', 'Example Image');
  });

  it('should create an image element with the correct src, alt, and class', () => {
    const imgElement = img.getImageElement();
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toBe('https://example.com/image.jpg');
    expect(imgElement.getAttribute('alt')).toBe('Example Image');
    expect(imgElement.classList.contains('form-image')).toBe(true);
  });

  it('should return the correct image element from getImageElement', () => {
    const imgElement = img.getImageElement();
    expect(imgElement.tagName).toBe('IMG');
  });
});
