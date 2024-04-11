const AddThread = require('../../../Domains/threads/entities/AddThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah title',
      body: 'sebuah body',
      owner: 'user-123',
    };
    const idUser = {
      id: 'user-123',
    };
    const expectedToThread = {
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      owner: 'user-123',
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.addThread = jest.fn().mockImplementation(() =>
      Promise.resolve({
        id: 'thread-123',
        title: 'sebuah title',
        body: 'sebuah body',
        owner: 'user-123',
      })
    );

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addedThread = await getThreadUseCase.execute(
      useCasePayload,
      idUser.id
    );

    // Assert
    expect(addedThread).toStrictEqual(expectedToThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      })
    );
  });

  it('should orchestrating the add thread action no contain authorization', async () => {
    // Arrange
    const useCasePayload = {
      title: 'sebuah title',
      body: 'sebuah body',
    };

    const idUser = {};

    const mockThreadRepository = new ThreadRepository();

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    await expect(
      getThreadUseCase.execute(useCasePayload, idUser.id)
    ).rejects.toThrowError('ADD_THREAD.NO_AUTHORIZATION');
  });
});
