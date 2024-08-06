import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import dotenv from "dotenv";

dotenv.config();

const moviesProxyMW = createProxyMiddleware({
    target: `http://localhost:${process.env.MOVIES_SERVICE_PORT}`,
    changeOrigin: true,
    pathRewrite: {
        '^/api/movies': '/movies',
    },
    on: {
        proxyReq: fixRequestBody}
    });

export default moviesProxyMW;