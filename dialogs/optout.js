var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optout', [
		function (session) {
			builder.Prompts.confirm(session, prompts.noCodeMessage)
		},
		function (session, results) {
			if (results.response) {
				session.userData.optin = true
			} else {
				session.userData.optin = false
			}
			session.endDialog(prompts.endMessage2)
		}
	])
}