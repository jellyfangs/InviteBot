var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/verifyCode', [
		function (session) {
			session.send(prompts.getCodeMessage1)
			session.send(prompts.getCodeMessage2)
			session.send(prompts.endMessage)
		}
	])
}



