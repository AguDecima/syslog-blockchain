/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const SysLog = require('./lib/syslog');

module.exports.SysLog = SysLog;
module.exports.contracts = [ SysLog ];
