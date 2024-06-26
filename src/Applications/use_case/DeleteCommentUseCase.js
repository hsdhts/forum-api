const DeleteComment = require('../../Domains/comments/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ commentRepository, authenticationTokenManager }) {
    this._commentRepository = commentRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async _validatePayload({ id, threadId, commentId }) {
    if (!id) {
      throw new Error('DELETE_COMMENT.NO_AUTHORIZATION');
    }
    if (!threadId || !commentId) {
      throw new Error('DELETE_COMMENT.NO_PARAMS');
    }
  }

  async execute({ id, threadId, commentId }) {
    await this._validatePayload({ id, threadId, commentId });

    const deleteComment = new DeleteComment({ owner: id, threadId, commentId });

    await this._commentRepository.verifyCommentAvailability(threadId, commentId);
    await this._commentRepository.verifyCommentOwnership(commentId, id, threadId);
    await this._commentRepository.deleteCommentInThread(deleteComment);
  }
}

module.exports = DeleteCommentUseCase;
