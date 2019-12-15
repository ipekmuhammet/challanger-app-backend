const fs = require('fs')

let message

module.exports = {
    saveMessage: async (source, { data }, { Message, Chat, activeUser, pubSub }) => {
        await Chat.findOne({ user_id: activeUser.id, target_id: data.receiver }, (error, result) => {
            if (error || !result) new Chat({ user_id: activeUser.id, target_id: data.receiver }).save()
        })

        await Chat.findOne({ target_id: activeUser.id, user_id: data.receiver }, (error, result) => {
            if (error || !result) new Chat({ user_id: activeUser.id, target_id: data.receiver }).save()
        })

        data.file.then(file => {
            const { stream, filename, mimetype } = file

            stream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))
        })

        message = await new Message(Object.assign(data, { sender: activeUser.id })).save()
        pubSub.publish('message', { message })
        return message
    }
}