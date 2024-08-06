import { Request } from 'express';

interface MovieParams extends Request {
    params: {
        id: string;
    };
}

interface MovieQuery extends Request {
    query: {
        title: string;
    };

}

interface MovieBody extends Request {
    body: {
        title: string;
        description: string;
    };
}

interface MovieUpdate extends Request {
    params: {
        id: string;
    };
    body: {
        title: string;
        description: string;
    };
}

export { MovieParams, MovieQuery, MovieBody, MovieUpdate };