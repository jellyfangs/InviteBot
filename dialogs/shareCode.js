var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/shareCode', [
		function (session) {
			var pageurl = 'https://m.me/jasonderulo'
			var invitecode = 'INVITE_CODE'
			var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`
			
			session.send(getCodeMessage2)

			session.endDialog(prompts.endMessage)
		},
	])
}