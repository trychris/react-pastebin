import express from 'express';

const PORT = process.env.PORT || 5001;
const app = express();

function genRand() {
    return Math.random().toString(36).slice(2)
}

var fakeDataKeys = ['0b42rwhf', '0C343n0d', '0C34dfgdfg', '0C34dfgdf', 'mlsdfinv', 'fdfsdkg']
var fakeData = [
    `
        <paste_date>1297953260</paste_date>
        <paste_title>javascript test</paste_title>
        <paste_size>15</paste_size>
        <paste_expire_date>1297956860</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>JavaScript</paste_format_long>
        <paste_format_short>javascript</paste_format_short>
        <paste_url>https://pastebin.com/0b42rwhf</paste_url>
        <paste_hits>15</paste_hits> `,
    `
        <paste_date>1297694343</paste_date>
        <paste_title>Welcome To Pastebin V3</paste_title>
        <paste_size>490</paste_size>
        <paste_expire_date>0</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>None</paste_format_long>
        <paste_format_short>text</paste_format_short>
        <paste_url>https://pastebin.com/0C343n0d</paste_url>
        <paste_hits>65</paste_hits>`,

    `
        <paste_date>1297694343</paste_date>
        <paste_title>Welcome To Pastebin V3</paste_title>
        <paste_size>490</paste_size>
        <paste_expire_date>0</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>None</paste_format_long>
        <paste_format_short>text</paste_format_short>
        <paste_url>https://pastebin.com/0C343n0d</paste_url>
        <paste_hits>65</paste_hits>`,
    `
        <paste_date>1297694343</paste_date>
        <paste_title>Welcome To Pastebin V3</paste_title>
        <paste_size>490</paste_size>
        <paste_expire_date>0</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>None</paste_format_long>
        <paste_format_short>text</paste_format_short>
        <paste_url>https://pastebin.com/0C343n0d</paste_url>
        <paste_hits>65</paste_hits>`,
    `
        <paste_date>1297694343</paste_date>
        <paste_title>Welcome Tdfdf</paste_title>
        <paste_size>490</paste_size>
        <paste_expire_date>0</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>None</paste_format_long>
        <paste_format_short>text</paste_format_short>
        <paste_url>https://pastebin.com/0C343n0d</paste_url>
        <paste_hits>65</paste_hits>`,
    `
        <paste_date>1297694343</paste_date>
        <paste_title>safsadfsafsafsd</paste_title>
        <paste_size>490</paste_size>
        <paste_expire_date>0</paste_expire_date>
        <paste_private>0</paste_private>
        <paste_format_long>None</paste_format_long>
        <paste_format_short>text</paste_format_short>
        <paste_url>https://pastebin.com/0C343n0d</paste_url>
        <paste_hits>65</paste_hits>`
]
for (var i = 0; i < fakeData.length; i++) {
    fakeData[i] = `<paste> <paste_key>` + fakeDataKeys[i] + `</paste_key>` + fakeData[i] + `</paste>`
}

var fakeDataXml = fakeData.join('')

app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', async (req, res) => {
    res.send('Welcome to PasteBin api');
});

app.post('/api_post', async (req, res) => {
    if (req.body.hasOwnProperty('api_option')) {
        switch (req.body.api_option) {
            case 'paste':
                res.status(200).json('https://pastebin.com/' + genRand())
                break
            case 'delete':
                var index = fakeDataKeys.indexOf(req.body.api_paste_key)
                if (index >= 0) {
                    fakeDataKeys.splice(index, 1)
                    fakeData.splice(index, 1)
                    fakeDataXml = fakeData.join('')
                }
                res.status(200).json('Paste removed')
                break
            case 'list':
                res.status(200).json(fakeDataXml)
                break
            default:
                res.status(422).json('Bad API request')
        }

    }

});
app.post('/api_login', async (req, res) => {
    res.status(200).json('abcdefghijklmnop')
});

app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));