import {Response} from 'express';

// Express res.send function that send response of type T
export const typedSend = <T>(res: Response) => (payload: T, status: number = 200) => res.status(status).send(payload);