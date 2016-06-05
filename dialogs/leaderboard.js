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

    		var leadersMessage = 'Current top 5 users...' +
    			`\n* 1) ${leaderboard[0].member} -- ${leaderboard[0].score} pts` +
    			`\n* 2) ${leaderboard[1].member} -- ${leaderboard[1].score} pts` +
    			`\n* 3) ${leaderboard[2].member} -- ${leaderboard[2].score} pts` +
    			`\n* 4) ${leaderboard[3].member} -- ${leaderboard[3].score} pts` +
    			`\n* 5) ${leaderboard[4].member} -- ${leaderboard[4].score} pts`

      	session.endDialog(leadersMessage)
    	})
  	}).on('error', function (err) {
  		console.log(`CHATBOT ERR: ${err.message}`)
  	})
  })
}



