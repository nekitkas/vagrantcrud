import { createProxyMiddleware, fixRequestBody, debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin } from 'http-proxy-middleware';

const inventory_host = process.env.INVENTORY_APP_HOST;
const inventory_post = process.env.INVENTORY_APP_PORT;
const billing_host = process.env.BILLING_APP_HOST;
const billing_post = process.env.BILLING_APP_PORT;

console.log(`[API-GATEWAY]: inventory app host: ${inventory_host}`);
console.log(`[API-GATEWAY]: inventory app port: ${inventory_post}`);
console.log(`[API-GATEWAY]: billing app host: ${billing_host}`);
console.log(`[API-GATEWAY]: billing app port: ${billing_post}`);

export const moviesProxyMW = createProxyMiddleware({
    target: `http://${inventory_host}:${inventory_post}`,
    changeOrigin: true,
    ejectPlugins: true,
    pathRewrite: {
        '^/api/movies': '/movies',
    },
    on: {
        proxyReq: fixRequestBody
    },
    plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin]
});

export const ordersProxyMW = createProxyMiddleware({
    target: `http://${billing_host}:${billing_post}`,
    changeOrigin: true,
    ejectPlugins: true,
    pathRewrite: {
        '^/api/billing': '/billing',
    },
    on: {
        proxyReq: fixRequestBody
    },
    plugins: [debugProxyErrorsPlugin, loggerPlugin, errorResponsePlugin, proxyEventsPlugin]
});
