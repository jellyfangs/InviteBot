var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
    bot.add('/leaderboard', function (session) {
        session.endDialog("/leaderboard")
    })
}



