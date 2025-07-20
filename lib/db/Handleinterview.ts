import { supabase } from "../supabase/client";

export const insertInterview = async (
  interviewData: {
    id: string;
    title: string;
    difficulty: string;
    duration: number;
  },
  userid: string
) => {
  if (!userid) {
    console.error("User not authenticated");
    return { error: "User not authenticated" };
  }

  const { id, title, difficulty, duration } = interviewData;

  const { error: insertError } = await supabase.from("interviews").insert({
    id: id,
    created_by: userid,
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

export const getinterview = async (interviewId: string) => {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("id", interviewId)
    .single();

  if (error) {
    console.log("Error fetching interview", error.message);
    return null;
  }

  return data;
};

export const getallinterviews = async (userId: string) => {
  const { data, error } = await supabase
    .from("interviews")
    .select("*")
    .eq("created_by", userId);

  if (error) {
    console.log("Error getting user interviews ", error.message);
    return null;
  }
  return data;
};
