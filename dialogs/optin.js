var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}


function addDialogs(bot) {
	bot.add('/optin', [
		function (session) {
			builder.Prompts.choice(session, prompts.codeFailMessage2, ["Add me to the list!", "No", "Another code"])
		},
		function (session, results) {
			console.log('OPT IN OR NAH? %s', results.response.entity)
			if (results.response.entity == 'Yes') {
				console.log('ya')
				session.userData.optin = true
				session.endDialog(prompts.endMessage2)
			} else if (results.response.entity == 'No') {
				console.log('nah')
				session.userData.optin = false
				session.endDialog(prompts.endMessage2)
			} else {
				console.log('redo')
				session.beginDialog('/verifyCode')
			}
		},
	])
}