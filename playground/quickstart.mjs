import * as dotenv from 'dotenv'
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";
dotenv.config()

// TODO REMOVE THIS
const OPENAI_API_KEY = "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"
const model = new OpenAI({
  temparature: 0.9,
  openAIApiKey: OPENAI_API_KEY
})




// LLM Chain
// const template = "Please give me a content generation idea of {topic}. The content is for {socialMediaName}. Translate it to {language}"
// const prompt = new PromptTemplate({
//   template,
//   inputVariables: ["topic", "socialMediaName", "language"]
// })
// const chain = new LLMChain({ prompt, llm:model})

// const res = await  chain.call({
//   topic: "web development",
//   socialMediaName: "linkedin",
//   language: "spanish"
// })
// console.log(res)


// Sequential Chain for Multiple Prompt 
const templateOne = "Suggest a name of company for {topic}"
const promptOne = new PromptTemplate({
  template: templateOne,
  inputVariables: ["topic"]
})
const templateTwo = "Give me a eyecatchy headline for {name}"
const promptTwo = new  PromptTemplate({
  template: templateTwo,
  inputVariables: ["name"]
})

const chainOne = new LLMChain({prompt:promptOne, llm: model})
const chainTwo = new LLMChain({prompt:promptTwo, llm: model})

const overallChain = new SimpleSequentialChain({chains: [chainOne, chainTwo], verbose:true})
const res2 = await overallChain.run("Mobile, Computer, Calculator")
console.log(res2);