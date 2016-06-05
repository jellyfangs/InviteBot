var builder = require('botbuilder')
var prompts = require('../prompts')

module.exports = {
	addDialogs: addDialogs
}

function addDialogs(bot) {
  bot.add('/video', [
    function (session) {
      var bubble = {}
      bubble.title = 'Making of the song'
      bubble.titleLink = 'https://www.youtube.com/watch?v=Cp0UyQWBRNI'
      bubble.text = 'Me in the studio'
      bubble.thumbnailUrl = 'http://img.youtube.com/vi/Cp0UyQWBRNI/maxresdefault.jpg'
      var msg = new builder.Message()
            .addAttachment(bubble)
      session.endDialog(msg)
    }
  ])
}