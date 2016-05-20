var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			builder.Prompts.text(session, prompts.codeFailMessage2)
		},
		function (session, results) {
			if (results.response) {
				session.send('YOU ARE IN')
				session.send(prompts.endMessage2)
			} else {
				session.send('YOU ARE OUT')
				session.send(prompts.endMessage2)
			}
		},
	])
}