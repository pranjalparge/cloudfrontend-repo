"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  baseName: z.string().min(2, "Knowledge Base Name must be at least 2 characters"),
  description: z.string().optional(),
  pattern: z.string().min(1, "Pattern is required"),
  embaddings: z.string().min(1, "Embeddings must be at least 1"),
  metrics: z.string().min(1, "Metrics is required"),
  chunking: z.string().min(1, "Chunking is required"),
  vectorDb: z.string().min(1, "Vector DB is required"),
});

interface FormData {
  baseName: string;
  description?: string;
  pattern: string;
  embaddings: string;
  metrics: string;
  chunking: string;
  vectorDb: string;
}

export default function RAGConfiguration() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const [configData, setConfigData] = useState<any[]>([]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("https://pw73zddd-3071.inc1.devtunnels.ms/api/rag/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseName: data.baseName,
          description:data.description,
          pattern: data.pattern,
          embaddings: data.embaddings,
          metrics:data.metrics,
          chunking: data.chunking,
          vectorDb: data.vectorDb   ,     }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit data");
      }

      toast.success("Form submitted successfully! 🎉");
      reset();
      fetchConfigData();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong! ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchConfigData = async () => {
    try {
      const response = await fetch("https://pw73zddd-3071.inc1.devtunnels.ms/api/rag/get");
      const data = await response.json();
      console.log("Fetched Data:", data);
      setConfigData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Card className="w-full max-w-6xl border border-gray-300 shadow-2xl p-8">
      <CardHeader className="bg-green-900 text-white p-4 rounded-t-md">
        <CardTitle className="text-2xl">RAG Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-lg font-medium">Knowledge Base Name</label>
            <Input {...register("baseName")} placeholder="Enter knowledge base name" className="p-1 text-lg" />
            {errors.baseName && <p className="text-red-500 text-sm">{errors.baseName.message}</p>}
          </div>

          <div>
            <label className="block text-lg font-medium">Description</label>
            <Textarea {...register("description")} placeholder="Add description here..." className="p-2 text-lg" />
          </div>

          <div className="flex gap-4">
  <div className="w-1/2">
    <label className="block text-lg font-medium">Pattern</label>
    <Textarea {...register("pattern")} placeholder="Add description here..." className="p-1 text-lg w-full" />
    {errors.pattern && <p className="text-red-500 text-sm">{errors.pattern.message}</p>}
  </div>

  <div className="w-1/2">
    <label className="block text-lg font-medium">Embeddings</label>
    <Textarea {...register("embaddings")} placeholder="Add description here..." className="p-1 text-lg w-full" />
    {errors.embaddings && <p className="text-red-500 text-sm">{errors.embaddings.message}</p>}
  </div>
</div>

<div className="flex gap-4">
  <div className="w-1/2">
    <label className="block text-lg font-medium">Metrics</label>
    <Textarea {...register("metrics")} placeholder="Add description here..." className="p-1 text-lg w-full" />
    {errors.metrics && <p className="text-red-500 text-sm">{errors.metrics.message}</p>}
  </div>

  <div className="w-1/2">
    <label className="block text-lg font-medium">Chunking</label>
    <Textarea {...register("chunking")} placeholder="Add description here..." className="p-1 text-lg w-full" />
    {errors.chunking && <p className="text-red-500 text-sm">{errors.chunking.message}</p>}
  </div>
</div>
<div>
            <label className="block text-lg font-medium">Vector DB</label>
            <Textarea {...register("vectorDb")} placeholder="Add description here..." className="p-1 text-lg" />
          </div>
          <Button type="submit" className="bg-black text-white px-6 py-3 text-lg" disabled={loading}>
                {loading ? "Submitting..." : "Add Configuration"}
              </Button>
          <div className="flex justify-between mt-6">
            <Button variant="outline" className="px-6 py-3 text-lg">Previous</Button>
            <Button 
  className="bg-black text-white px-6 py-3 text-lg" 
  onClick={() => router.push("/workflows")}
>
  Next
</Button>
          </div>
        </form>

        <div className="mt-8">
 
          <table className="w-full mt-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Knowledge Base Name</th>
                <th className="border border-gray-300 px-4 py-2">description</th>
                <th className="border border-gray-300 px-4 py-2">Pattern</th>
                <th className="border border-gray-300 px-4 py-2">embaddings</th>
                <th className="border border-gray-300 px-4 py-2">metrics</th>
              </tr>
            </thead>
            <tbody>
              {configData.map((item, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.baseName || "NA"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.description || "NA"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.pattern || "NA"}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.embaddings || "NA"}</td>
                  
                  <td className="border border-gray-300 px-4 py-2">{item.metrics || "NA"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
