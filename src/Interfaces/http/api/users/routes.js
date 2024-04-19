const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,

    options: {
      description: 'POST users',
      notes: 'TEST',
      tags: ['api', 'user'],
      validate: {
        payload: Joi.object({
          fullname: Joi.string(),
          username: Joi.string(),
          password: Joi.string(),
        }).label('POST-users-validate')
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            id: Joi.string(),
            fullname: Joi.string(),
            username: Joi.string(),
          }).label('POST-users-response')
        })
      }
    }
  },
]);

module.exports = routes;
