import { QueryRecord } from "@/utils/types";
import { Copy } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  data: QueryRecord[];
}

const wordCount = (text: string) => {
  return text.split(" ").length;
};

const QueryTable = ({ data }: Props) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="overflow-x-auto ">
      <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4  text-left">TEMPLATE</th>
            <th className="py-2 px-4  text-left">QUERY</th>
            <th className="py-2 px-4  text-left">DATE</th>
            <th className="py-2 px-4  text-left">WORDS</th>
            <th className="py-2 px-4  text-left">COPY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((query) => (
            <tr key={query._id} className="hover:bg-gray-100 dark:bg-gray-600">
              <td className="py-2 px-4 ">
                <div className="flex">
                  <Image
                    src={query.template.icon}
                    alt="icon"
                    width={20}
                    height={20}
                  />
                  <div className="ml-2">{query.template.name}</div>
                </div>
              </td>
              <td className="py-2 px-4  line-clamp-2">{query.query}</td>
              <td className="py-2 px-4  ">
                {new Date(query.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4  ">
                {wordCount(query.content)}
              </td>
              <td className="py-2 px-4  ">
                <button
                  onClick={() => {
                    handleCopy(query.content);
                  }}
                  className="flex items-center cursor-pointer"
                >
                  <Copy className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable;
