var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/createCode', [
		function (session) {
			session.userData.inviteCode = 'N3JK29'
			var invitecode = 'N3JK29'
			var pageurl = 'https://m.me/jasonderulo'
			session.send(prompts.getCodeMessage1)
			var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`
			session.send(prompts.getCodeMessage2)
			session.endDialog()
		}
	])
}



