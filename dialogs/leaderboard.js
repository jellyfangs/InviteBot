var builder = require('botbuilder')
var prompts = require('../prompts')
var https = require('https')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
  bot.add('/leaderboard', function (session) {
  	https.get('https://9f8b4fe9.ngrok.io/rankings', function(res) {
    	if (res.statusCode!=200) {
    		session.endDialog(prompts.endMessage)
    	}

    	res.on('data', function(data) {
    		var leaderboard = JSON.parse(data)
    		var firstUser = leaderboard[0].member
    		var firstUserScore = leaderboard[0].score

    		var leadersMessage = 'Leaderboard...' +
    			`\n1) ${firstUser} -- ${firstUserScore} pts`

      	session.endDialog(leadersMessage)
    	})
  	}).on('error', function (err) {
  		console.log(`CHATBOT ERR: ${err.message}`)
  	})
  })
}



