const express = require('express');
const peopleController = require('../controllers/people');
const router = express.Router();

// router.get('/peoples', peopleController.getAllPeople);

// router.get('/people/add', peopleController.getAddPeople);

router.get('/people/:id', peopleController.getPeople);
// router.post('/people/delete/:url', peopleController.postDeletePeople)
router.post('/people/deleteByName/:name', peopleController.postDeletePeople)

router.post('/peoples/add', peopleController.postAddPeople)

// router.post('/peoples/delete', peopleController.)

module.exports = router;
