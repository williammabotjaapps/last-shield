declare module 'last-shield' {
    export function verifyToken(token: string): { valid: boolean; decoded?: any; error?: any };
    export function hasRole(decoded: { role: string }, role: string): boolean;
    export function generateToken(payload: { account_no: string; user_role: string }): string;
    export function refreshToken(token: string): string | null;
}