/* eslint-disable @typescript-eslint/no-empty-interface */
import { Students, Tutors, Users } from "@prisma/client";

declare global {
  namespace Express {
    interface Request extends CustomRequest {}
  }
}

export interface CustomRequest {
  user: Users | null;
  file: object;
  params: object;
  query: object;
  path: object;
  token?: string | null;
  tutor?: Tutors | null;
  student?: Students | null;
  authOptional?: boolean;
}
