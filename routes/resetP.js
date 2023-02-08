const express= require('express')
const router= express.Router();
const reset=require('../controllers/resetP');

router.post('/password/resetpassword',reset.forgotpassword);
router.get('/password/resetpassword/:resetpassword',reset.resetpassword);
router.post('/password/updatepassword/:updatepassword',reset.updatepassword);

module.exports = router;
