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
function GetParams(){}

async function CreateModule(whole,sub,namecompany) {
    const configai = GetAi();
    function genname(namecompany) {
        const namesplit = namecompany.split(" ");
        if(namesplit.length > 1 && namecompany != undefined){
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
            messages: [{ role: 'user', content: `Create a js fucntion that starts with export default {returnwholeprice: (whole, sub) that returns the price like 69.95 whole is given as ${whole} and sub as ${sub}. give only the function back as response` }],
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