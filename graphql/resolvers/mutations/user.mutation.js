const bcrypt = require('bcrypt')
const token = require('../../../helpers/token')

let user, isUserExists, validPassword, isOldPasswordCorrect

module.exports = {
    saveUser: async (source, { data }, { User }) => {
        isUserExists = await User.findOne({ username: data.username })

        if (isUserExists) throw new Error('User already exists.')
        user = await new User(data).save()

        user.on('es-indexed', (err) => {
            if (err) throw err; console.log('user indexed');
        });

        return { token: token.generate(user, '84h') }
    },
    signIn: async (source, { data: { username, password } }, { User }) => {
        user = await User.findOne({ username })
        if (!user) throw new Error('User does not exists.')

        validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) throw new Error('Wrong Password')

        return { token: token.generate(user, '84h') }
    },
    updatePassword: async (source, { data: { oldPassword, newPassword } }, { User, activeUser }) => {
        user = await User.findById(activeUser.id)
        isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password)
        if (isOldPasswordCorrect) {
            user.password = newPassword
            return await user.save()
        }
        throw new Error('Old password is not correct.')
    },
    updateUser: async (source, { data }, { User }) => await User.findByIdAndUpdate(data.id, data)
}