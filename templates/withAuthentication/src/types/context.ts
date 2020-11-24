import { Request, Response } from 'express';
import { Session as ExpressSession, SessionData } from 'express-session';

export type Session = ExpressSession &
  Partial<SessionData> & {
    userId?: number;
  };

export type Req = Request & {
  session: Session;
};

export interface Context {
  req: Req;
  res: Response;
}
