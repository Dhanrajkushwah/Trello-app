const manageUserModel = require("../models/user.model");
const manageContactModel = require("../models/contact.model");
const Board = require("../models/board.model");
const Card = require("../models/card.model");
const List = require("../models/list.model");
const Workspace = require('../models/workspace.model');
const status = require("../config/status");
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');

// Get all users
exports.list = async (req, res) => {
    try {
        const data = await manageUserModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Get Notes failed.' });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { firstName, lastName, email, password, birthdate, gender, phoneNumber } = req.body;

    try {
        const userExists = await manageUserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await manageUserModel.create({
            firstName,
            lastName,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//Create Contact 
exports.createcontact = async (req, res) => {
    try {
        var obj = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        }
        const newmanageContactModel = new manageContactModel(obj);
        let result = await newmanageContactModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Contact is successfully.' });

    }
    catch (err) {
        console.log("err", err)
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Contact failed.' });

    }
}

// Get all Contact
exports.listContact = async (req, res) => {
    try {
        const data = await manageContactModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.error('Error fetching Contact:', err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Get Contact failed.' });
    }
};
// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await manageUserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(200).json({
            _id: user._id,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Create a new Board
exports.createBoard = async (req, res) => {
    try {
        const { title, listIds } = req.body; // Expect listIds in the request body

        // Authorization header check
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No authorization header or invalid format' });
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Check if user exists
        const user = await manageUserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a new board with the user ID and the provided list IDs
        const board = new Board({ title, user: userId, lists: listIds });

        // Save the board
        await board.save();

        // Return the created board with populated lists
        const populatedBoard = await Board.findById(board._id).populate('lists'); // Populate lists

        res.status(201).json(populatedBoard);
    } catch (error) {
        // Handle JWT errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        console.error('Error creating board:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get boards by user ID
// Get boards by user ID (with populated lists and cards)
exports.getBoardsByUser = async (req, res) => {
    try {
        const boards = await Board.find({ user: req.params.userId })
            .populate({
                path: 'lists',
                populate: {
                    path: 'cards', // Populate cards inside lists
                },
            }).exec();

        if (!boards) {
            return res.status(404).json({ message: 'No boards found for this user.' });
        }

        res.json(boards);
    } catch (err) {
        console.error('Error fetching boards:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch boards.' });
    }
};
exports.getBoardById = async (req, res) => {
    const { boardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ message: 'Invalid board ID' });
    }

    try {
        // Find the board by ID and populate its lists and cards
        const board = await Board.findById(boardId)
            .populate({
                path: 'lists',
                populate: {
                    path: 'cards',
                },
            });

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json(board);
    } catch (error) {
        console.error('Error fetching board:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Create a new List and update the board
exports.createList = async (req, res) => {
    const { title, boardId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ message: 'Invalid boardId' });
    }

    try {
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const list = new List({ title, board: boardId });
        await list.save();

        board.lists.push(list._id);
        await board.save();

        res.status(201).json(list);
    } catch (error) {
        console.error('Error creating list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getListsByBoard = async (req, res) => {
    const boardId = req.params.boardId;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return res.status(400).json({ message: 'Invalid boardId' });
    }

    try {
        // Populate cards field
        const lists = await List.find({ board: boardId }).populate('cards');
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create a new Card and update the list
exports.createCard = async (req, res) => {
    const { title, listId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(listId)) {
        return res.status(400).json({ message: 'Invalid listId' });
    }

    try {
        const card = new Card({ title, list: listId });
        await card.save();

        // Update the list to include the new card
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        list.cards.push(card._id);
        await list.save();

        res.status(201).json(card);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Ensure to add this method to your controller if you are using it
exports.getCardsByList = async (req, res) => {
    try {
        const cards = await Card.find({ list: req.params.listId });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getWorkspaceById = async (req, res) => {
    const workspaceId = req.params.id;

    try {
        // Validate if workspaceId is a valid ObjectId, otherwise handle it differently
        const isValidObjectId = mongoose.Types.ObjectId.isValid(workspaceId);

        let workspace;
        if (isValidObjectId) {
            workspace = await Workspace.findById(workspaceId);
        } else {
            workspace = await Workspace.findOne({ id: workspaceId });
        }

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        res.status(200).json(workspace);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching workspace', error });
    }
};
// Add a new member to the workspace
exports.addMember = async (req, res) => {
    const { name, email } = req.body;
    try {
        const workspace = await Workspace.findById(req.params.id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        if (workspace.members.length >= workspace.maxMembers) {
            return res.status(400).json({ message: 'Max members reached' });
        }

        const newMember = { name, email, lastActive: new Date() };
        workspace.members.push(newMember);
        await workspace.save();
        res.status(201).json(workspace);
    } catch (error) {
        res.status(400).json({ message: 'Error adding member', error });
    }
};

// Generate a new invite link
exports.generateInviteLink = async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id);
        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }
        const newInviteLink = `http://localhost:4200/invite/${workspace._id}`;
        workspace.inviteLink = newInviteLink;
        await workspace.save();
        res.status(200).json({ inviteLink: newInviteLink });
    } catch (error) {
        res.status(400).json({ message: 'Error generating invite link', error });
    }
};