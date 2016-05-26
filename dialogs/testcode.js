var builder = require('botbuilder')
var prompts = require('../prompts')
var client = require('redis').createClient(process.env.REDIS_URL)
var randomstring = require('randomstring')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/testCode', [
		function (session) {
			var pageurl = 'https://m.me/jasonderulo'
			var invitecode = createCode()
			var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`
			
			session.send(getCodeMessage2)

			session.endDialog('bye')
		},
	])
}

function createCode() {
	// gen uid
	var uid = randomstring.generate({
		length: 5,
		charset: 'numeric',
	})
	// gen code
	var invitecode = randomstring.generate({
		length: 6,
		readable: true,
		capitalization: 'uppercase',
	})
	// save to redis
	client.set(invitecode, uid, function (err, res) {
		console.log(res)
	})
	// output from server
	return invitecode
}