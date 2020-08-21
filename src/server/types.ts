export type JWTPayload = { id: string, iat: number, exp: number };

export enum TokenType {'access', 'refresh'}