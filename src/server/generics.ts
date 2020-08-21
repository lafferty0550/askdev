import {Response} from 'express';

export const typedSend = <T>(res: Response) => (payload: T, status: number = 200) => res.status(status).send(payload);