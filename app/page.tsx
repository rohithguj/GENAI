'use client'
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

export default function Home() {
  const [level, setLevel] = useState("beginner");
  const [resourceType, setResourceType] = useState("dynamic");
  const [inputValue, setInputValue] = useState("");

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
    newResouceType: string | null
  ) => {
    if (newResouceType !== null) {
      setResourceType(newResouceType);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendButtonClick = (input: string) => {
    // Handle sending input value
    console.log("Sending input value:", inputValue);
  };

  const handleRegenerateButtonClick = (input:string) => {
    // Handle generating learning path
    console.log("Regenerating learning path");
  };

  return (
    <main className="mx-auto px-3 py-8 bg-zinc-800 h-screen">
      <div className="h-5/6">
        <div className="mb-6 flex justify-end p-4">
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
                  <ToggleButton value="intermediate" className="text-slate-300">
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
                  aria-label="Level of Understanding"
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

      <div className="flex justify-between">
        <div className="flex-grow pr-4">
          <Input
            type="text"
            color="primary"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your query..."
            className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-end">
          <ButtonGroup>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleSendButtonClick(inputValue)}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => handleRegenerateButtonClick(inputValue)}
            >
              Regenerate
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
