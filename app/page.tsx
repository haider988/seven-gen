"use client";
import { useState } from "react";
import { runAI } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ReactMarkDown from 'react-markdown';

const Page = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [promptInput, setPromptInput] = useState("");

  const handleClick = async (e:any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await runAI(promptInput);
      setResponse(data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-5">
      <form onSubmit={handleClick}>
        <Input
          placeholder="Enter your prompt"
          className="mb-5"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
        />
        <Button type="submit">Generate with AI</Button>
      </form>

      <Card className="mt-5">
        <CardHeader>AI Response will appear here...</CardHeader>
        <CardContent>
          {isLoading ? <div>{"Loading..."}</div> : <ReactMarkDown>{response}</ReactMarkDown>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
