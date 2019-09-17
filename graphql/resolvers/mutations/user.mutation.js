const bcrypt = require('bcrypt');
const token = require('../../../helpers/token');

const Mutation = {
    saveUser: async (source, { data }, { User }) => {
        const user = await User.findOne({ username: data.username });

        if (user) {
            throw new Error('User already exists.');
        }
        const newUser = await new User({
            ...data
        }).save();

        return newUser
        //return { token: token.generate(newUser, '1h') }
    },
    signIn: async (source, { data: { username, password } }, { User }) => {
        const user = await User.findOne({ username });
        if (!user)
            throw new Error('User does not exists');

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            throw new Error('Wrong Password');

        return user
        //return { token: token.generate(user, '1h') }
    }
}

module.exports = Mutation;