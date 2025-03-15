"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useParams } from "next/navigation"; // ✅ Use useParams() instead

export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

const Page = () => {
  const params = useParams(); // ✅ Correct way in App Router

  if (!params || !params.slug || typeof params.slug !== "string") {
    return <div>Invalid slug</div>;
  }

  const t = template.find((item) => item.slug === params.slug) as Template;

  if (!t) {
    return <div>Template not found</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    console.log("Input changed:", e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
        <Link href="/dashboard">
          <ArrowLeft className="w-6 h-6 mb-4" />
        </Link>
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
                  onChange={handleChange}
                />
              ) : (
                <Textarea
                  name={item.name}
                  required={item.required}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full py-6">
            Generate Content
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
