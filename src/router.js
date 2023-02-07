const express = require('express');
const clientController = require('./controllers/clientController');

const router = express.Router();


// router.get('/clients', (req, res) => res.status(200).send('router funcionando!'));
router.get('/clients', clientController.getAll);


module.exports = router;