import { UnauthorizedError } from "../../error/errors";
import { checkUser } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import { TokenDto } from "./dto/token.dto";

const jwt = require('jsonwebtoken');

const createToken = (loginDto: LoginDto): TokenDto => {
    const user = checkUser(loginDto.username, loginDto.password);
    if (!user) {
        throw new UnauthorizedError('Invalid username or password');
    }
    
    //We create and sign the token with the user id and the secret key
    const payload = { sub: user!.id, username: user!.username };
    const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    
    return { token: token };
}

export { createToken }
