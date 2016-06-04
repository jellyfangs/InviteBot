var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
    bot.add('/welcome', function (session) {
        console.log('WELCOME MESSAGE')

        // reply back with custom greeting
        var username = session.message.from.name.split(' ')[0]
        session.send(`Hey, ${username}! I'm hard at work in the studio.`)

        // go to share code
        session.replaceDialog('/shareCode')
    })
}



