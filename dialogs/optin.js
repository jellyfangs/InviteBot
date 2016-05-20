var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			session.send('YOU ARE IN')
			session.send(prompts.endMessage2)
			session.endDialog()
		}
	])
}