const Joi = require("joi");

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,

    options: {
      description: 'POST comments in thread',
      notes: 'TEST',
      tags: ['api', 'comment'],
      validate: {
        payload: Joi.object({
          content: Joi.string()
        }).label('Post-comments-validate'),
        headers: Joi.object({
          accessToken: Joi.string().required(),
        })
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
          data: Joi.object({
            addComments: {
              id: Joi.string(),
              content: Joi.string(),
              owner: Joi.string(),
            }
          }).label('POST-comments-response')
        })
      }
    }
  },

  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,

    options: {
      description: 'DELETE comments from thread',
      notes: 'TEST',
      tags: ['api','comments'],
      validate: {
        payload: Joi.object({
          threadId: Joi.string(),
          commentId: Joi.string(),
        }).label('DELETE-comments-validate'),
        headers: Joi.object({
          accessToken: Joi.string().required(),
        }).unknown()
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
        }).label('DELETE-comments-response')
      }
    }
  },
];

module.exports = routes;
