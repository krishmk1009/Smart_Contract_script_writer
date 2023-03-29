const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
});







console.log(response.data.choices[0].message);
