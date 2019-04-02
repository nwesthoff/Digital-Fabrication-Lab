import * as md5 from 'md5';

const fetchGravatar = (email: string) => {
  const hashedMail = md5(email.toLowerCase());
  const gravatarUrl =
    'https://www.gravatar.com/avatar/' + hashedMail + '?s=160';
  return gravatarUrl;
};
export default fetchGravatar;
