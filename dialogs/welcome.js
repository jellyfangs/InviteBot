var builder = require('botbuilder')
var prompts = require('../prompts')
var http = require('http')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
    bot.add('/welcome', function (session) {
        // send an image message
        var snap = new builder.Message()
            .addAttachment({
                contentUrl: "http://media1.popsugar-assets.com/files/2012/05/20/2/192/1922398/75f51984d7df610b_8693004e9eca11e18bb812313804a181_7.xxxlarge/i/Jason-Derulo-stayed-busy-studio.jpeg",
                contentType: "image/jpeg"
            })
        session.send(snap)

        // reply back with custom greeting
        var username = session.message.from.name.split(' ')[0]
        session.send(`Hey, ${username}! I'm hard at work in the studio.`)

        // go to share code
        session.replaceDialog('/shareCode')
    })
}



