"use client";
import { useState } from "react";

function ImageGenerator() {
  const [inputValue, setInputValue] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prompt = `Generate an image of ${inputValue}`;
    const { Configuration, OpenAIApi } = require("openai");

    // this key is not wroking which is why we are using manual here below
    // const configuration = new Configuration({
    //   apiKey: process.env.OPENAI_API_KEY,
    // });

    const configuration = new Configuration({
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    const url = response.data.data[0].url;
    // console.log(url);
    setGeneratedImageUrl(url);
  };

  return (
    <div className="w-screen flex justify-center items-center align-middle h-screen  ">
      <div>
        <div className="flex flex-col align-middle items-center">
          <form onSubmit={handleSubmit} className={"flex flex-col "}>
            <label className="m-2">
              <span className="text-lg font-medium mr-4 ">Your Thoughts:</span>

              <input
                className="border-x-2 border-spacing-1  border-black rounded-lg p-1 border-y-2 "
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
            </label>
            <button
              type="submit"
              className=" border-2 border-gray-800 rounded-full p-2 m-2 mt-4 bg-gray-200 hover:bg-gray-300 font-medium "
            >
              Generate Image
            </button>
          </form>
          <div className=" border-4 m-4 h-5/5 w-5/5 bg-gray-400 mt-20 ">
            {generatedImageUrl && (
              <img src={generatedImageUrl} alt="Generated Image" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGenerator;
