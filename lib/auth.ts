import { supabase } from "./supabase/client";

export const signup = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const { data: authdata, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) throw new Error(signupError.message);

  return authdata.user; // Let the user confirm via email
};

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const { data: authdata, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  const user = authdata.user;

  if (!user) throw new Error("Login failed");

  // Get Pending Profile
  const pending = localStorage.getItem("pendingProfile");
  if (pending) {
    const { name, is_company } = JSON.parse(pending);

    const { data: existingProfile, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw new Error(checkError.message);
    }

    if (!existingProfile) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: user.id,
        name,
        email,
        is_company,
      });

      if (insertError) throw new Error(insertError.message);
    }
    localStorage.removeItem("pendingProfile");
  }
  return user;
};

export const signout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const SignInwithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/`,
    },
  });

  if (error) throw error;
};
