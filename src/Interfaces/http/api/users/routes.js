const Joi = require('joi');

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,

    options: {
      description: 'POST user',
      notes: 'TEST',
      tags: ['api', 'user'],
      validate: {
        payload: Joi.object({
          fullname: Joi.string(),
          username: Joi.string(),
          password: Joi.string(),
        }).label('POST-user-validate')
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            id: Joi.string(),
            fullname: Joi.string(),
            username: Joi.string(),
          })
        })
      }
    }
  },
]);

module.exports = routes;
