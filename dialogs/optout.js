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
				session.send('Yeahh, dope!')
			} else {
				session.userData.optin = false
				session.send('Oh man that sucks.')
			}
			session.endDialog(prompts.endMessage2)
		}
	])
}