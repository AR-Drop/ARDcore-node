'use strict';

var createError = require('errno').create;

var ARDcoreNodeError = createError('ARDcoreNodeError');

var RPCError = createError('RPCError', ARDcoreNodeError);

module.exports = {
  Error: ARDcoreNodeError,
  RPCError: RPCError
};
