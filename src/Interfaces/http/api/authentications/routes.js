const Joi = require('joi')

const routes = (handler) => ([
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,

    options: {
      description: 'POST authentications',
      notes: 'TEST',
      tags: ['api','auth'],
      validate: {
        payload: Joi.object({
          username: Joi.string(),
          password: Joi.string()
        }).label('POST-authentications-payload')
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            accessToken: Joi.string(),
            refreshToken: Joi.string()
          })
        }).label('POST-authentications-response')
      }
    }
  },

  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,

    options: {
      description: 'PUT Authentications',
      notes: 'TEST',
      tags: ['api', 'auth'],
      validate: {
        payload : Joi.object({
          refreshToken: Joi.string(),
        }).label('PUT-authentications-payload')
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            accessToken: Joi.string(),
          })
        }).label('PUT-authentications-response')
      }
    }
  },

  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,

    options: {
      description : 'DELETE authentications',
      notes: 'TEST',
      tags: ['api', 'auth'],
      validate : {
        payload: Joi.object({
          refreshToken: Joi.string(),
        }).label('DELETE-authentications-payload'),
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
        }).label('DELETE-authentications-response')
      }
    }
  }  
]);

module.exports = routes;
