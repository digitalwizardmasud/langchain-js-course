import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions, AgentExecutor } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// TODO REMOVE THIS
// const OPENAI_API_KEY = "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"
const model = new OpenAI({
  temparature: 0.9,
  verbose: true
})




// ### LLM Chain
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


// ### Sequential Chain for Multiple Prompt 
// const templateOne = "Suggest a name of company for {topic}"
// const promptOne = new PromptTemplate({
//   template: templateOne,
//   inputVariables: ["topic"]
// })
// const templateTwo = "Give me a eyecatchy headline for {name}"
// const promptTwo = new  PromptTemplate({
//   template: templateTwo,
//   inputVariables: ["name"]
// })

// const chainOne = new LLMChain({prompt:promptOne, llm: model})
// const chainTwo = new LLMChain({prompt:promptTwo, llm: model})

// const overallChain = new SimpleSequentialChain({chains: [chainOne, chainTwo], verbose:true})
// const res2 = await overallChain.run("Mobile, Computer, Calculator")
// console.log(res2);

// ### Tools
const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    hl: "en",
    gl: "us"
  }),
  new Calculator()
]

// ### Action Agent
// const executor = await initializeAgentExecutorWithOptions(tools, model, {
//   agentType: 'zero-shot-react-description',
//   verbose: true,
//   maxIterations: 5
// })
// const input = "what is langchain"
// const result = await executor.call({input})
// console.log(result);



// ### Plan + Action Agent
// const chatModel = new ChatOpenAI({
//   temparature: 0.9,
// })

// const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
//   llm: chatModel,
//   tools: tools
// })

// const result = await executor.call({
//   input: "What is the age of current president of Bangladesh and make their age root over  and give me the answer"
// })

// console.log(result);


// ### memory
const memory = new BufferMemory()
const tools2  = [
  new Calculator()
]
const conversationChain =  new ConversationChain({llm:model, memory})


const res1 = await conversationChain.call({
  input: "Hey, I am Masud, I am 22 years old"
})

const res2 = await conversationChain.call({
  input: "What is my date of birth"
})

console.log(res1, 'res1');
console.log(res2, 'res2');