const GetDetailThread = require('../GetDetailThread');

describe('DetailThread entities', () => {
  it('should throw error when payload does not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new GetDetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      threadId: 123,
    };

    // Action and Assert
    expect(() => new GetDetailThread(payload)).toThrowError(
      'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create DetailThread object correctly', () => {
    // Arrange
    const payload = {
      threadId: 'thread-123',
    };

    // Action
    const detailThread = new GetDetailThread(payload);

    // Assert
    expect(detailThread.threadId).toEqual(payload.threadId);
  });
});
