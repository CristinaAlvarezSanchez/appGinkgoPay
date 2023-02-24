const router = require('express').Router();

router.use('/users', require('./api/users'));
router.use('/groups', require('./api/groups'));
router.use('/expenses', require('./api/expenses'));
router.use('/payments', require('./api/payments'));

module.exports = router;