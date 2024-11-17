import fs from 'fs/promises';
import readline from 'node:readline';
import inquire from "inquirer"
import config from "./config.json" assert {type: "json"};
const args = process.argv.slice(2);
function createReadlineInterface() {
  return readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
}
if (Object.keys(config).length === 0 || args[0] == "-f") {
  createconfig()
}
function createconfig() {
  let rl = createReadlineInterface();
  const currencyQuestion = [{
    type : "list",
    name : "currency",
    message : "Select a currency",
    choices :  ["USD","EUR","JPY","CNY","AUD","NZD","GBP"]
  }];
  const ChatGTPQuestion = [{
    type : "list",
    name : "chatgtp",
    message : "Do you have a chat gtp token?",
    choices :  ["yes", "no"]
  }];
  const OllamaQuestion = [{
    type : "list",
    name : "model",
    message : "Select een model",
    choices :  ["llama3.1", "deepseek-coder", "none"]
  }];
  let currency = "USD";
  let ollama = "llama3.1";
  let chatgtp = "no";
  let AIbool = false;
  let chatgtpbool = true;
  let ollamabool = true;
  inquire.prompt(currencyQuestion).then((currencyAnswer) => {
    currency = currencyAnswer.currency;
  }).then(() =>
    inquire.prompt(OllamaQuestion).then((ollamaAnswer) => {
      ollama = ollamaAnswer.model;
    })
  ).then(() =>
    inquire.prompt(ChatGTPQuestion).then((chatgtpAnswer) => {
      chatgtp = chatgtpAnswer.chatgtp;
      if(chatgtpAnswer.chatgtp === "yes"){
        rl.question(`Insert the token here `, answer => {
            chatgtp = answer;
        });
      }
        if(chatgtp === "no")
          {
            chatgtp = null;
            chatgtpbool = false;
          }
        if(ollama ===  "none"){
          ollama = null;
          ollamabool = false;
        }
        if(ollamabool === true ||  chatgtpbool === true ) {
            AIbool = true;
        }
        const data = {
          "Currency" : currency,
          "AIbool" : AIbool,
          "AI": {
              "Chatgtp" : {
                  "Enabled" : chatgtpbool,
                  "Version" : chatgtp
              },
              "Ollama" : {
                  "Enabled" : ollamabool,
                  "Version" : ollama
              }
          }
        };
        fs.writeFile("config.json", JSON.stringify(data, null, 2));
    })
  );
}