
import express from 'express'

const router = express.Router()

import { register, login, updateUser,  getInfoUser} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/infos').get(authenticateUser, getInfoUser)
router.route('/updateUser').patch(authenticateUser,updateUser)

export default router


