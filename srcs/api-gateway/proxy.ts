import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from "dotenv";

dotenv.config();

const inventoryAppHost = process.env.INVENTORY_APP_HOST;
const inventoryAppPort = process.env.INVENTORY_APP_PORT;

console.log(`[API-GATEWAY]: inventory app host: ${inventoryAppHost}`);
console.log(`[API-GATEWAY]: inventory app port: ${inventoryAppPort}`);

const moviesProxyMW = createProxyMiddleware({
    target: `http://${inventoryAppHost}:${inventoryAppPort}`,
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': '/movies',
    },
    on: {
        proxyReq: fixRequestBody}
    });

export default moviesProxyMW;