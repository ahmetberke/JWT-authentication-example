const User = require('../models/user');

const   Express = require('express'),
        router = Express.Router(),
        UserController = require('../controllers/UserController');

// User Routes
router.get('/', UserController.GetAllUser);
router.get('/:id',UserController.GetUser);
router.post('/',UserController.NewUser);
router.delete('/:id',UserController.DeleteUser);
router.put('/:id', UserController.UpdateUser);

module.exports = router;
