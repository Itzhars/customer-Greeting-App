"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Save, Loader2, LogOut, User as UserIcon } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useMounted } from "@/lib/hooks/useMounted";

const profileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username too long"),
  avatarUrl: z.string().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const mounted = useMounted();
  const { username, avatarUrl, updateProfile } = useStore();
  const { user, logout } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: username || "",
      avatarUrl: avatarUrl || null,
    },
  });

  useEffect(() => {
    if (mounted) {
      reset({ username, avatarUrl });
    }
  }, [username, avatarUrl, reset, mounted]);

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      updateProfile(data);
      toast.success("Profile updated successfully!");
      reset(data);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-8 md:px-8 md:py-12 max-w-2xl mx-auto">
      {/* ... (rest of the UI remains exactly the same) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2 text-center"
      >
        <h1 className="text-3xl font-extrabold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border bg-card p-6 md:p-10 shadow-lg mt-6"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <Controller
              control={control}
              name="avatarUrl"
              render={({ field }) => (
                <ImageUpload value={field.value} onChange={field.onChange} />
              )}
            />
            <p className="text-xs text-muted-foreground text-center">
              Recommended: Square image, max 2MB.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base">Username</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Controller
                  control={control}
                  name="username"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="username"
                      placeholder="Enter your username"
                      className="pl-10 h-12 text-base rounded-xl"
                    />
                  )}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive font-medium">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-base text-muted-foreground">Email</Label>
              <Input
                value={user?.email || "guest@wishesapp.com"}
                disabled
                className="h-12 text-base rounded-xl bg-muted/50 border-dashed"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t">
            <Button
              type="button"
              variant="destructive"
              onClick={logout}
              className="w-full sm:w-auto"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>

            <Button
              type="submit"
              disabled={!isDirty || isSaving}
              className="w-full sm:w-auto min-w-[140px]"
            >
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
