"use client";
import { useState } from "react";
import { process } from "../env";
import {
  Button,
  ButtonGroup,
  Input,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [level, setLevel] = useState("beginner");
  const [resourceType, setResourceType] = useState("dynamic");
  const [inputValue, setInputValue] = useState("");
  const [resp, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const handleLevelChange = (
    event: React.MouseEvent<HTMLElement>,
    newLevel: string | null
  ) => {
    if (newLevel !== null) {
      setLevel(newLevel);
    }
  };

  const handleResourceTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newResourceType: string | null
  ) => {
    if (newResourceType !== null) {
      setResourceType(newResourceType);
    }
  };

  function formatResponse(text: string) {
    // Replace '****' with bold text and '***' with italic text
    const formattedText = text
      .replace(/\*\*\*\*/g, "<strong>") // Replace '****' with opening bold tag
      .replace(/\*\*\*/g, "<em>") // Replace '***' with opening italic tag
      .replace(/\*\*/g, "</strong>") // Replace '**' with closing bold tag
      .replace(/\*/g, "</em>") // Replace '*' with closing italic tag
      .replace(/\n/g, "<br>"); // Replace newline characters with <br> tags

    return formattedText;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendButtonClick = async (input: string) => {
    // Handle sending input value
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      let resourceText = "";
      if (resourceType == "video") {
        resourceText = "videos";
      } else if (resourceType == "text") {
        resourceText = "Blogs, Textbook snippets and Text";
      } else {
        resourceText =
          "Mixed & Detailed with Videos and Blogs Links and Github Repository";
      }
      const prompt = `I want to go to a ${level} and I prefer ${resourceText} kind of learning so generate step wise road plan for me to learn ${inputValue}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const formattedText = formatResponse(text);
      console.log(text);
      setResponse(formattedText);
    } catch (error) {
      console.error("Error:", error);
      return "Something went wrong. Please try again.";
    } finally {
      setInputValue("");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col justify-between min-h-screen bg-zinc-800 p-4">
      <div>
        {resp == "" && (
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center pl-10 pt-20">
              <div className="text-4xl md:text-7xl font-bold text-gray-300">
                Welcome!
              </div>
              <div className="text-lg md:text-3xl  font-semibold text-gray-300 mt-2 whitespace-normal">
                Experience The Unstructured Learning
              </div>
              <div className="text-lg md:text-3xl  font-semibold text-gray-300 mt-2 whitespace-normal">
                At Its Truest Self
              </div>
            </div>
            <div className="mb-6 flex justify-end">
              <div className="flex flex-col backdrop-blur-lg backdrop-opacity-75 bg-zinc-700 rounded-lg p-4">
                <div className="mb-6">
                  <h3 className="mb-2">Level of Understanding</h3>
                  <div className="space-x-4">
                    <ToggleButtonGroup
                      color="standard"
                      value={level}
                      exclusive
                      onChange={handleLevelChange}
                      aria-label="Level of Understanding"
                    >
                      <ToggleButton value="beginner" className="text-slate-300">
                        Beginner
                      </ToggleButton>
                      <ToggleButton
                        value="intermediate"
                        className="text-slate-300"
                      >
                        Intermediate
                      </ToggleButton>
                      <ToggleButton value="advanced" className="text-slate-300">
                        Advanced
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="mb-2 ">Resource Type</h3>
                  <div className="space-x-4">
                    <ToggleButtonGroup
                      color="standard"
                      value={resourceType}
                      exclusive
                      onChange={handleResourceTypeChange}
                      aria-label="Resource Type"
                    >
                      <ToggleButton value="dynamic" className="text-slate-300">
                        Dynamic
                      </ToggleButton>
                      <ToggleButton value="text" className="text-slate-300">
                        Text
                      </ToggleButton>
                      <ToggleButton value="video" className="text-slate-300">
                        Video
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="flex items-center text-lg md:text-3xl text-gray-300">
          Finding optimal Paths...
        </div>
      )}
      {resp !== "" && loading == false && (
        <div dangerouslySetInnerHTML={{ __html: resp }}></div>
      )}

      <div className="flex items-center">
        <Input
          type="text"
          color="primary"
          value={inputValue}
          disabled={loading}
          onChange={handleInputChange}
          size="small"
          placeholder="Enter your query..."
          className="flex-grow border border-gray-300 rounded-md py-2 px-4 focus:outline-none"
          inputProps={{ style: { color: "white" } }} // Set the text color to white
        />

        <div className="pl-4">
          <ButtonGroup>
            <Button
              variant="outlined"
              color="inherit"
              disabled={loading}
              onClick={() => handleSendButtonClick(inputValue)}
            >
              Send
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
