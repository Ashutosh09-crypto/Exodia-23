const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
let vals = {};
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '/config/token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '/config/credentials.json');

const sheetId = "1E26xxhqXmRHV51V605nFn-vZM3DyKIPsg6V2NPoA8do";

module.exports = {
    /**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
    loadSavedCredentialsIfExist: async function () {
        try {
            const content = await fs.readFile(TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    },
    /**
     * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    saveCredentials: async function (client) {
        const content = await fs.readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(TOKEN_PATH, payload);
    },

    /**
     * Load or request or authorization to call APIs.
     *
     */
    authorize: async function () {
        let client = await module.exports.loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = await authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            await module.exports.saveCredentials(client);
        }
        return client;
    },

    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */

    listNotices: async function (auth) {
        const sheets = google.sheets({ version: 'v4', auth });
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Sheet1!A:B',
        });
        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }
        return rows;
    },
    listColleges: async function (auth) {
        const sheets = google.sheets({ version: 'v4', auth });
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Sheet1!A:A',
        });
        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }
        return rows;
    },
    listAllAdmins: async function (auth) {
        const sheets = google.sheets({ version: 'v4', auth });
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: 'Sheet3!A:A',
        });
        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }
        return rows;
    },
    findAllNotices: async function () {
        notices = await module.exports.authorize().then(module.exports.listNotices).catch(console.error);
        return notices;
    },
    findAllColleges: async function () {
        colleges = await module.exports.authorize().then(module.exports.listColleges).catch(console.error);

        collegeList = []
        for (let i = 1; i < colleges.length; i++) {
            collegeList.push(colleges[i][0].toUpperCase());
        }
        return collegeList;
    },
    findAllAdmins: async function () {
        admins = await module.exports.authorize().then(module.exports.listAllAdmins).catch(console.error);
        return admins;
    },
    isAdmin: async function (req) {
        if (!(req.user))
            return false;

        admins = await module.exports.findAllAdmins();
        let admin = false;
        for (let i = 0; i < admins.length; i++) {
            if (req.user.email == admins[i][0])
                admin = true;
        }

        return admin;
    },
    writeData: async function (auth) {
        const sheets = google.sheets({ version: 'v4', auth });
        let values = [vals];
        const resource = {
            values
        };
        sheets.spreadsheets.values.append(
            {
                spreadsheetId: sheetId,
                range: 'Sheet4!A:H',
                valueInputOption: 'RAW',
                resource: resource,
            },
            (err, result) => {
                if (err) {
                    // Handle error
                    console.log(err);
                } else {
                    console.log(
                        '%d cells updated on range: %s',
                        result.data.updates.updatedCells,
                        result.data.updates.updatedRange
                    );
                }
            }
        );
    },
    writeTeamData: async function (auth) {
        const sheets = google.sheets({ version: 'v4', auth });
        let values = [vals];
        const resource = {
            values
        };
        sheets.spreadsheets.values.append(
            {
                spreadsheetId: sheetId,
                range: 'Sheet6!A:D',
                valueInputOption: 'RAW',
                resource: resource,
            },
            (err, result) => {
                if (err) {
                    // Handle error
                    console.log(err);
                } else {
                    console.log(
                        '%d cells updated on range: %s',
                        result.data.updates.updatedCells,
                        result.data.updates.updatedRange
                    );
                }
            }
        );
    },
    writePaymentData: async function (values) {
        vals = values;
        await module.exports.authorize().then(module.exports.writeData).catch(console.error());
        return true;
    },
    writeTeamEntry: async function (values) {
        vals = values;
        await module.exports.authorize().then(module.exports.writeTeamData).catch(console.error());
        return true;
    }
};