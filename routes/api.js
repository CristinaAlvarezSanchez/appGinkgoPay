const { checkToken } = require('../helpers/middlewares');
const router = require('express').Router();

router.use('/users', require('./api/users'));
router.use('/groups', checkToken, require('./api/groups'));
router.use('/expenses', checkToken, require('./api/expenses'));
router.use('/payments', checkToken, require('./api/payments'));
router.use('/messages', checkToken, require('./api/messages'));

module.exports = router;