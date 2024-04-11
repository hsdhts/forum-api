const DeleteComment = require('../DeleteComment');

describe('DeleteComment entities', () => {
  const payloadWithoutProperty = {
    threadId: 'thread-123',
    owner: 'user-123',
  };

  const payloadWithInvalidDataType = {
    commentId: 'comment-123',
    threadId: true,
    owner: 123,
  };

  const payloadCorrect = {
    commentId: 'comment-123',
    threadId: 'thread-123',
    owner: 'user-123',
  };

  it('should throw error when payload does not contain needed property', () => {
    // Action & Assert
    expect(() => new DeleteComment(payloadWithoutProperty)).toThrowError(
      'DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload not meet data type specification', () => {
    // Action & Assert
    expect(() => new DeleteComment(payloadWithInvalidDataType)).toThrowError(
      'DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create DeleteComment entities correctly', () => {
    // Action
    const deleteComment = new DeleteComment(payloadCorrect);

    // Assert
    expect(deleteComment.commentId).toEqual(payloadCorrect.commentId);
    expect(deleteComment.threadId).toEqual(payloadCorrect.threadId);
    expect(deleteComment.owner).toEqual(payloadCorrect.owner);
  });
});
