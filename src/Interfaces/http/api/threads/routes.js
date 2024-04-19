const Joi = require("joi");

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,

    options: {
      description: 'POST threads',
      notes: 'TEST',
      tags: ['api', 'thread'],
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          body: Joi.string().required(),
        }).label('POST-threads-validate'),
        headers: Joi.object({
          accessToken: Joi.string().required(),
        })
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            addedThread: {
              id: Joi.string(),
              title: Joi.string(),
              owner: Joi.string(),
            }
          })
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getDetailThreadHandler,

    options: {
      description: 'GET thread',
      notes: 'TEST',
      tags: ['api', 'thread'],
      validate: {
        params: Joi.object({
          threadId: Joi.string().required()
        }).label('GET-threads-validate'),
        headers: Joi.object({
          accessToken: Joi.string().required(),
        })
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            title: Joi.string(),
            owner: Joi.string(),
          })
        })
      }
    }
  },
];

module.exports = routes;
