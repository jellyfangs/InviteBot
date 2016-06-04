var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}


function addDialogs(bot) {
	bot.add('/reset', [
		function (session) {
			builder.Prompts.confirm(session, 'Reset your chat data?')
		},
		function (session, results) {
			if (results.response) {
				session.userData = {}
				session.endDialog('cleared, bye')
			} else {
				session.endDialog('next time, bye')
			}
		},
	])
}