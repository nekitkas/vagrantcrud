import { Router, Request, Response } from 'express';
import { sendToBillingQueue } from "./rabbitPublisher";
import { moviesProxyMW, ordersProxyMW }from "./proxy";

const router = Router();

router.post('/api/billing', async (req: Request, res: Response) => {
    /*  #swagger.auto = false
        #swagger.tags = ['Billing']

        #swagger.path = '/billing'
        #swagger.method = 'post'
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']

        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Order data.',
            required: true,
            schema: { $ref: "#/definitions/Order" },
        }

        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Order" },
            description: 'Order details'
        }
    */
    try {
        await sendToBillingQueue(req.body);
        res.status(200).send('Message sent to queue');
    } catch (error) {
        res.status(500).send('Failed to send message to queue');
    }
});

router.all('/api/movies', moviesProxyMW);
router.get('/api/billing', ordersProxyMW, async (req: Request, res: Response) => {
    /*  #swagger.auto = false
    
        #swagger.tags = ['Billing']
        #swagger.path = '/billing'
        #swagger.method = 'get'
        #swagger.produces = ['application/json']

        #swagger.responses[200] = {
            schema: { $ref: "#/definitions/Order" },
            description: 'Order details'
        }
    */
});

export default router;