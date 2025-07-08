const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const diagramsRouter = require('./api/diagrams');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/diagrams', diagramsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
