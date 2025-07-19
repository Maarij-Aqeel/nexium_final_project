"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { TextFade } from "./FadeUp";
import { insertInterview } from "@/lib/db/Handleinterview";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { interviewManager } from "@/lib/interview";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUser } from "@/app/context/user-context";

//Interview Form Schema
const formSchema = z.object({
  duration: z.string().min(1, "Please select a duration"),
  difficulty: z.string().min(1, "Please select difficulty level"),
});

export default function ConfigureInterview({
  interview,
  controlstate,
}: {
  interview: any;
  controlstate: (val: null) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const id = uuidv4();

  // Get User
  const { user, profile } = useUser();

  // Submit the Form
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (!user) {
        router.push("/signup");
        return;
      } else {
        interviewManager.createOrUpdate(id, {
          title: interview.title,
          difficulty: values.difficulty,
          duration: Number(values.duration),
        });
        const sendinterview = interviewManager.getById(id);
        sendinterview ? insertInterview(sendinterview, user.id) : "";
        router.push(`/interviews/${id}`);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <TextFade direction="up" className="z-50 relative">
      {/* Close Button */}
      <button
        className="absolute  top-1 right-2 transition-all duration-100 text-gray-400 hover:text-red-500 text-2xl"
        onClick={() => controlstate(null)}
      >
        &times;
      </button>
      <h1 className="text-2xl font-bold text-white mb-5">
        Configure Interview
      </h1>
      <h2 className="text-xl text-left text-primary mb-10 font-semibold">
        {interview.title}
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {/* Interview Duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Interview Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="z-[9999]">
                    <SelectItem value="3">3 Minutes</SelectItem>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="7">7 Minutes</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Difficulty Level */}
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4">Difficulty Level</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-5"
                  >
                    {["Beginner", "Intermediate", "Professional"].map(
                      (level) => (
                        <FormItem
                          key={level}
                          className="flex items-center space-x-3"
                        >
                          <FormControl>
                            <RadioGroupItem value={level} />
                          </FormControl>
                          <FormLabel className="font-normal">{level}</FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex flex-col py-5 sm:flex-row gap-4 justify-between">
            <Button
              type="button"
              className="w-full sm:w-2/5 bg-slate-900/20 border border-muted text-muted hover:bg-slate-800 hover:text-white"
              onClick={() => controlstate(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-2/5 bg-gradient-to-r from-primary/80 to-secondary/80 text-black hover:scale-105 transition-all duration-200 hover:shadow-[0_0_25px_5px_rgba(0,255,255,0.5)]"
            >
              Start Interview
            </Button>
          </div>
        </form>
      </Form>
    </TextFade>
  );
}
