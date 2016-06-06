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
				//https://9f8b4fe9.ngrok.io/lookup?userid=1106115569438811
				https.get('https://9f8b4fe9.ngrok.io/optin?userid='+session.message.from.address, function(res) {
					if (res.statusCode!=200) {
						// server error
						session.endDialog(prompts.endMessage)
					}

					// keep processing user
					res.on('data', function(data) {
						console.log(JSON.parse(data))

						session.userData.optin = true
						session.send('Yeahh, dope!')
					})
				}).on('error', function (err) {
	        console.log(`CHATBOT ERR: ${err.message}`)
	      })
			} else {
				//https://9f8b4fe9.ngrok.io/lookup?userid=1106115569438811
				https.get('https://9f8b4fe9.ngrok.io/optin?userid='+session.message.from.address, function(res) {
					if (res.statusCode!=200) {
						// server error
						session.endDialog(prompts.endMessage)
					}

					// keep processing user
					res.on('data', function(data) {
						console.log(JSON.parse(data))

						session.userData.optin = false
						session.send('Oh man that sucks.')
					})
				}).on('error', function (err) {
	        console.log(`CHATBOT ERR: ${err.message}`)
	      })
			}
			session.endDialog(prompts.endMessage2)
		}
	])
}