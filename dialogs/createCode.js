var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/createCode', [
		function (session) {
			var totalranks = '1'
			var userrank = '1'
			var getCodeMessage1 = `Yeahhh! Dope. Out of my ${totalranks} fans you're going to be #${userrank} I send the new album to.`
			session.send(getCodeMessage1)

			var pageurl = 'https://m.me/jasonderulo'
			var invitecode = 'INVITE_CODE'
			var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`
			
			session.send(getCodeMessage2)
			session.endDialog()
		}
	])
}



