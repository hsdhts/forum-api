const DomainErrorTranslator = require('../DomainErrorTranslator');
const InvariantError = require('../InvariantError');
const AuthenticationError = require('../AuthenticationError');
const NotFoundError = require('../NotFoundError');

describe('DomainErrorTranslator', () => {
  it('should translate errors correctly', () => {
    // Register user errors
    expectTranslateError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada', InvariantError);
    expectTranslateError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat membuat user baru karena tipe data tidak sesuai', InvariantError);
    expectTranslateError('REGISTER_USER.USERNAME_LIMIT_CHAR', 'tidak dapat membuat user baru karena karakter username melebihi batas limit', InvariantError);
    expectTranslateError('REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER', 'tidak dapat membuat user baru karena username mengandung karakter terlarang', InvariantError);
    
    // Registered user errors
    expectTranslateError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada', InvariantError);
    expectTranslateError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat membuat user baru karena tipe data tidak sesuai', InvariantError);

    // User login errors
    expectTranslateError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY', 'harus mengirimkan username dan password', InvariantError);
    expectTranslateError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION', 'username dan password harus string', InvariantError);

    // New auth errors
    expectTranslateError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY', 'harus mengirimkan token', InvariantError);
    expectTranslateError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION', 'token harus string', InvariantError);

    // Add thread errors
    expectTranslateError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada', InvariantError);
    expectTranslateError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat membuat thread baru karena tipe data tidak sesuai', InvariantError);
    expectTranslateError('ADD_THREAD.TITLE_LIMIT_CHAR', 'tidak dapat membuat thread baru karena karakter judul melebihi batas limit', InvariantError);
    expectTranslateError('ADD_THREAD.NO_AUTHORIZATION', 'Missing authentication', AuthenticationError);

    // Get detail thread errors
    expectTranslateError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat mengambil thread karena properti yang dibutuhkan tidak ada', NotFoundError);
    expectTranslateError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat mengambil thread karena tipe data tidak sesuai', InvariantError);

    // Add comment errors
    expectTranslateError('ADD_COMMENT.NO_AUTHORIZATION', 'Missing authentication', AuthenticationError);
    expectTranslateError('ADD_COMMENT.NO_PARAMS', 'params tidak ditemukan', NotFoundError);
    expectTranslateError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada', InvariantError);
    expectTranslateError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat membuat comment baru karena tipe data tidak sesuai', InvariantError);
    expectTranslateError('ADD_COMMENT.CONTENT_LIMIT_CHAR', 'tidak dapat membuat komentar baru karena karakter judul melebihi batas limit', InvariantError);

    // Delete comment errors
    expectTranslateError('DELETE_COMMENT.NO_AUTHORIZATION', 'Missing authentication', AuthenticationError);
    expectTranslateError('DELETE_COMMENT.NO_PARAMS', 'parameter komen id tidak ada', NotFoundError);
    expectTranslateError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY', 'tidak dapat menghapus comment karena data yang dibutuhkan tidak ada', InvariantError);
    expectTranslateError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION', 'tidak dapat menghapus comment karena tipe data yang dibutuhkan tidak sesuai', InvariantError);
  });

  function expectTranslateError(errorCode, expectedMessage, ErrorType) {
    expect(
      DomainErrorTranslator.translate(new Error(errorCode))
    ).toStrictEqual(new ErrorType(expectedMessage));
  }
});
