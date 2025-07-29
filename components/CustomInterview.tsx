"use client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/app/context/user-context";
import { interviewManager } from "@/lib/interview";
import { insertInterview } from "@/lib/db/Handleinterview";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextFade } from "@/components/FadeUp";

const formSchema = z.object({
  title: z.string().min(5, "Title is required"),
  duration: z.enum(["3", "5", "7"]),
  difficulty: z.enum(["Beginner", "Intermediate", "Professional"]),
  description: z.string().min(10, "Description is required"),
});
type FormSchema = z.infer<typeof formSchema>;

export default function CreateInterview({
  controlstate,
}: {
  controlstate: (val: null) => void;
}) {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      duration: "5",
      difficulty: "Intermediate",
      description: "",
    },
  });

  const onSubmit = (values: FormSchema) => {
    if (!user) return router.push("/signup");
    const id = uuidv4();
    interviewManager.createOrUpdate(id, {
      title: values.title,
      difficulty: values.difficulty,
      duration: Number(values.duration),
    });
    insertInterview(interviewManager.getById(id)!, user.id);
    toast.success("Interview created");
    controlstate(null);
    router.push(`/interviews/${id}`);
  };

  return (
    <TextFade direction="up">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          relative flex flex-col gap-5 p-6 w-96
          bg-gradient-to-r from-[#090c13]/95 to-[#111827]/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl
        "
      >
        {/* Close pill */}
        <button
          type="button"
          onClick={() => controlstate(null)}
          className="absolute top-3 right-3 p-1.5 rounded-full text-white/60 hover:text-red-400 transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl mb-4 font-bold text-center text-white">
          New Interview
        </h2>

        {/* Title */}
        <Field label="Title" error={errors.title?.message}>
          <Input
            {...register("title")}
            placeholder="e.g. React Hooks"
            className="h-9 bg-white/5 border-white/10 rounded-md placeholder:text-white/40"
          />
        </Field>

        {/* Duration */}
        <Field label="Duration" error={errors.duration?.message}>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="h-9 bg-white/5 border-white/10 rounded-md">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="backdrop-blur-lg border-white/20 rounded-md"
                >
                  <SelectItem value="3" className="hover:bg-white/10">
                    3 min
                  </SelectItem>
                  <SelectItem value="5" className="hover:bg-white/10">
                    5 min
                  </SelectItem>
                  <SelectItem value="7" className="hover:bg-white/10">
                    7 min
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {/* Difficulty */}
        <Field label="Difficulty" error={errors.difficulty?.message}>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <SelectTrigger className="h-9 bg-white/5 border-white/10 rounded-md">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className=" backdrop-blur-lg border-white/20 rounded-md"
                >
                  <SelectItem value="Beginner" className="hover:bg-white/10">
                    Beginner
                  </SelectItem>
                  <SelectItem
                    value="Intermediate"
                    className="hover:bg-white/10"
                  >
                    Intermediate
                  </SelectItem>
                  <SelectItem
                    value="Professional"
                    className="hover:bg-white/10"
                  >
                    Professional
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {/* Description */}
        <Field label="Description" error={errors.description?.message}>
          <Textarea
            {...register("description")}
            placeholder="Short overview…"
            rows={2}
            className="bg-white/5 border-white/10 rounded-md placeholder:text-white/40"
          />
        </Field>

        {/* Submit */}
        <Button
          type="submit"
          className="w-2/3 mx-auto h-9 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-[0_0_20px_3px_rgba(0,255,255,0.5)] transition-all duration-200"
        >
          Start Interview
        </Button>
      </form>
    </TextFade>
  );
}

/* helper for consistent spacing & errors */
function Field({
  label,
  error,
  children,
}: React.PropsWithChildren<{ label: string; error?: string }>) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-white/70">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
