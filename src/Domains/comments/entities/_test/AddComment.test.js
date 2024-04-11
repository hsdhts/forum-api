const AddComment = require('../AddComment');

describe('AddComment entities', () => {
  const payloadWithoutProperty = {
    threadId: 'thread-123',
    owner: 'user-123',
  };

  const payloadWithInvalidDataType = {
    threadId: 'thread-123',
    content: true,
    owner: 123,
  };

  const payloadWithExcessiveContent = {
    threadId: 'thread-123',
    owner: 'user-123',
    content:
      'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent',
  };

  const payloadCorrect = {
    threadId: 'thread-123',
    content: 'sebuah content',
    owner: 'user-123',
  };

  it('should throw error when payload does not contain needed property', () => {
    // Action & Assert
    expect(() => new AddComment(payloadWithoutProperty)).toThrowError(
      'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Action & Assert
    expect(() => new AddComment(payloadWithInvalidDataType)).toThrowError(
      'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should throw error when content contains more than 100 characters', () => {
    // Action and Assert
    expect(() => new AddComment(payloadWithExcessiveContent)).toThrowError(
      'ADD_COMMENT.CONTENT_LIMIT_CHAR'
    );
  });

  it('should create AddComment entities correctly', () => {
    // Action
    const addComment = new AddComment(payloadCorrect);

    // Assert
    expect(addComment.threadId).toEqual(payloadCorrect.threadId);
    expect(addComment.content).toEqual(payloadCorrect.content);
    expect(addComment.owner).toEqual(payloadCorrect.owner);
  });
});
