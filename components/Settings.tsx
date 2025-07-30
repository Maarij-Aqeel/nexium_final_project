"use client";

import { useState, ReactNode } from "react";
import { UpdateEmail, UpdateName, UpdatePassword } from "@/lib/update_profile";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/app/context/user-context";
import { toast } from "sonner";
import { useEffect } from "react";
import { motion } from "framer-motion";

/* ---------- Reusable motion wrapper ---------- */

function MotionWrapper({ children }: { children: ReactNode }) {
  return (
    <motion.div
      key={children?.toString()}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  title,
  children,
  onSave,
}: {
  title: string;
  children: ReactNode;
  onSave: () => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
      <Button
        onClick={onSave}
        className="rounded-full bg-gradient-to-r from-primary to-secondary text-black font-semibold"
      >
        Save {title}
      </Button>
    </div>
  );
}

/* ---------- Section Components ---------- */
function ProfileSection({
  userdata,
  setUserdata,
  onSave,
}: {
  userdata: any;
  setUserdata: any;
  onSave: () => void;
}) {
  return (
    <Section title="Profile" onSave={onSave}>
      <Field label="Full Name">
        <Input
          value={userdata.name}
          onChange={(e) =>
            setUserdata((prev: any) => ({ ...prev, name: e.target.value }))
          }
        />
      </Field>
      <Field label="Email">
        <Input
          value={userdata.email}
          onChange={(e) =>
            setUserdata((prev: any) => ({ ...prev, email: e.target.value }))
          }
        />
      </Field>
    </Section>
  );
}

function SecuritySection({
  userdata,
  setUserdata,
  onSave,
}: {
  userdata: any;
  setUserdata: any;
  onSave: () => void;
}) {
  return (
    <Section title="Security" onSave={onSave}>
      <Field label="Current Password">
        <Input
          type="password"
          value={userdata.currentPassword || ""}
          onChange={(e) =>
            setUserdata((prev: any) => ({
              ...prev,
              currentPassword: e.target.value,
            }))
          }
        />
      </Field>
      <Field label="New Password">
        <Input
          type="password"
          value={userdata.newPassword || ""}
          onChange={(e) =>
            setUserdata((prev: any) => ({
              ...prev,
              newPassword: e.target.value,
            }))
          }
        />
      </Field>
      <Field label="Confirm Password">
        <Input
          type="password"
          value={userdata.confirmPassword || ""}
          onChange={(e) =>
            setUserdata((prev: any) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
      </Field>
    </Section>
  );
}

function PrivacySection() {
  return (
    <Section title="Privacy & Data">
      <Button variant="outline" className="w-full">
        Download my data (JSON)
      </Button>
      <Button variant="destructive" className="w-full">
        Delete all interviews
      </Button>
      <Button variant="destructive" className="w-full">
        Request account deletion
      </Button>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label className="text-sm text-white/70">{label}</Label>
      {children}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function SettingsPage({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  type SectionKey = keyof typeof sections;

  const [active, setActive] = useState<SectionKey>("Profile");

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const handleSave = async (section: SectionKey) => {
    try {
      if (section === "Profile") {
        if (userdata.name != profile?.name) {
          const result = await UpdateName(userdata);
          if (result) {
            toast.info("Name Updated successfully.");
          }
        }
        if (userdata.email != profile?.email) {
          const result = await UpdateEmail(userdata);
          if (result) {
            toast.info("Check Email for Verfifcation.");
          }
        }
      } else if (section === "Security") {
        if (
          !userdata.newPassword ||
          userdata.newPassword !== userdata.confirmPassword
        ) {
          toast.error("Passwords do not match or are empty");
          return;
        }

        const result = await UpdatePassword(userdata);
        if (result) {
          toast.success(result.message);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Something went Wrong");
    }
  };

  const { profile } = useUser();
  const [userdata, setUserdata] = useState({
    id: profile?.id,
    name: profile?.name,
    email: profile?.email,
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (profile) {
      setUserdata((prev) => ({
        ...prev,
        id: profile.id || "",
        name: profile.name || "",
        email: profile.email || "",
      }));
    }
  }, [profile]);

  const sections = {
    Profile: (
      <ProfileSection
        userdata={userdata}
        setUserdata={setUserdata}
        onSave={() => handleSave("Profile")}
      />
    ),
    Security: (
      <SecuritySection
        userdata={userdata}
        setUserdata={setUserdata}
        onSave={() => handleSave("Security")}
      />
    ),
    Privacy: <PrivacySection />,
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-lg"
          />

          {/* centered panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
          >
            <div
              className="
            w-full max-w-5xl max-h-[90vh]
            mx-auto my-auto
            bg-gray-900/70 backdrop-blur-lg border border-white/10
            rounded-lg md:rounded-2xl shadow-2xl
            flex flex-col overflow-hidden
          "
            >
              {/* header */}
              <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
                <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition"
                >
                  ✕
                </button>
              </header>

              {/* scrollable body */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-y-auto min-h-0">
                {/* sidebar */}
                <aside className="md:col-span-3 p-4 border-r border-white/10">
                  <nav className="space-y-1">
                    {Object.keys(sections).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActive(key as SectionKey)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          active === key
                            ? "bg-gradient-to-r from-primary to-secondary text-black"
                            : "text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </nav>
                </aside>

                {/* content */}
                <main className="md:col-span-9 p-6">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6">
                    {sections[active]}
                  </div>
                </main>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
