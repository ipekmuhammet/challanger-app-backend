const Block = require('./Block')
const Challange = require('./Challange')
const ChallangeCategorie = require('./ChallangeCategorie')
const Chat = require('./Chat')
const Comment = require('./Comment')
const Follow = require('./Follow')
const Like = require('./Like')
const Message = require('./Message')
const Post = require('./Post')
const User = require('./User')

module.exports = Object.assign(
    Block,
    Challange,
    ChallangeCategorie,
    Chat,
    Comment,
    Follow,
    Like,
    Message,
    Post,
    User
)