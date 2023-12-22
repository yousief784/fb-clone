import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => bcrypt.hashSync(password, 8);

export const verifyPassword = (password: string, encryptedPassword: string): Boolean =>
    bcrypt.compareSync(password, encryptedPassword);
