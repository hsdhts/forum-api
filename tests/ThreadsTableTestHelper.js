/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({ id = 'thread-123', title = 'sebuah title', body = 'sebuah content', owner = 'user-123' }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4)',
      values: [id, title, body, owner],
    };
    await this.executeQuery(query);
  },

  async getDetailThread(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };
    const result = await this.executeQuery(query);
    return result.rows;
  },

  async cleanTable() {
    await this.executeQuery('DELETE FROM threads WHERE 1=1');
  },

  async executeQuery(query) {
    try {
      const result = await pool.query(query);
      return result;
    } catch (error) {
      throw new Error(`Error executing query: ${error.message}`);
    }
  },
};

module.exports = ThreadsTableTestHelper;
