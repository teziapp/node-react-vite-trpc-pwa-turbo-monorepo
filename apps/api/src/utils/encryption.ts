import bcrypt from 'bcrypt';


export const encryptPassword = async (user_pass: string) => {
  const encryptedPassword = await bcrypt.hash(user_pass, 8);
  // const isSame = await bcrypt.compare(user_pass, encryptedPassword);
  // logger.debug(`pass is same: ${isSame} - ${user_pass} - ${encryptedPassword}`);
  return encryptedPassword;
};

export const isPasswordMatch = async (reqPassword: string, dbPassword: string) => {
  return bcrypt.compare(reqPassword, dbPassword);
};
