exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    threadId: {
      type: 'VARCHAR(50)',
      notNull: true,
      comment: 'The ID of the thread this comment belongs to.',
    },
    content: {
      type: 'TEXT',
      notNull: true,
      comment: 'The content of the comment.',
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
      comment: 'The ID of the user who owns this comment.',
    },
    is_delete: {
      type: 'CHAR(1)',
      comment: 'Indicates whether the comment is marked as deleted (Y/N).',
    },
    createdAt: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('current_timestamp'),
      comment: 'The timestamp when the comment was created.',
    },
  });

  // Add foreign key constraints
  pgm.addConstraint('comments', 'fk_threadId_comments_threads', {
    foreignKeys: {
      columns: 'threadId',
      references: '"threads"',
    },
    comment: 'References the ID of the thread this comment belongs to.',
  });

  pgm.addConstraint('comments', 'fk_owner_comments_users', {
    foreignKeys: {
      columns: 'owner',
      references: '"users"',
    },
    comment: 'References the ID of the user who owns this comment.',
  });
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
};
