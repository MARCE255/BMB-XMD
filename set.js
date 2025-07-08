const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZrendHY1ljc3B0MFB5VXZOQ1pYbzd5UFFxbWpPWFhVcDkreEhDK0RWRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1NGb0pyVkRFQ3phR3FsY1RrM0k3TGlDNFpzQzhyOEI5eUxpaGJUT3h6az0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRENLSE1TUkdhbjNsZzBtYjZwT3pYdFhxRXFmUnhmQ3RmQ1NKcDV6Mm4wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJodldFYnBlY2pwRTlyRkJ4NHVwUjRWNTBlR29oVVVVb2w2SGRDRUtjSG1RPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNEaGxybm1DTGlKa0xhMTR2QzFWaWVxeTNkWVVHSW1uaE4zRWxvd2NXR289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMcUFNdGh0Y3dHd0x1aCtGQlhkNzIyQzY0NEVZTlBCWmFLeEtqNDRlZ0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUsvQi9mTWJ0eXErd2NzSWJtY1dTSGtmOFVyd3BSclFBdTk3cUFBY2MwYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWVV2ZTdnVWswVDVWZVRsYitIYkllcFY1bFFIRU1CQi9BWHVyNGc5bUhDVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBndVdXYWxhYmhoR2tRWjZreUVJKzdJdHprdWZnMGh0OXduSThtUlg4ZGdSK0FpTkFqS1ZWYktQbmQzY1hCNkoxLzlTSWFGeEY1SHU5aysyZ2xieEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJoWEVqemdLcFhwc0pBTm1vNElxQjNBbmRZOThRVDliV29HYnZTSGdOY2ZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJNTlM4WVNFQyIsIm1lIjp7ImlkIjoiMjU1NjUyMzk4NjE0OjlAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMDUyNTMwODkzMzMyNzU6OUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pxdDRNNEhFS3J5czhNR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlCc0Z1ZVZ2LzhYNThsOEpON1FXMXJ3MjJmWFZCNTVqbzR1MHBPZXZ4VjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImsxTG5wSXVqeUg2ZlJ5TThNRWpaZUM4WGdoSzdER29jUHVLZTNXaFVWMXZVQ1FpME5vQ3ovZDJEbjJQVExWZmt3SmR3NEJDTVhtdVFUYlFUMTVZNkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJmMTVRYzN2UXVkdk9MZ2ZkTTlXWEZ3ZHZtenhmUjlNZTF4Z0NWbGxIUnY2SHNBdjZRL2R5cUJFTHA1RWd6RS9CWTJIN3J5K1p6eUdWRDlyRFVnd1pDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTY1MjM5ODYxNDo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZRYkJibmxiLy9GK2ZKZkNUZTBGdGE4TnRuMTFRZWVZNk9MdEtUbnI4VmQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTk3MjE1MiwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJN0cifQ==',
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

