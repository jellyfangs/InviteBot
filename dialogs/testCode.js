var builder = require('botbuilder')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/testCode', function(session) {
		session.send('hi %s', session.userData.name)
		session.replaceDialog('/shareCode')
	})

	bot.use(function (session, next) {
		console.log(session)
		if (!session.userData.firstRun) {
			session.userData.firstRun = true
			session.beginDialog('/firstRun')
		} else {
			next()
		}
	})

	bot.add('/firstRun', [
		function (session) {
			builder.Prompts.text(session, "Hello.. what's your name?")
		},
		function (session, results) {
			session.userData.name = results.response
			session.replaceDialog('/testCode')
		}
	])
}