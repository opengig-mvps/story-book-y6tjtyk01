"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LoaderCircleIcon } from "lucide-react";

interface Story {
  storyId: number;
  title: string;
  category: string;
  ageRange: string;
}

const StoryListPage: React.FC = () => {
  const { data: session } = useSession();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchStories = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${userId}/stories?page=${currentPage}`);
        setStories(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [userId, currentPage]);

  if (!session) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Stories</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderCircleIcon className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories?.map((story) => (
            <Card key={story?.storyId}>
              <CardHeader>
                <CardTitle>{story?.title}</CardTitle>
                <CardDescription>
                  Category: {story?.category} | Age Range: {story?.ageRange}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Story ID: {story?.storyId}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ pointerEvents: currentPage === 1 ? 'none' : 'auto', opacity: currentPage === 1 ? 0.5 : 1 }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ pointerEvents: currentPage === totalPages ? 'none' : 'auto', opacity: currentPage === totalPages ? 0.5 : 1 }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StoryListPage;