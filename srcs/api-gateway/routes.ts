import { Router, Request, Response } from 'express';
import { sendToBillingQueue } from "./rabbitPublisher";
import moviesProxyMW from "./proxy";

const router = Router();

router.get('/api/health', (req: Request, res: Response) => {
    res.status(200).send('[GATEWAY] Gateway is up and running!');
});

router.post('/api/billing', async (req: Request, res: Response) => {
    try {
        await sendToBillingQueue(req.body);
        res.status(200).send('Message sent to queue');
    } catch (error) {
        res.status(500).send('Failed to send message to queue');
    }
});

router.all('/api/movies*', moviesProxyMW);

export default router;