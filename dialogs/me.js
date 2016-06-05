var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
  bot.add('/me', function (session) {
  	var username = session.message.from.name
    var userid = session.message.from.address
    var botid = session.message.from.id
    var userdata = JSON.stringify(session.userData)

		var meMessage = 'This is what I know about you...' +
	    `\nName: ${username}` +
	    `\nUser ID: ${userid}` +
	    `\nBot ID: ${botid}` +
			`\nData: ${userdata}`

    session.endDialog(meMessage)
  })
}