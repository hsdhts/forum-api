const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action and Assert
    try {
      await threadRepository.verifyThreadAvailability({});
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }

    try {
      await threadRepository.addThread({});
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }

    try {
      await threadRepository.getDetailThread('');
    } catch (error) {
      expect(error).toHaveProperty(
        'message',
        'THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED'
      );
    }
  });
});
