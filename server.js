const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

const app = express();

// Allow cors
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = app.eventNames.PORT || 8000

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
