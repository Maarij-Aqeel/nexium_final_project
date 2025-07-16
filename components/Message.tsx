"use client";

import { toast } from "sonner";

export function ToastMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return toast(title, {
    description: message,
  });
}
