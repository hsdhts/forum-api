const GetDetailThread = require('../../Domains/threads/entities/GetDetailThread');

class GetDetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async _filterToDeletedComment(comment) {
    if (comment.is_delete === '1') {
      comment.content = '**komentar telah dihapus**';
    }
    delete comment.is_delete;

    return comment;
  }

  async execute(useCaseParams) {
    const detailThreadID = new GetDetailThread(useCaseParams);

    const thread = await this._threadRepository.getDetailThread(detailThreadID);

    const comments = await this._commentRepository.getCommentInThread(
      detailThreadID
    );

    const filteredToComments = await Promise.all(
      comments.map(async (comment) => {
        return this._filterToDeletedComment(comment);
      })
    );

    return {
      id: thread.id,
      title: thread.title,
      body: thread.body,
      date: thread.date,
      username: thread.username,
      comments: filteredToComments,
    };
  }
}

module.exports = GetDetailThreadUseCase;
