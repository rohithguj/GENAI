// import OpenAI from "openai";
// import { OPEN_AI_API } from "./constant";

// const openai = new OpenAI({
//   apiKey: OPEN_AI_API,
// });

// export const handleSubmit = async (input: string) => {
//   try {
//     const chatCompletion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "Hello!" }],
//     });

//     console.log("Response:", chatCompletion);
//     return chatCompletion;
//   } catch (error) {
//     console.error("Error:", error);
//     return "Something went wrong. Please try again.";
//   }
// };
