var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/createCode', [
		function (session) {
			session.userData.inviteCode = 'N3JK29'
			session.send(prompts.getCodeMessage1)
			session.send(prompts.getCodeMessage2)
			session.endDialog()
		}
	])
}



