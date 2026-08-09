import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { ImageField } from "./image-field";

const FIELDS: { name: string; label: string; type?: "textarea" | "image" }[] = [
  { name: "full_name", label: "Full Name" },
  { name: "headline", label: "Headline" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "profile_image", label: "Profile Image", type: "image" },
  { name: "email", label: "Email" },
  { name: "phone", label: "Phone" },
  { name: "location", label: "Location" },
  { name: "github_url", label: "GitHub" },
  { name: "linkedin_url", label: "LinkedIn" },
  { name: "whatsapp_url", label: "WhatsApp" },
];

export function ProfileEditor() {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "profile"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profile").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return data as (Record<string, string | null> & { id: string }) | null;
    },
  });

  useEffect(() => {
    if (!data) return;
    const next: Record<string, string> = {};
    FIELDS.forEach((f) => {
      next[f.name] = (data[f.name] as string | null) ?? "";
    });
    setValues(next);
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = Object.fromEntries(
        FIELDS.map((f) => [f.name, values[f.name] === "" ? null : values[f.name]]),
      );
      if (data?.id) {
        const { error } = await supabase.from("profile").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("profile").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      void queryClient.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-14 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold">Edit Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save.mutate();
        }}
        className="grid max-w-3xl gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      >
        {FIELDS.map((f) => (
          <div
            key={f.name}
            className={f.type === "textarea" || f.type === "image" ? "space-y-2 sm:col-span-2" : "space-y-2"}
          >
            <Label htmlFor={`profile-${f.name}`}>{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea
                id={`profile-${f.name}`}
                rows={4}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            ) : f.type === "image" ? (
              <ImageField
                id={`profile-${f.name}`}
                value={values[f.name] ?? ""}
                onChange={(val) => setValues((v) => ({ ...v, [f.name]: val }))}
              />
            ) : (
              <Input
                id={`profile-${f.name}`}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={save.isPending}>
            {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}
