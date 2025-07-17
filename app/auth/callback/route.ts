import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) next = "/";

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (!exchangeError) {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error("Failed to fetch user:", userError?.message);
        return NextResponse.redirect(`${origin}/auth/auth-code-error`);
      }

      const user = userData.user;

      const { data: existingProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!existingProfile && !profileError) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || "",
          is_company: false,
        });

        if (insertError) {
          console.error("Profile insert failed:", insertError.message);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      const redirectUrl = isLocalEnv
        ? `${origin}${next}`
        : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`;

      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
