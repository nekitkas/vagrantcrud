import Router from 'express';
import {getOrders} from "../controllers/order";
const router = Router();

router.get('/health', (req, res) => {
    res.status(200).send('[Billing-service] Health check passed!');
});

router.get('/billing', getOrders);

export default router;