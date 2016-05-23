// https://github.com/bredele/node-invite
// https://github.com/borbit/node-leaderboard

var client = require('redis').createClient(process.env.REDIS_URL)
var randomstring = require('randomstring')

exports.createCode = function(req, res, next) {
	var inviteCode = randomstring.generate({
		length: 6,
		readable: true,
		capitalization: 'uppercase',
	})
	return inviteCode
}

exports.verifyCode = function(req, res, next) {

}