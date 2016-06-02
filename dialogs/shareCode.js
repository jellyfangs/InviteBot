var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
	bot.add('/shareCode', [
		function (session) {
			// http://localhost:3978/rank?userid=10001&first_name=test&last_name=test
			var path = '/rank?userid=%s'.replace('%s', session.message.from.id + 6 + '&first_name=' + session.message.from.name + '&last_name=' + session.message.from.name)
 			// if user already has an invite code then look them up
			if (session.userData.invitecode) {
				// http://localhost:3978/lookup?userid=10001
				path = '/lookup?userid=%s'.replace('%s', session.message.from.id)
			}

			http.get({
				protocol: 'http:',
				host: 'localhost',
				port: 3978,
				path: path
			}, function(res) {
				if (res.statusCode!=200) {
					// server error
					session.endDialog(prompts.endMessage)
				}
				// keep processing user
				res.on('data', function(data) {
					var user = JSON.parse(data)
					var invitecode = user.invitecode
					session.userData.invitecode = invitecode // setup botbuilder session
					var user_rank = ordinal_suffix_of(user.rank)
					var total_ranks = user.totals

					// send first msg
					var sendCodeMessage2 = `Out of my ${total_ranks} fans you're going to be the ${user_rank} person I send the new album to.`
					session.send(sendCodeMessage2)

					// send second msg
					var pageurl = 'https://m.me/jasonderulo'
					var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`
					session.send(getCodeMessage2)

					session.endDialog(prompts.endMessage)
				})
			}).on('error', function (err) {
        console.log(`CHATBOT ERR: ${err.message}`)
      })
		},
	])
}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}