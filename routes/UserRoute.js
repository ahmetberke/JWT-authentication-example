const User = require('../models/user');

const   Express = require('express'),
        router = Express.Router(),
        verificate = require('../Authentication/verificate'),
        UserController = require('../controllers/UserController');

// Login
router.post('/login', UserController.Login);
// Logout
router.get('/logout', UserController.Logout);

// User Routes

router.get('/', verificate,UserController.GetAllUser);
router.get('/:id',verificate,UserController.GetUser);
router.post('/',verificate,UserController.NewUser);
router.delete('/:id',verificate,UserController.DeleteUser);
router.put('/:id', verificate,UserController.UpdateUser);



module.exports = router;
