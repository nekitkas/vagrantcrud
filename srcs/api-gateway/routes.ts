import {Router, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import moviesProxyMW from "./proxy";

dotenv.config();

const router = Router();

router.use('/api/movies', moviesProxyMW);

export default router;