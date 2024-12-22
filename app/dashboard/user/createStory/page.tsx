"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { LoaderCircleIcon } from 'lucide-react';

const storySchema = z.object({
  title: z.string().min(1, { message: "Story title is required" }),
  numberOfPages: z.number().min(1, { message: "Number of pages is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  ageRange: z.string().min(1, { message: "Age range is required" }),
  mainCharacter: z.string().min(1, { message: "Main character is required" }),
  secondaryCharacter: z.string().min(1, { message: "Secondary character is required" }),
  moral: z.string().min(1, { message: "Moral is required" }),
  plotSetting: z.string().min(1, { message: "Plot setting is required" }),
});

type StoryFormData = z.infer<typeof storySchema>;

const CreateStoryPage: React.FC = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
  });

  const onSubmit = async (data: StoryFormData) => {
    try {
      const payload = {
        ...data,
        userId: session?.user?.id,
      };

      const response = await api.post("/api/stories", payload);

      if (response?.data?.success) {
        toast.success("Story created successfully!");
        reset();
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Story</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Story Title</Label>
              <Input {...register("title")} placeholder="Enter story title" />
              {errors?.title && <p className="text-red-500 text-sm">{errors?.title?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="numberOfPages">Number of Pages</Label>
              <Input type="number" {...register("numberOfPages")} placeholder="Enter number of pages" />
              {errors?.numberOfPages && <p className="text-red-500 text-sm">{errors?.numberOfPages?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input {...register("category")} placeholder="Enter category" />
              {errors?.category && <p className="text-red-500 text-sm">{errors?.category?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ageRange">Age Range</Label>
              <Input {...register("ageRange")} placeholder="Enter age range" />
              {errors?.ageRange && <p className="text-red-500 text-sm">{errors?.ageRange?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainCharacter">Main Character</Label>
              <Input {...register("mainCharacter")} placeholder="Enter main character name" />
              {errors?.mainCharacter && <p className="text-red-500 text-sm">{errors?.mainCharacter?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondaryCharacter">Secondary Character</Label>
              <Input {...register("secondaryCharacter")} placeholder="Enter secondary character name" />
              {errors?.secondaryCharacter && <p className="text-red-500 text-sm">{errors?.secondaryCharacter?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="moral">Moral</Label>
              <Textarea {...register("moral")} placeholder="Enter moral of the story" />
              {errors?.moral && <p className="text-red-500 text-sm">{errors?.moral?.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="plotSetting">Plot Setting</Label>
              <Textarea {...register("plotSetting")} placeholder="Enter plot setting" />
              {errors?.plotSetting && <p className="text-red-500 text-sm">{errors?.plotSetting?.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Story...
                </>
              ) : (
                "Create Story"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateStoryPage;