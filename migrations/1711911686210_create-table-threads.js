exports.up = (pgm) => {
  // Membuat tabel threads
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      comment: 'The ID of the thread.',
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true,
      comment: 'The title of the thread.',
    },
    body: {
      type: 'TEXT',
      notNull: true,
      comment: 'The body content of the thread.',
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
      comment: 'The ID of the user who owns this thread.',
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
      comment: 'The timestamp when the thread was created.',
    },
  });

  // Membuat kunci referensi ke tabel users
  pgm.addConstraint('threads', 'fk_owner_users', {
    foreignKeys: {
      columns: 'owner',
      references: '"users"',
    },
    comment: 'References the ID of the user who owns this thread.',
  });
};

exports.down = (pgm) => {
  // Menghapus kunci referensi dan tabel threads
  pgm.dropConstraint('threads', 'fk_owner_users');
  pgm.dropTable('threads');
};
