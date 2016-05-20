var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			builder.Prompts.confirm(session, prompts.codeFailMessage2)
		},
		function (session, results) {
			if (results.response) {
				session.send('YOU ARE IN')
			} else {
				session.send('YOU ARE OUT')
			}
			session.endDialog(prompts.endMessage2)
		},
	])
}