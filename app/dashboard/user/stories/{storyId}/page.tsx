"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoaderCircleIcon } from "lucide-react";

interface Page {
  pageId: number;
  textContent: string;
  imageUrl: string;
  pageNumber: number;
}

const StoryPageViewer: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { data: session } = useSession();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;

    const fetchStoryPages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/stories/${storyId}`);
        setPages(response?.data?.data);
      } catch (error: any) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStoryPages();
  }, [storyId, session]);

  if (!session) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Story Viewer</h1>
      {loading ? (
        <div className="flex justify-center">
          <LoaderCircleIcon className="animate-spin h-6 w-6" />
        </div>
      ) : (
        <Carousel>
          <CarouselContent>
            {pages?.map((page) => (
              <CarouselItem key={page?.pageId}>
                <Card className="flex flex-col items-center">
                  <CardHeader>
                    <CardTitle>Page {page?.pageNumber}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={page?.imageUrl}
                      alt={`Page ${page?.pageNumber}`}
                      className="w-full h-64 object-cover mb-4"
                    />
                    <p>{page?.textContent}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default StoryPageViewer;