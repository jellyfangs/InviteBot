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
				session.send('YOU ARE IN')
			} else {
				session.send('YOU ARE OUT')
			}
			session.endDialog(prompts.endMessage2)
		}
	])
}