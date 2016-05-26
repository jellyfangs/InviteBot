var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			builder.Prompts.choice(session, prompts.codeFailMessage2, ["yes", "no", "another code"])
		},
		function (session, results) {
			if (results.response) {
				if (results.response.entity == 'yes') {
					session.send('YOU ARE IN')
					session.endDialog(prompts.endMessage2)
				} else if (results.response.entity == 'no') {
					session.send('YOU ARE OUT')
					session.endDialog(prompts.endMessage2)
				} else {
					session.beginDialog('/verifyCode')
				}
			}
		},
	])
}