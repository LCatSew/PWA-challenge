const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async () => {
            return User.findOne({ _id: context.user._id });
        },
        books: async (parent, { bookId, authors, title}) => {
            const params = {}
            if (bookId) {
                params.bookId = bookId;
            }
            if (authors) {
                params.authors = authors;
            }
            if (title) {
                params.title = title;
            }

            return await Book.find(params);
        },
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate({
                    path: 'books',
                    populate: 'books'
                });
                return user.books.id(_id);
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        
    },
    Mutation: {
    },
};
