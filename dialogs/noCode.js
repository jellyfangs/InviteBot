var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/noCode', [
		function (session) {
			builder.Prompts.confirm(session, prompts.noCodeMessage)
		},
		function (session, results) {
			if (results.response) {
				session.beginDialog('/optin')
			} else {
				session.beginDialog('/optout')
			}
		}
	])
}