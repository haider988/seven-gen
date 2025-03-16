"use client";
import { getQueries } from "@/actions/ai";
import QueryTable from "@/components/table/query-table";
import { Button } from "@/components/ui/button";
import { QueryRecord } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface QueryResponse {
  queries: QueryRecord[];
  totalPages: number;
}

const Page = () => {
  //states
  const [queries, setQueries] = useState<QueryRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 2;
  const [isLoading, setIsLoading] = useState(false);

  //hooks
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  const fetchQeuries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      setQueries(res?.queries);
      setTotalPages(res?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, page, perPage]);
  useEffect(() => {
    if (page === 1 && email) {
      fetchQeuries();
    }
  }, [page, email, fetchQeuries]);

  const loadMoreQueries = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;
      setQueries([...queries, ...res.queries]);
      setTotalPages(res?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, page, perPage, queries]);

  useEffect(() => {
    if (page > 1 && email) {
      loadMoreQueries();
    }
  }, [page, email, loadMoreQueries]);

  if (!queries.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2Icon className="animate-spin mx-2" />
      </div>
    );
  else
    return (
      <div>
        <div className="p-10 my-5 mx-5 mb-5 rounded-lg bg-slate-200 dark:bg-slate-800 flex flex-col justify-center items-center">
          <h1 className="text-xl ">History</h1>
          <p className="text-sm text-gray-500">Your previous search history</p>
        </div>
        <div className="p-5 rounded-lg flex flex-col justify-center">
          <QueryTable data={queries} />
        </div>
        <div className="text-center my-5 ">
          {page < totalPages ? (
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
              className="cursor-pointer"
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin mx-2" />
              ) : (
                "Load more"
              )}
            </Button>
          ) : null}
        </div>
      </div>
    );
};

export default Page;
