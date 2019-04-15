import fetchJsonp from "fetch-jsonp";
const md5 = require("md5");

const fetchGravatar = (email: string) => {
  const hashedMail = md5(email.toLowerCase());
  const gravatarUrl =
    "https://www.gravatar.com/avatar/" + hashedMail + "?s=160";
  return gravatarUrl;
};

export const fetchGravatarUserInfo = (email: string) => {
  const hashedMail = md5(email.toLowerCase());
  const gravatarProfileUrl = "https://www.gravatar.com/" + hashedMail + ".json";
  return fetchJsonp(gravatarProfileUrl, {
    mode: "no-cors",
    responseType: "application/json"
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res.entry[0] || undefined;
    });
};

export default fetchGravatar;
