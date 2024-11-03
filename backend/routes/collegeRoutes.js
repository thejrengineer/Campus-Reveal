// routes/collegeRoutes.js

import express from 'express';
import { getCollegeById, getAllColleges } from '../controllers/collegeController.js';
import { requestCollege } from '../controllers/collegeController.js';

const router = express.Router();

// Route to fetch college details by ID
router.get('/:collegeId', getCollegeById);

// Route to fetch all college details or search by name
router.get('/', getAllColleges);


// Route to handle college addition request
router.post('/request-college', requestCollege);

export default router;
