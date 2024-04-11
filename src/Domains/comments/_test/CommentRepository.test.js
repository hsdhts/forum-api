const CommentRepository = require('../CommentRepository');

describe('CommentRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentRepository = new CommentRepository();

    // Action and Assert
    try {
      await commentRepository.verifyCommentAvailability('');
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }

  
    //
    try {
      await commentRepository.addCommentInThread({});
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }

    try {
      await commentRepository.getCommentInThread('');
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }

    //
    try {
      await commentRepository.verifyCommentOwnership('');
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }
    //

    try {
      await commentRepository.deleteCommentInThread('');
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }
  });
});
