const createServer = require('../createServer');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const pool = require('../../database/postgres/pool');
const container = require('../../container');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');

describe('/threads endpoint api', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST /threads', () => {
    let token = '';
    const server = async () => await createServer(container);

    beforeAll(async () => {
        const { server, accessToken } = await setupServerAndUser();
        token = accessToken;
    });

    async function setupServerAndUser() {
        const serverInstance = await server();
        const accessToken = await addUser(serverInstance);
        return { server: serverInstance, accessToken };
    }

    async function addUser(server) {
        await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                username: 'username2',
                password: 'password',
                fullname: 'Husada Hutasoit',
            },
        });
        const loginResponse = await server.inject({
            method: 'POST',
            url: '/authentications',
            payload: {
                username: 'username2',
                password: 'password',
            },
        });
        const { accessToken } = JSON.parse(loginResponse.payload).data;
        return accessToken;
    }

    it('should respond with 201 and persisted thread', async () => {
        const serverInstance = await server();
        const response = await serverInstance.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'sebuah title',
                body: 'sebuah body',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(201);
        expect(responseBody.status).toEqual('success');
        expect(responseBody.data.addedThread).toBeDefined();
    });

    it('should respond with 400 if thread payload does not contain needed property', async () => {
        const serverInstance = await server();
        const response = await serverInstance.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'sebuah body',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should respond with 400 if thread payload has wrong data type', async () => {
        const serverInstance = await server();
        const response = await serverInstance.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'sebuah body',
                body: 123,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });

    it('should respond with 400 when title is more than 50 characters', async () => {
        const serverInstance = await server();
        const response = await serverInstance.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
                body: 'sebuah body',
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(400);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('tidak dapat membuat thread baru karena karakter judul melebihi batas limit');
    });

    it('should respond with 401 if thread headers do not contain authorization', async () => {
        const serverInstance = await server();
        const response = await serverInstance.inject({
            method: 'POST',
            url: '/threads',
            payload: {
                title: 'sebuah title',
                body: 'sebuah body',
            },
        });
        const responseBody = JSON.parse(response.payload);
        expect(response.statusCode).toEqual(401);
        expect(responseBody.status).toEqual('fail');
        expect(responseBody.message).toEqual('Missing authentication');
    });
});


describe('when GET /threads/{threadId}', () => {
  let threadId = '';
  let accessToken = '';

  beforeAll(async () => {
      const { server, token } = await setupServerAndToken();
      accessToken = token;
      threadId = await addThread(server, accessToken);
  });

  async function setupServerAndToken() {
      const serverInstance = await createServer(container);
      const token = await loginAndGetToken(serverInstance);
      return { server: serverInstance, token };
  }

  async function loginAndGetToken(server) {
      await addUser(server);
      const loginResponse = await server.inject({
          method: 'POST',
          url: '/authentications',
          payload: {
              username: 'username2',
              password: 'password',
          },
      });
      return JSON.parse(loginResponse.payload).data.accessToken;
  }

  async function addUser(server) {
      await server.inject({
          method: 'POST',
          url: '/users',
          payload: {
              username: 'username2',
              password: 'password',
              fullname: 'Husada Hutasoit',
          },
      });
  }

  async function addThread(server, token) {
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
      return JSON.parse(threadResponse.payload).data.addedThread.id;
  }

  it('should respond with 200 and persisted detail thread', async () => {
      const serverInstance = await createServer(container);
      const response = await serverInstance.inject({
          method: 'GET',
          url: `/threads/${threadId}`,
      });
      const responseBody = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseBody.status).toEqual('success');
      expect(responseBody.data.thread).toBeDefined();
  });

  it('should respond with 404 if detail thread id is not provided', async () => {
    const serverInstance = await createServer(container);
    const response = await serverInstance.inject({
        method: 'GET',
        url: `/threads`,
    });
    expect(response.statusCode).toEqual(404);
    const responseBody = JSON.parse(response.payload);
    expect(responseBody.message).toEqual('Not Found');
});


  it('should respond with 404 if detail thread id is of wrong data type', async () => {
      const serverInstance = await createServer(container);
      const response = await serverInstance.inject({
          method: 'GET',
          url: `/threads/${false}`,
      });
      const responseBody = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseBody.status).toEqual('fail');
      expect(responseBody.message).toEqual('thread tidak ditemukan');
  });
});
});
