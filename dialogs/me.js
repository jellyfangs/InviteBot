var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
  bot.add('/me', function (session) {
		var meMessage = 'This is what I know about you...' +
	    `\n* User ID: ${session.message.from.address}` +
	    `\n* Bot ID: ${session.message.from.id}` +
	    `\n* Name: ${session.message.from.name}` +
	    `\n* Invite code: ${session.userData.invitecode}` +
			`\n* Opted in: ${session.userData.optin}` +
			`\n* Chatted before: ${session.userData.firstRun}`

    session.endDialog(meMessage)
  })
}