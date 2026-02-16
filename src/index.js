// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const v1AuthRouter = require('./v1/routes/authRoutes');
const v1UserRouter = require('./v1/routes/userRoutes');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

// routes
app.use('/api/v1/auth', v1AuthRouter);
app.use('/api/v1/users', v1UserRouter);

// setup swagger docs here so routes exist whether running local or serverless
// If V1SwaggerDocs expects a port, it can accept undefined — see note bawah.
V1SwaggerDocs(app, PORT);

// export app so serverless wrapper can require it
module.exports = app;

// only start listening when this file is run directly (eg. `node src/index.js` locally)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}
