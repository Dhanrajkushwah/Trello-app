const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware"); // Import the auth middleware
const router = express.Router();

router.route('/list')
    .get(auth, userController.list); 
router.route('/signup')
    .post(userController.registerUser);
router.route('/login')
    .post(userController.loginUser);

router.route('/contact')
    .post(auth, userController.createcontact);  
router.route('/listcontact')
    .get(auth, userController.listContact); 

// Board routes
router.route('/boards/create')
    .post(auth, userController.createBoard); 
router.get('/boards/user/:userId', auth, userController.getBoardsByUser);  // Added auth middleware
router.get('/boards/:boardId',auth, userController.getBoardById);
// List routes
router.post('/lists/create', auth, userController.createList);
router.get('/lists/board/:boardId', auth, userController.getListsByBoard);

// Card routes
router.post('/cards/create', auth, userController.createCard);
router.get('/cards/list/:listId', auth, userController.getCardsByList);

router.get('/workspaces/:id', userController.getWorkspaceById);

// Add a member to the workspace
router.post('/workspaces/:id/members', userController.addMember);

// Generate a new invite link
router.post('/workspaces/:id/invite-link', userController.generateInviteLink);

module.exports = router;
