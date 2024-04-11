const AddThread = require('../../Domains/threads/entities/AddThread');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async _validatePayload(id) {
    if (!id) {
      throw new Error('ADD_THREAD.NO_AUTHORIZATION');
    }
  }

  async execute(useCasePayload, id) {
    await this._validatePayload(id);

    const threadData = { owner: id, ...useCasePayload };
    const addThread = new AddThread(threadData);

    return this._threadRepository.addThread(addThread);
  }
}

module.exports = AddThreadUseCase;
