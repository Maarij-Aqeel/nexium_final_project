import { supabase } from "./supabase/client";

export const signup = async (data: {
  email: string;
  password: string;
  name: string;
  is_company: boolean;
}) => {
  const { email, password, name, is_company } = data;
  // Supabase sign up
  const { data: authdata, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signupError) throw new Error(signupError.message);

  const user = authdata.user;

  // Insert profile info
  const { error: insertError } = await supabase.from("profiles").insert({
    id: user?.id,
    email,
    name,
    is_company,
  });

  if (insertError) throw new Error(insertError.message);

  return user;
};

export const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const { data: authdata, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return authdata.user;
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
  if (error) {
    throw error;
  }
};
