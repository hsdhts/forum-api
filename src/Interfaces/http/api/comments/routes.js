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
        }).label('Post-comment-validate'),
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
          })
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
        }).label('DELETE-comment-validate'),
        headers: Joi.object({
          accessToken: Joi.string().required(),
        }).unknown()
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success'),
        })
      }
    }
  },
];

module.exports = routes;

// options: {
//   description: 'DELETE comments in thread',
//   notes: 'TEST',
//   tags: ['api', 'comments'],
//   validate: {
//     payload: Joi.object({
      
//     })
//   }
// }