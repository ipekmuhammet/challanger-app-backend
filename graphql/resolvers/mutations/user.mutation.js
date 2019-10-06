const bcrypt = require('bcrypt')
const token = require('../../../helpers/token')

const Mutation = {
    saveUser: async (source, { data }, { User }) => {
        const isUserExists = await User.findOne({ username: data.username })

        if (isUserExists) throw new Error('User already exists.')
        const user = await new User(data).save()

        return { token: token.generate(user, '84h') }
    },
    signIn: async (source, { data: { username, password } }, { User }) => {
        const user = await User.findOne({ username })
        if (!user) throw new Error('User does not exists.')

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) throw new Error('Wrong Password')

        return { token: token.generate(user, '84h') }
    },
    updateUser: async (source, { data }, { User }) => await User.findByIdAndUpdate(data.id, data)
}

module.exports = Mutation