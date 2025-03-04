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

  workflow: z.string().min(1, " workflow is required"),
});

// Define TypeScript types
interface FormData {

  workflow?: string;
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

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const response = await fetch("https://pw73zddd-3071.inc1.devtunnels.ms/api/rag/createWork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        
          workflow: data.workflow,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit data");
      }

      toast.success("Form submitted successfully! 🎉"); // Success toast
      reset(); // Reset form fields
      router.push("/security-overview");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong! ❌"); // Error toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Toast Notification */}
      <Toaster position="top-right" reverseOrder={false} />

      <Card className="w-full max-w-6xl border border-gray-300 shadow-2xl p-8">
        <CardHeader className="bg-green-900 text-white p-6 rounded-t-md">
          <CardTitle className="text-2xl">Workflows</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Workflows</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* <div>
              <label className="block text-lg font-medium">App Name</label>
              <Input {...register("appname")} placeholder="My awesome app" className="p-3 text-lg" />
              {errors.appname && <p className="text-red-500 text-sm">{errors.appname.message}</p>}
            </div> */}

            <div>
              {/* <label className="block text-lg font-medium">workflow</label> */}
              <Textarea {...register("workflow")} placeholder="type @ to refernce a workflow" className="p-3 text-lg" />
              {errors.workflow && <p className="text-red-500 text-sm">{errors.workflow.message}</p>}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" className="px-6 py-3 text-lg">Previous</Button>
              <Button type="submit" className="bg-black text-white px-6 py-3 text-lg" disabled={loading}>
                {loading ? "Submitting..." : "Next"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
