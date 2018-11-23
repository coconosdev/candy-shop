const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./db');
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/sales', require('./routes/sales.routes'));
app.use('/api/filterCantidad', require('./routes/filterCantidad.routes'));
app.use('/api/filterTotal', require('./routes/filterTotal.routes'));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(app.get('port'), () => {
  console.log(`Server listening in ${app.get('port')}`);
});


