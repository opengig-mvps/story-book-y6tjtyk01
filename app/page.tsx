'use client' ;
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { gsap } from "gsap";
import { ArrowRight, BookOpen, User, Pencil, Plus, Heart, Star } from "lucide-react";

const LandingPage = () => {
  useEffect(() => {
    gsap.fromTo(
      ".fade-in",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.3 }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-sky-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-sky-100 to-sky-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-sky-800 tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Own Story Book
                  </h1>
                  <p className="max-w-[600px] text-sky-600 md:text-xl">
                    Dive into the world of imagination and creativity. Bring your stories to life with our easy-to-use web app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-sky-700 text-white hover:bg-sky-800">
                    Get Started
                  </Button>
                  <Button className="bg-sky-300 text-sky-800 hover:bg-sky-400">
                    Learn More
                  </Button>
                </div>
              </div>
              <img
                src="https://placehold.co/600x400.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square fade-in"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-800">Features</h2>
                <p className="max-w-[900px] text-sky-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A plethora of features to customize and share your storybooks with the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-4 fade-in">
                <BookOpen className="h-12 w-12 text-sky-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-sky-800">Story Creation</h3>
                  <p className="text-sky-600">
                    Create stories effortlessly using our intuitive tools.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 fade-in">
                <User className="h-12 w-12 text-sky-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-sky-800">Age Appropriate</h3>
                  <p className="text-sky-600">Stories for every age, from toddlers to teens.</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 fade-in">
                <Pencil className="h-12 w-12 text-sky-700" />
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-bold text-sky-800">Edit and Customize</h3>
                  <p className="text-sky-600">
                    Add images, text, and personalize your stories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-800">Testimonials</h2>
                <p className="max-w-[900px] text-sky-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our happy users who have embarked on their storybook journeys.
                </p>
              </div>
              <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg fade-in">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-sky-800">John Doe</p>
                      <p className="text-xs text-sky-600">Author</p>
                    </div>
                  </div>
                  <p className="text-sky-600">
                    "This app has transformed my storytelling experience."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg fade-in">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-sky-800">Sarah Miller</p>
                      <p className="text-xs text-sky-600">Teacher</p>
                    </div>
                  </div>
                  <p className="text-sky-600">
                    "A wonderful tool for educators and young writers."
                  </p>
                </Card>
                <Card className="flex flex-col items-start space-y-4 p-6 bg-white shadow-lg fade-in">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none text-sky-800">Michael Johnson</p>
                      <p className="text-xs text-sky-600">Parent</p>
                    </div>
                  </div>
                  <p className="text-sky-600">
                    "My kids love creating their own bedtime stories!"
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-sky-200 to-sky-300">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center fade-in">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-sky-800">Get Started</h2>
                <p className="max-w-[900px] text-sky-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community and start your storytelling adventure today.
                </p>
              </div>
              <Button className="bg-sky-700 text-white hover:bg-sky-800 fade-in">
                Sign Up Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-sky-800 p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm text-white">
          <div className="grid gap-1">
            <h3 className="font-semibold">Product</h3>
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Security</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Company</h3>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Resources</h3>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Community</a>
          </div>
          <div className="grid gap-1">
            <h3 className="font-semibold">Legal</h3>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;