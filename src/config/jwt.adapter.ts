import jwt from 'jsonwebtoken';
import type {StringValue} from "ms";

export class JwtAdapter {
    static async generateToken(payload: Object, duration: StringValue = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, 'SEED', {expiresIn: duration}, (err, token) => {
                if (err) return resolve(null);
                resolve(token!);
            });
        });
    }
}