export const jwtEnvironmentConfiguration = () => ({
  jwt: {
    privateKey: process.env.JWT_PRIVATE_KEY || '',
    publicKey: process.env.JWT_PUBLIC_KEY || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '10s',
    algorithm: process.env.JWT_ALGORITHM || 'RS512',
  },
});
