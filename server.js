const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = app.eventNames.PORT || 8000

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
