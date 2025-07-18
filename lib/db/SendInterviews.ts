import { supabase } from "../supabase/client";

export const insertInterview = async (interviewData: {
  id: string;
  title: string;
  difficulty: string;
  duration: number;
}) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("User not authenticated", authError?.message);
    return { error: "User not authenticated" };
  }

  const { id,title, difficulty, duration } = interviewData;

  const { error: insertError } = await supabase.from("interviews").insert({
    id:id,
    created_by: user.id,
    title,
    difficulty,
    duration,
  });

  if (insertError) {
    console.error("Error inserting Interview data: " + insertError.message);
    return { error: insertError.message };
  }

  return { message: "Interview data insertion successful!" };
};
