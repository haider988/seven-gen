"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template";
import { ArrowLeft, Copy, Loader2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { runAI, saveQuery } from "@/actions/ai";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Template } from "@/utils/types";

const Page = () => {
  const params = useParams();
  const isValidSlug = params && params.slug && typeof params.slug === "string";

  const t = template.find((item) => item.slug === params.slug) as Template;

  //state
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //ref
  const editorRef = useRef<Editor | null>(null);

  //hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting query:", query);

    try {
      const data = await runAI(t.aiPrompt + query);
      console.log("AI Response:", data);

      setContent(data);

      // Save to database
      const response = await saveQuery(t, email, query, data);
      console.log("Save Query Response:", response);
    } catch (error) {
      console.error("Error generating content:", error);
      setContent("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    const editorInstance = editorRef.current!.getInstance();
    const c = editorInstance.getMarkdown(); //get HTML content
    try {
      await navigator.clipboard.writeText(c);
      toast.success("Content copied to clipboard.");
    } catch {
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!isValidSlug) {
    return <div>Invalid slug</div>;
  }

  if (!t) {
    return <div>Template not found</div>;
  }

  return (
    <div>
      <div className="flex justify-between wf mx-5 my-3">
        <Link href={"/dashboard"}>
          <Button>
            <ArrowLeft />
          </Button>
        </Link>
        <Button onClick={handleCopy}>
          <Copy />
          <span className="ml-2">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          {/* <Link href="/dashboard">
            <ArrowLeft className="w-6 h-6 mb-4" />{" "}
            <span className="ml-2">Back</span>
          </Link> */}
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>
          <form className="mt-6" onSubmit={handleSubmit}>
            {t.form.map((item) => (
              <div key={item.name} className="my-2 flex flex-col gap-2 mb-7">
                <label className="font-bold pb-5">{item.label}</label>
                {item.field === "input" ? (
                  <Input
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                ) : (
                  <Textarea
                    name={item.name}
                    required={item.required}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 cursor-pointer"
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Generate content"
              )}
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
