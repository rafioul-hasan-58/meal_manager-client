import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    userId: string;
    messId?: string;
    email: string;
    globalRole: string;
    iat: number;
    exp: number;
}

export const decodeToken = (token: string): JwtPayload => {
    return jwtDecode<JwtPayload>(token);
};


