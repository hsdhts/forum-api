const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
 
describe('CommentRepositoryPostgres', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });
 
  afterAll(async () => {
    await pool.end();
  });
 
  describe('verifyCommentAvailability', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
    });
 
    it('should throw NotFoundError when comment not available', async () => {
      // Arrange
      const commentRepository = new CommentRepositoryPostgres(pool, {});
  
      // Action & Assert
      await expect(commentRepository.verifyCommentAvailability('thread-123', 'comment-123'))
        .rejects.toThrowError(NotFoundError);
    });
 
    it('should return comment when available', async () => {
      // Arrange
      const commentRepository = new CommentRepositoryPostgres(pool, {});
    
      // Add a comment to the database
      await CommentsTableTestHelper.addCommentInThread({ id: 'comment-123', threadId: 'thread-123', content: 'Sample content', owner: 'user-123' });
    
      // Action
      const comment = await commentRepository.verifyCommentAvailability('thread-123', 'comment-123');
    
      // Assert
      expect(comment.id).toBe('comment-123');
      expect(comment.threadId).toBe('thread-123');
      expect(comment.content).toBe('Sample content');
      expect(comment.owner).toBe('user-123');
    });
    
  });
 
  describe('verifyCommentOwnership', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addCommentInThread({ id: 'comment-123', threadId: 'thread-123', content: 'Sample content', owner: 'user-123' });
    });
 
    it('should throw AuthorizationError when comment ownership is not verified', async () => {
      // Arrange
      const commentRepository = new CommentRepositoryPostgres(pool, {});
 
      // Action & Assert
      await expect(commentRepository.verifyCommentOwnership('invalid-comment-id', 'invalid-owner-id', 'invalid-thread-id'))
        .rejects.toThrowError(AuthorizationError);
    });
 
    it('should not throw error when comment ownership is verified', async () => {
      // Arrange
      const commentRepository = new CommentRepositoryPostgres(pool, {});
 
      // Action & Assert
      await expect(commentRepository.verifyCommentOwnership('comment-123', 'user-123', 'thread-123')).resolves.not.toThrow(AuthorizationError);
    });
  });
  
 
  describe('addCommentInThread', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
    });
 
    it('should persist add thread and return added comment correctly', async () => {
      // Arrange
      const addComment = { threadId: 'thread-123', content: 'sebuah content', owner: 'user-123' };
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
 
      // Action
      const resultAddComment = await commentRepository.addCommentInThread(addComment);
      const comments = await CommentsTableTestHelper.getDetailComment(resultAddComment.id);
 
      // Assert
      expect(resultAddComment).toEqual({ ...addComment, id: 'comment-123' });
      expect(comments).toHaveLength(1);
    });
  });
 
  describe('getCommentInThread', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
      await CommentsTableTestHelper.addCommentInThread({ id: 'comment-123', threadId: 'thread-123', content: 'Sample content', owner: 'user-123' });
    });
  
    it('should return all comments in a thread', async () => {
      // Arrange
      const commentRepository = new CommentRepositoryPostgres(pool, {});
  
      // Action
      const comments = await commentRepository.getCommentInThread({ threadId: 'thread-123' });
  
      // Assert
      expect(comments).toHaveLength(1);
      expect(comments[0].id).toEqual('comment-123');
      expect(comments[0].content).toEqual('Sample content');
      expect(comments[0].username).toEqual('dicoding');
      expect(comments[0].date instanceof Date).toBe(true);
      expect(comments[0].is_delete).toBeNull();
    });
  });
  
  describe('deleteCommentInThread', () => {
    beforeEach(async () => {
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123' });
    });
  
    it('should mark comment as deleted in the database', async () => {
      // Arrange
      const addComment = { threadId: 'thread-123', content: 'sebuah content', owner: 'user-123' };
      const fakeIdGenerator = () => '123'; // stub!
      const commentRepository = new CommentRepositoryPostgres(pool, fakeIdGenerator);
      await commentRepository.addCommentInThread(addComment);
  
      // Action
      await commentRepository.deleteCommentInThread({ threadId: 'thread-123', commentId: 'comment-123', owner: 'user-123' });
      const comments = await CommentsTableTestHelper.getDetailComment('comment-123');
  
      // Assert
      expect(comments[0].is_delete).toContain('1');
    });
  });
  
});