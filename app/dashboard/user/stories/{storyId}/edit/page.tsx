'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import axios, { isAxiosError } from 'axios';
import { LoaderCircleIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type FormData = {
  textContent: string;
  image: File | null;
};

const EditStoryPage: React.FC = () => {
  const { storyId } = useParams<{ storyId: string }>();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!data?.image) {
      toast.error('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('textContent', data?.textContent);
    formData.append('image', data?.image);
    formData.append('pageNumber', '1'); // Assuming page number is 1 for demonstration
    formData.append('storyId', storyId);

    try {
      const response = await axios.post(`/api/stories/${storyId}/pages`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.data?.success) {
        toast.success('Page content added successfully!');
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (!file?.type?.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
      }

      if (file?.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB.');
        return;
      }

      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Story Page</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Edit Page Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="textContent" className="block text-sm font-medium">
                Text Content
              </label>
              <Textarea
                {...register('textContent', { required: 'Text content is required' })}
                placeholder="Enter story text here..."
              />
              {errors?.textContent && (
                <p className="text-red-500 text-sm">{errors?.textContent?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium">
                Upload Image
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-full h-auto" />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <LoaderCircleIcon className="animate-spin" /> : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditStoryPage;