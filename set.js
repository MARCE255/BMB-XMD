const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkRmcDBYcWRraTB0alRBb05HWlM3eHZPRzFTZm5xQkdhcmFDVzZYNjlrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1lMdDRsUVRtOHlCVlpFQWxnZUhLM1RhRG8rSDJ2TFpPbUN3N0RSN2lEQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNRE9Hd2Q0eXpDeDZvUGNMWHpqOU16aHM2TG9vMmFvQXBZUy8rM25ORUVRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJVlludjFXd0tZZ3l4c2RHRG1NUEhrTjZTZ3I0MUw2K1VNcjU3U0JNMkhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllBaTN0dmtlaDQ3M3pDOE1TYTJ2cDk4VzU2SERlRndEWlZCTlROU1ZJWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV2QXFvQzZZdGVXclZ6Sk1YVWZoZFZJWC92Sk5pR0pmVXF6dlpTK0puRjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUk4U1RiTzNESlNNN0dyWUgxMWI3V2puZlJHTDJJQVJBdUhvR1V2YVdYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemZ6RWJWSWtZSWtJaVFwVFVxMURCMnY5RUh1d2t0c3JTdFZVTlY0QUh4RT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFML3hGdkdXSTcwR2FySFgwZXpUVnFHRlJoT1BUcTVTQ24wUkYyWnp4RFJ4Z3I0VWlQY2RpSjc1U1ZpckFMVnhvbDJOTjNtcGFEWTZvL3h5YWVpV2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUyLCJhZHZTZWNyZXRLZXkiOiIwTkZuR0w5bU9sbkNvSXI3dEYvSDhCKzBhQ1g0Z3ZSeE9wcGJkcW15eDdnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY1MjM5ODYxNEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzNEQyOUYzQ0JBMjAxNEFBNzU2NDRGMzNFNTUwNzJDRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxNzg3NzE5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NTIzOTg2MTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzcxMzhCNUFGOEFFRDdCRjNFMDJGMzNBRDU2RDc4NzAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTc4NzcxOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUkZHWlhQRFEiLCJtZSI6eyJpZCI6IjI1NTY1MjM5ODYxNDo4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTA1MjUzMDg5MzMzMjc1OjhAbGlkIiwibmFtZSI6Ik5pY29sYXVzIERhbmllbCAy8J+YiPCfmIjwn5iIIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbXQ0TTRIRUp2UnFNTUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI5QnNGdWVWdi84WDU4bDhKTjdRVzFydzIyZlhWQjU1am80dTBwT2V2eFYwPSIsImFjY291bnRTaWduYXR1cmUiOiJpM3M3ZytPbjZ6SHViNGlJRGhmVm41R0J3YmdkZTFUZXhHOXV6aE1sTUs4M1lJWFdBVFFqUnBSN0lCcFdaSmx4cVdHa0thdzBJNGgwYkR2SURZWUREZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVlhIRGppaktXNW8xeEQxLzh4TmlKUitOZEoycWtGNDVyY2lDL1hXKzVFazZoU0Y4TytHVCtwZlZiSGw3bHJ0OGhXdzErSWoxdzlNdVR1OEllUjU4aXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2NTIzOTg2MTQ6OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmUWJCYm5sYi8vRitmSmZDVGUwRnRhOE50bjExUWVlWTZPTHRLVG5yOFZkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTE3ODc2OTAsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSTdOIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Nicolaus Daniel 2😈😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255652398614",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

