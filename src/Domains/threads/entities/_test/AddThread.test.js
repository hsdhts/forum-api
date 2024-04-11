const AddThread = require('../AddThread');

describe('AddThread entities', () => {
  const payload = {
    title: 'Sebuah Title',
    body: 'Sebuah Body',
    owner: 'user-123',
  };

  it.each([
    [undefined, 'Cannot destructure property'],
    [{ body: 'sebuah body' }, 'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'],
    [{ title: 123, body: 'sebuah body', owner: 'user-123' }, 'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'],
    [{ title: 'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle', body: 'Sebuah Body', owner: 'user-123' }, 'ADD_THREAD.TITLE_LIMIT_CHAR'],
  ])('should throw error when payload is %p', (payload, errorMessage) => {
    expect(() => new AddThread(payload)).toThrowError(errorMessage);
  });
  

  it('should create AddThread object correctly', () => {
    const addThread = new AddThread(payload);

    expect(addThread).toEqual(payload);
  });
});
