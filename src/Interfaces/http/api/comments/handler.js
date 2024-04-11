const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const AuthenticationTokenManager = require('../../../../Applications/security/AuthenticationTokenManager');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const { authorization } = request.headers;
    const { threadId } = request.params;

    const { id } = await this._verifyToken(authorization);
    const addedComment = await this._addComment(request.payload, id, threadId);

    return this._createResponse(h, addedComment);
  }

  async deleteCommentHandler(request, h) {
    const { authorization } = request.headers;
    const { threadId, commentId } = request.params;

    const { id } = await this._verifyToken(authorization);
    await this._deleteComment({ id, threadId, commentId });

    return this._createSuccessResponse(h);
  }

  async _verifyToken(authorization) {
    const authentication = this._container.getInstance(
      AuthenticationTokenManager.name
    );
    return authentication.verifyTokenFromHeader(authorization);
  }

  async _addComment(payload, userId, threadId) {
    const addCommentUseCase = this._container.getInstance(
      AddCommentUseCase.name
    );
    return addCommentUseCase.execute(payload, userId, threadId);
  }

  async _deleteComment({ id, threadId, commentId }) {
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );
    return deleteCommentUseCase.execute({ id, threadId, commentId });
  }

  _createResponse(h, addedComment) {
    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    response.code(201);
    return response;
  }

  _createSuccessResponse(h) {
    const response = h.response({
      status: 'success',
    });
    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
