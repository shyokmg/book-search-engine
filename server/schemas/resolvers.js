const { User } = require('../models');
const  { signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw AuthenticationError;
        },
    },

    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user};
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password});
            const token = signToken(user);
            return { token, user};
        },

        saveBook: async (parent, {user, input}) => {
            return User.findOneAndUpdate(
                {_id: user._id },
                { $addToSet: { savedBooks: input}},
                { new: true, runValidators: true }
            );   
        },
        removeBook: async ( parent, {user, bookId}) => {
            return User.findOneAndUpdate(
                { _id: user._id},
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            )
        }
    }
}

module.exports = resolvers;