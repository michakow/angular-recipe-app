import { UppercaseFirstLetterPipe } from './uppercase-first-letter.pipe';

describe('UppercaseFirstLetterPipe', () => {
  it('create an instance', () => {
    const pipe = new UppercaseFirstLetterPipe();
    expect(pipe).toBeTruthy();
  });
});
