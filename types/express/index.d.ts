type User = {
    sub: string;
    email: string;
}
declare namespace Express {
    interface Request {
        user: User
    }
}