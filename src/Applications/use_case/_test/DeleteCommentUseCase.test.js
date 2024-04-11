const DeleteComment = require('../../../Domains/comments/entities/DeleteComment');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should orchestrate the delete comment action correctly', async () => {
    // Arrange
    const idUser = {
      id: 'user-123',
    };

    const useCaseParams = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    // creating dependency of use case
    const mockCommentRepository = new CommentRepository();

    // mocking needed function
    mockCommentRepository.verifyCommentOwnership = jest
      .fn()
      .mockResolvedValue();
    mockCommentRepository.verifyCommentAvailability = jest
      .fn()
      .mockResolvedValue({
        id: 'comment-123',
        threadId: 'thread-123',
        content: 'Sample content',
        owner: 'user-123',
        is_delete: null,
        createdAt: new Date()
  });
    mockCommentRepository.deleteCommentInThread = jest
      .fn()
      .mockResolvedValue();

    // creating use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(deleteCommentUseCase.execute({
      id: idUser.id,
      threadId: useCaseParams.threadId,
      commentId: useCaseParams.commentId,
    })).resolves.not.toThrow();
    
    expect(mockCommentRepository.verifyCommentOwnership).toHaveBeenCalledWith(
      useCaseParams.commentId,
      idUser.id,
      useCaseParams.threadId,
    );
    
    expect(mockCommentRepository.verifyCommentAvailability).toHaveBeenCalledWith(
      useCaseParams.threadId,
      useCaseParams.commentId,
    );
    expect(mockCommentRepository.deleteCommentInThread).toHaveBeenCalledWith(
      new DeleteComment({
        owner: idUser.id,
        threadId: useCaseParams.threadId,
        commentId: useCaseParams.commentId,
      })
    );
  });

  it('should throw error if authorization undefined', async () => {
    // Arrange
    const idUser = {};

    const useCaseParams = {
      threadId: 'thread-123',
      commentId: 'comment-123',
    };

    // creating dependency of use case
    const mockCommentRepository = new CommentRepository();

    // creating use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute({
        id: idUser.id,
        threadId: useCaseParams.threadId,
        commentId: useCaseParams.commentId,
      })
    ).rejects.toThrowError('DELETE_COMMENT.NO_AUTHORIZATION');
  });

  it('should throw error if threadId undefined', async () => {
    // Arrange
    const idUser = {
      id: 'user-123',
    };

    const useCaseParams = {
      commentId: 'comment-123',
    };

    // creating dependency of use case
    const mockCommentRepository = new CommentRepository();

    // creating use case instance
    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
    });

    // Action & Assert
    await expect(
      deleteCommentUseCase.execute({
        id: idUser.id,
        threadId: useCaseParams.threadId,
        commentId: useCaseParams.commentId,
      })
    ).rejects.toThrowError('DELETE_COMMENT.NO_PARAMS');
  });
});

