const express = require("express");
const { json } = require("body-parser");
const bodyParser = require('body-parser')
const cors = require('cors')



const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: {api_key},
});

const openai = new OpenAIApi(configuration);



app.post('/', async (req, res) => {
    const { message } = req.body
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` write the hardhat testing code for below smart contract in JS : ${message}`,
        max_tokens: 700,
        temperature: 0,
    });

    res.json({
        data: response.data
    })
    console.log(message)
    
    console.log(response.data.choices[0].text)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})