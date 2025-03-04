"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast, Toaster } from "react-hot-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Database } from "lucide-react";

// Define form schema using Zod
const formSchema = z.object({
  appname: z.string().min(2, "App Name must be at least 2 characters"),
  description: z.string().optional(),
});

interface FormData {
  appname: string;
  description?: string;
}

export default function DashboardForm() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("my-dataset");
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
      const response = await fetch("https://pw73zddd-3071.inc1.devtunnels.ms/api/basicConfig/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appname: data.appname,
          description: data.description,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit data");
      }
      toast.success("Form submitted successfully! 🎉");
      reset();
      router.push("/rag");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong! ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />
      <Card className="w-full max-w-6xl border border-gray-300 shadow-2xl p-8">
        <CardHeader className="bg-green-900 text-white p-4 rounded-t-md">
          <CardTitle className="text-2xl">Basic Configuration</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Basic Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-lg font-medium">App Name</label>
              <Input {...register("appname")} placeholder="My awesome app" className="p-3 text-lg" />
              {errors.appname && <p className="text-red-500 text-sm">{errors.appname.message}</p>}
            </div>
            <div>
              <label className="block text-lg font-medium">Description</label>
              <Textarea {...register("description")} placeholder="Add description here..." className="p-3 text-lg" />
            </div>

            <div className="flex flex-row gap-14">
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2" onClick={() => setOpen(true)}>
                <Database className="w-5 h-5" /> Dataset
              </Button>
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2" onClick={() => setOpen(true)}>
                <Database className="w-5 h-5" /> Data Sources
              </Button>
              <Button variant="outline" className="flex items-center gap-2 px-4 py-2" onClick={() => setOpen(true)}>
                <Database className="w-5 h-5" /> Prompt template
              </Button>
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
      
      {/* Dialog for Dataset */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Datasets</DialogTitle>
            <p className="text-gray-600 text-sm">Choose how you want to import your dataset.</p>
          </DialogHeader>

          <div className="border rounded-lg p-4">
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="flex gap-4">
              <RadioGroupItem value="my-dataset">My dataset</RadioGroupItem>
              <RadioGroupItem value="upload">Upload your own</RadioGroupItem>
              <RadioGroupItem value="import">Import dataset</RadioGroupItem>
            </RadioGroup>
          </div>

          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                  No dataset available.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </main>
  );
}
