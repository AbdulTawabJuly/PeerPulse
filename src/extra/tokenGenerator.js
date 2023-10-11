// const {
//   RtcTokenBuilder,
//   RtmTokenBuilder,
//   RtcRole,
//   RtmRole,
// } = require("agora-access-token");

// const appID = process.env.appID;
// const appCertificate = process.env.appCertificate;
// const channelName = "main";
// const uid = Math.floor(Math.random() * 100000);
// const role = RtcRole.PUBLISHER;
// const expirationTimeInSeconds = 3600;
// const currentTimestamp = Math.floor(Date.now() / 1000);
// const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
// // Build token with uid
// const tokenA = RtcTokenBuilder.buildTokenWithUid(
//   appID,
//   appCertificate,
//   channelName,
//   uid,
//   role,
//   privilegeExpiredTs
// );
// export function tokenGenerator() {
//   return tokenA;
// }
