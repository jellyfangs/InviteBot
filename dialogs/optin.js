var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session, args, next) {
			var utterance = session.message.from.name
			session.send(utterance)
			session.endDialog()
		}
	])
}