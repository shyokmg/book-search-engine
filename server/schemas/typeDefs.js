const typeDefs = `
input SaveBookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: Integer
    savedBooks: [Book]!
}

type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedBook(input: SaveBookInput): User
    removeBook(bookId: ID!): User
}
`;

module.exports = typeDefs;