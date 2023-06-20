import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

// get token
const getToken = (authToken: string): string => {
  const match = authToken.match(/^Bearer (.*)$/);
  if (!match || match.length < 2) {
    throw new HttpException(
      { message: 'invalid bearer token' },
      HttpStatus.UNAUTHORIZED,
    );
  }
  console.log(match[1]);
  return match[1];
};

// decode the token get payload
const decodeToken = (tokenString: string) => {
  const decoded = jwt.verify(tokenString, 'top-secret');
  if (!decoded) {
    throw new HttpException(
      { message: 'invalid auth token' },
      HttpStatus.UNAUTHORIZED,
    );
  }
  return decoded;
};

// auth helper
export const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      //   TODO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const token = getToken(req.headers.authorization);
      const decoded: any = decodeToken(token);
      console.log(decoded);

      return {
        userId: decoded.sub,
        // permissions: decoded.permissions,
        // authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};
