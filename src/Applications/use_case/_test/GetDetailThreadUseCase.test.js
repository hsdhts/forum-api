const GetDetailThread = require('../../../Domains/threads/entities/GetDetailThread');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');
const DetailThreadUseCase = require('../GetDetailThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');

describe('DetailThreadUseCase', () => {
  const mockThreadRepository = new ThreadRepository();
  const mockCommentRepository = new CommentRepository();
  const useCasePayload = { threadId: 'thread-123' };

  beforeEach(() => {
    // Perbaikan di sini: Mock function menggunakan jest.fn()
    mockThreadRepository.getDetailThread = jest.fn().mockResolvedValue({
      id: 'thread-123',
      title: 'sebuah title',
      body: 'sebuah body',
      date: '2024-04-04',
      username: 'user-123',
    });

    // Perbaikan di sini: Mock function menggunakan jest.fn()
    mockCommentRepository.getCommentInThread = jest.fn().mockResolvedValue([
      {
        id: 'comment-123',
        username: 'user-123',
        content: 'sebuah content',
        is_delete: [],
        date: '2024-04-04',
      },
      {
        id: 'comment-234',
        username: 'user-1234',
        content: 'ini content',
        is_delete: '1',
        date: '2024-04-04',
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not show deleted comment', async () => {
    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const result = await getDetailThreadUseCase.execute(useCasePayload);

    expect(result).toMatchSnapshot();
    expect(mockThreadRepository.getDetailThread).toHaveBeenCalledWith(
      new GetDetailThread(useCasePayload)
    );
    expect(mockCommentRepository.getCommentInThread).toHaveBeenCalledWith(
      new GetDetailThread(useCasePayload)
    );
  });

  it('should orchestrating the add thread action correctly', async () => {
    const getDetailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const detailThread = await getDetailThreadUseCase.execute(useCasePayload);

    expect(detailThread).toMatchSnapshot();
    expect(mockThreadRepository.getDetailThread).toHaveBeenCalledWith(
      new GetDetailThread(useCasePayload)
    );
    expect(mockCommentRepository.getCommentInThread).toHaveBeenCalledWith(
      new GetDetailThread(useCasePayload)
    );
  });
});
