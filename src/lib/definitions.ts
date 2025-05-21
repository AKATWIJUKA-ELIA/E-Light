import { JWTPayload } from 'jose';
export interface SessionPayload extends JWTPayload {
  userId: string;
  role: string; 
  isVerified: boolean;
  expiresAt:Date
}