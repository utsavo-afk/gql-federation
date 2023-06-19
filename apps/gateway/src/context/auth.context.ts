import { UnauthorizedException } from '@nestjs/common';

// auth helper
export const handleAuth = ({ req }) => {
  try {
    if (req.headers.authorization) {
      //   TODO
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const token = {}; //getToken(req.headers.authorization);
      const decoded: any = {}; //decodeToken(token);
      return {
        userId: decoded.userId,
        permissions: decoded.permissions,
        authorization: `${req.headers.authorization}`,
      };
    }
  } catch (err) {
    throw new UnauthorizedException(
      'User unauthorized with invalid authorization Headers',
    );
  }
};
