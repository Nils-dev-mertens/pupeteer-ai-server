import ollama from "ollama";
import fs from "fs/promises";
import config from "./config.json" assert {type: "json"};
function GetAi() {
    if(config.AIbool == true && config.AI.Ollama.Enabled == true){
        return {"name" : "ollama", "version": "llama3.1"}
    } else if(config.AIbool == true && config.AI.Chatgtp.Enabled == true){
        return {"name" : "chatgtp", "version": "latest"}
    } else {
        return null;
    }
}
async function GetParams(htmlin){
    const configai = GetAi();
    async function Givewholequery(html) {
        const response = await ollama.chat({
            model: configai.version,
            messages: [{ role: 'user', content: `Create the cssqueryselector for the first part of a price so the full numbers of ...,... you are given the html ${html}. only return the queryselector` }],
          })
          return response.message.content;
    }
    async function Givesubquery(html) {
        const response = await ollama.chat({
            model: configai.version,
            messages: [{ role: 'user', content: `Create the cssqueryselector for the last part of a price so the cents of ...,... you are given the html ${html}. only return the queryselector` }],
          })
          return response.message.content;
    }
    const wholeselector = await Givewholequery(htmlin);
    const subselector = await Givesubquery(htmlin);
    return [await wholeselector, await subselector];
}

async function CreateModule(whole,sub,namecompany) {
    const configai = GetAi();
    function genname(namecompany) {
        const namesplit = namecompany.split(" ");
        if(namesplit.length >= 1 && namecompany != undefined){
            let namegenfun = "";
            namesplit.forEach(element => {
                if(element != "."){
                namegenfun += element;
                }
            });
            return namegenfun;
        }
    }
    async function CreateLogicModule() {
        const response = await ollama.chat({
            model: configai.version,
            messages: [{ role: 'user', content: `Create a JavaScript module that exports an object with a method named returnwholeprice. This method takes two parameters: whole ${whole}(a number representing the whole part of a price) and sub (a number representing the fractional part)like ${sub}. It should return a string formatted as {whole},{sub}. Ensure the function is concise and correctly structured for ES6 module export. only return the js function nothing else` }],
          })
          return response.message.content;
    }
    const logic = await CreateLogicModule();
    const logictextsplit = logic.split('\n');
    const logictext = logictextsplit.slice(1,logictextsplit.length - 1);
    let output = "";
    logictext.forEach(element => {
        output += element;
    });
    console.log(output);
    fs.writeFile(`modules/${genname(namecompany)}.js`, `${output}`);
}
// CreateModule("20 \n", "  30", "damm");