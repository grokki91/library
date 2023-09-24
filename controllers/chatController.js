class ChatController {
    async showChat(req, res, next) {
        res.render('chat', {
            title: 'Chat'
        })
    }
}

module.exports = new ChatController()