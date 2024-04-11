const InvariantError = require('./InvariantError');
const AuthenticationError = require('./AuthenticationError');
const AuthorizationError = require('./AuthorizationError');
const NotFoundError = require('./NotFoundError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

function createInvariantError(message) {
  return new InvariantError(message);
}

function createAuthenticationError(message) {
  return new AuthenticationError(message);
}

function createNotFoundError(message) {
  return new NotFoundError(message);
}

DomainErrorTranslator._directories = {
  // register
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
  ),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai'
  ),
  'REGISTER_USER.USERNAME_LIMIT_CHAR': createInvariantError(
    'tidak dapat membuat user baru karena karakter username melebihi batas limit'
  ),
  'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': createInvariantError(
    'tidak dapat membuat user baru karena username mengandung karakter terlarang'
  ),
  // registered
  'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'tidak dapat membuat user baru karena properti yang dibutuhkan tidak ada'
  ),
  'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat membuat user baru karena tipe data tidak sesuai'
  ),
  // login
  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'harus mengirimkan username dan password'
  ),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'username dan password harus string'
  ),
  // new auth
  'NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'harus mengirimkan token'
  ),
  'NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'token harus string'
  ),
  // addthread
  'ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat membuat thread baru karena tipe data tidak sesuai'
  ),
  'ADD_THREAD.TITLE_LIMIT_CHAR': createInvariantError(
    'tidak dapat membuat thread baru karena karakter judul melebihi batas limit'
  ),
  'ADD_THREAD.NO_AUTHORIZATION': createAuthenticationError(
    'Missing authentication'
  ),
  // getdetail thread
  'DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY': createNotFoundError(
    'tidak dapat mengambil thread karena properti yang dibutuhkan tidak ada'
  ),
  'DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat mengambil thread karena tipe data tidak sesuai'
  ),
  // addcomment
  'ADD_COMMENT.NO_AUTHORIZATION': createAuthenticationError(
    'Missing authentication'
  ),
  'ADD_COMMENT.NO_PARAMS': createNotFoundError('params tidak ditemukan'),
  'ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'tidak dapat membuat comment baru karena properti yang dibutuhkan tidak ada'
  ),
  'ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat membuat comment baru karena tipe data tidak sesuai'
  ),
  'ADD_COMMENT.CONTENT_LIMIT_CHAR': createInvariantError(
    'tidak dapat membuat komentar baru karena karakter judul melebihi batas limit'
  ),
  // deletecomment
  'DELETE_COMMENT.NO_AUTHORIZATION': createAuthenticationError(
    'Missing authentication'
  ),
  'DELETE_COMMENT.NO_PARAMS': createNotFoundError('parameter komen id tidak ada'),
  'DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY': createInvariantError(
    'tidak dapat menghapus comment karena data yang dibutuhkan tidak ada'
  ),
  'DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION': createInvariantError(
    'tidak dapat menghapus comment karena tipe data yang dibutuhkan tidak sesuai'
  ),
  // refresh token
  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    createInvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    createInvariantError('refresh token harus string'),
  // logout
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN':
    createInvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION':
    createInvariantError('refresh token harus string'),
};

module.exports = DomainErrorTranslator;
