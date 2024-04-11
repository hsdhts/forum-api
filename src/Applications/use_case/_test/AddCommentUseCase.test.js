const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddCommentUseCase = require('../AddCommentUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('AddCommentUseCase', () => {
  it('should orchestrate the add comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'sebuah content',
      owner: 'user-123',
    };
    const expectedComment = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'sebuah content',
      owner: 'user-123',
    };

    // creating dependency of use case
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    // mocking needed function
    mockThreadRepository.verifyThreadAvailability = jest.fn().mockResolvedValue();
    mockCommentRepository.addCommentInThread = jest.fn().mockResolvedValue({
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'sebuah content',
      owner: 'user-123',
    });

    // creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(
      useCasePayload,
      useCasePayload.owner,
      'thread-123'
    );

    // Assert
    expect(addedComment).toMatchObject(expectedComment);
    expect(mockThreadRepository.verifyThreadAvailability).toHaveBeenCalledWith('thread-123');
    expect(mockCommentRepository.addCommentInThread).toHaveBeenCalledWith(
      new AddComment({
        threadId: 'thread-123',
        content: 'sebuah content',
        owner: 'user-123',
      })
    );
  });

  it('should throw error if user id undefined', async () => {
    // Arrange
    const useCasePayload = {
      content: 'sebuah content',
    };

    // creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    });

    // Action & Assert
    await expect(
      addCommentUseCase.execute(useCasePayload, undefined, 'thread-123')
    ).rejects.toThrowError('ADD_COMMENT.NO_AUTHORIZATION');
  });

  it('should throw error if thread id undefined', async () => {
    // Arrange
    const useCasePayload = {
      content: 'sebuah content',
      owner: 'user-123',
    };

    // creating use case instance
    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: new CommentRepository(),
      threadRepository: new ThreadRepository(),
    });

    // Assert
    await expect(
      addCommentUseCase.execute(useCasePayload, useCasePayload.owner, undefined)
    ).rejects.toThrowError('ADD_COMMENT.NO_PARAMS');
  });
});
