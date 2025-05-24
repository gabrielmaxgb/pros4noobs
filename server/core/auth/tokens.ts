import jwt from 'jsonwebtoken';

// TODO(titosilva): create a refresh token based on local storage
// TODO(titosilva): implement a better token validation strategy - enforce fields

const generateToken = (userId: string) => {
    const secret = process.env.JWT_SECRET ;
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }

    const expiresIn = '1d';

    const token = jwt.sign({ id: userId }, secret, { expiresIn });
    return token;
}

const verifyToken = (token: string) => {
    const secret = process.env.JWT_SECRET ;
    if (!secret) {
        throw new Error('JWT secret is not defined');
    }

    try {
        const decoded = jwt.verify(token, secret);
        
        const data = decoded as { id: string };
        return data.id;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export { generateToken, verifyToken };
