"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast"; // Import toast
import { Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Define form schema using Zod
const formSchema = z.object({
  appname: z.string().min(2, "App Name must be at least 2 characters"),
  description: z.string().optional(),
});

// Define TypeScript types
interface FormData {
  appname: string;
  description?: string;
}

export default function DashboardForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    setLoading(true);
    
    try {
      router.push("/rag"); // Navigate to "/rag" on submit
    } catch (error: any) {
      console.error("Navigation error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      {/* Toast Notification */}
      <Toaster position="top-right" reverseOrder={false} />

      <Card className="w-full max-w-6xl border border-gray-300 shadow-2xl p-8">
        <CardHeader className="bg-green-900 text-white p-4 rounded-t-md">
          <CardTitle className="text-2xl">Security Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* <h2 className="text-2xl font-semibold mb-6">Basic Information</h2> */}
          <form >
            <div>
              <label className="block text-lg font-medium">Advanced Configuration</label>
              {/* <Input {...register("appname")} placeholder="My awesome app" className="p-3 text-lg" />
              {errors.appname && <p className="text-red-500 text-sm">{errors.appname.message}</p>} */}
            </div>

            {/* <div>
              <label className="block text-lg font-medium">Description</label>
              <Textarea {...register("description")} placeholder="Add description here..." className="p-3 text-lg" />
            </div> */}

            <div className="flex justify-between mt-6">
              <Button variant="outline" className="px-6 py-3 text-lg">Previous</Button>
              <Button 
  className="bg-black text-white px-6 py-3 text-lg" 
  onClick={() => router.push("/overview")}
>
  Next
</Button>

            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
