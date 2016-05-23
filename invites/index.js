// https://github.com/bredele/node-invite
// https://github.com/borbit/node-leaderboard

var client = require('redis').createClient(process.env.REDIS_URL)
var Leaderboard = require('leaderboard')

var board1 = new Leaderboard('__redis__', null, client)