var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			builder.Prompts.choice(session, prompts.codeFailMessage2, ["Yes", "No", "Another code"])
		},
		function (session, results) {
			if (results.response) {
				if (results.response.entity == 'yes') {
					session.userData.optin = true
					session.endDialog(prompts.endMessage2)
				} else if (results.response.entity == 'no') {
					session.userData.optin = false
					session.endDialog(prompts.endMessage2)
				} else {
					session.beginDialog('/verifyCode')
				}
			}
		},
	])
}