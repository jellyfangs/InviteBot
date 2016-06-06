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
			if (results.response.entity == 'Add me to the list!') {
				session.userData.optin = true
				session.send('Yeahh, dope!')
				session.endDialog(prompts.endMessage2)
			} else if (results.response.entity == 'No') {
				session.userData.optin = false
				session.send('Oh man that sucks.')
				session.endDialog(prompts.endMessage2)
			} else if (results.response.entity == 'Another code') {
				session.beginDialog('/verifyCode')
			} else {
				session.replaceDialog('/optin')
			}
		},
	])
}