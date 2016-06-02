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
			http.get('http://localhost:3978/rank?userid=' + session.message.from.id + '&first_name=' + session.message.from.name + '&last_name=' + session.message.from.name, function(res) {
				res.setEncoding('utf8')
				res.on('data', function(data) {
					if (data) {
						var user = JSON.parse(data)
            var user_first_name = session.userData.name
						var invitecode = user.invitecode
            var user_rank = ordinal_suffix_of(user.rank)
            var total_ranks = user.totals

            var sendCodeMessage2 = `btw ${user_first_name}, out of my ${total_ranks} fans you're going to be the ${user_rank} person I send the new album to.`

						// setup botbuilder session
						session.userData.invitecode = invitecode

						// setup message
						var pageurl = 'https://m.me/jasonderulo'
						var getCodeMessage2 = `To get my album even sooner and to get a better place in line, tell your friends to message me at ${pageurl} and tell them to send me your secret code: ${invitecode}`

						session.send(getCodeMessage2)

						session.endDialog(prompts.endMessage)
					} else {
						session.send(prompts.codeFailMessage1)
						session.beginDialog('/optin')
					}
				})
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