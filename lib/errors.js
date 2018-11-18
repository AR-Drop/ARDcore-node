'use strict';

var createError = require('errno').create;

var RavencoreNodeError = createError('RavencoreNodeError');

var RPCError = createError('RPCError', RavencoreNodeError);

module.exports = {
  Error: RavencoreNodeError,
  RPCError: RPCError
};
