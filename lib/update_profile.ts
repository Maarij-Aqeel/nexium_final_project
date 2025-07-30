import { supabase } from "./supabase/client";

export const UpdateEmail = async (userdata: any) => {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      email: userdata.email,
    })
    .eq("id", userdata.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const { error: authError } = await supabase.auth.updateUser({
    email: userdata.email,
  });

  if (authError) {
    throw new Error(authError.message);
  }

  return { message: "Profile updated successfully" };
};

export const UpdateName = async (userdata: any) => {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      name: userdata.name,
    })
    .eq("id", userdata.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { message: "Name updated successfully" };
};

export const UpdatePassword = async (userdata: any) => {
  const { error } = await supabase.auth.updateUser({
    password: userdata.newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { message: "Password updated successfully" };
};
