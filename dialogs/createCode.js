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

			session.beginDialog('/shareCode')
		}
	])
}



