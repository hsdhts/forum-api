const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const createServer = require('../createServer');
const container = require('../../container');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');

describe('/comments endpoint api', () => {
  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /threads/{threadId}/comments', () => {
    let threadId = '';
    let token = '';
    const server = async () => await createServer(container);

    beforeAll(async () => {
        const { server, accessToken, id } = await setupServerAndThread();
        token = accessToken;
        threadId = id;
    });

    async function setupServerAndThread() {
        const serverInstance = await server();
        await addUser(serverInstance);
        const accessToken = await loginUser(serverInstance);
        const id = await addThread(serverInstance, accessToken);
        return { server: serverInstance, accessToken, id };
    }

    async function addUser(server) {
        return await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: 'dicoding2',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
            },
        });
    }

    async function loginUser(server) {
        const loginResponse = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: {
                username: 'dicoding2',
                password: 'secret',
            },
        });
        const { accessToken } = JSON.parse(loginResponse.payload).data;
        return accessToken;
    }

    async function addThread(server, accessToken) {
        const requestPayload = {
            title: 'sebuah title',
            body: 'sebuah body',
        };
        const threadResponse = await server.inject({
            method: 'POST',
            url: '/threads',
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return JSON.parse(threadResponse.payload).data.addedThread.id;
    }

    it('should respond with 201 and persisted comment', async () => {
        const serverInstance = await server();
        const requestPayload = {
            content: 'sebuah content',
        };

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseBody.status).toEqual('success');
        expect(responseBody.data.addedComment).toBeDefined();
    });

    it('should respond with 401 if authentication is missing', async () => {
        const serverInstance = await server();
        const requestPayload = {
            content: 'sebuah content',
        };

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
            payload: requestPayload,
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(401);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('Missing authentication');
    });

    it('should respond with 404 if thread params are incorrect', async () => {
        const serverInstance = await server();
        const requestPayload = {
            content: 'sebuah content',
        };

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/xxx/comments`,
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(404);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('thread tidak ditemukan');
    });

    it('should respond with 400 if payload is missing required property', async () => {
        const serverInstance = await server();
        const requestPayload = {};

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual(
            'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada'
        );
    });

    it('should respond with 400 if payload has incorrect data type', async () => {
        const serverInstance = await server();
        const requestPayload = {
            content: [true, 123],
        };

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual(
            'tidak dapat membuat comment baru karena tipe data tidak sesuai'
        );
    });

    it('should respond with 400 when content is longer than 50 characters', async () => {
        const serverInstance = await server();
        const requestPayload = {
            content:
                'contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent',
        };

        const response = await serverInstance.inject({
            method: 'POST',
            url: `/threads/${threadId}/comments`,
            payload: requestPayload,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual(
            'tidak dapat membuat komentar baru karena karakter judul melebihi batas limit'
        );
    });
});


  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    let commentId = '';
    let threadId = '';
    let token = '';

    beforeEach(async () => {
      // Arrange
      const server = await createServer(container);
      // add user
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'username2',
          password: 'password',
          fullname: 'Husada Hutasoit',
        },
      });
      // login user
      const loginResponse = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'username2',
          password: 'password',
        },
      });
      const {
        data: { accessToken },
      } = JSON.parse(loginResponse.payload);
      token = accessToken;
      // add thread
      const threadPayload = {
        title: 'sebuah title',
        body: 'sebuah body',
      };
      const threadResponse = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: threadPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {
        data: {
          addedThread: { id },
        },
      } = JSON.parse(threadResponse.payload);
      threadId = id;
      // add comment
      const requestPayload = {
        content: 'sebuah content',
      };
      // Action
      const CommentResponse = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const {
        data: { addedComment },
      } = JSON.parse(CommentResponse.payload);
      commentId = addedComment.id;
    });

    it('should response 200 and deleted comment', async () => {
      // Arrange
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 401 if authentication not contain needed property', async () => {
      // Arrange
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('Missing authentication');
    });

    it('should response 404 if comment params not contain needed property', async () => {
      // Arrange
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/xxxx`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('komentar tidak ditemukan');
    });

    it('should response 404 if thread params not contain needed property', async () => {
      // Arrange
      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/xxxx/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('komentar tidak ditemukan');
    });
  });
});
