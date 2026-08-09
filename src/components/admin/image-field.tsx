import { useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CLOUD_NAME = import.meta.env['VITE_CLOUDINARY_CLOUD_NAME'] as string | undefined;
const UPLOAD_PRESET = import.meta.env['VITE_CLOUDINARY_UPLOAD_PRESET'] as string | undefined;

/** Image field: paste a URL, or upload to Cloudinary when env vars are configured. */
export function ImageField({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  const [uploading, setUploading] = useState(false);
  const canUpload = Boolean(CLOUD_NAME && UPLOAD_PRESET);

  async function handleFile(file: File) {
    if (!canUpload) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("upload_preset", UPLOAD_PRESET!);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body,
      });
      const json = (await res.json()) as { secure_url?: string; error?: { message: string } };
      if (!json.secure_url) throw new Error(json.error?.message ?? "Upload failed");
      onChange(json.secure_url);
      toast.success("Image uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Input
        id={id}
        value={value}
        placeholder="https://res.cloudinary.com/..."
        onChange={(e) => onChange(e.target.value)}
      />
      {canUpload ? (
        <div className="flex items-center gap-2">
          <input
            id={`${id}-file`}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => document.getElementById(`${id}-file`)?.click()}
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload image
          </Button>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to enable direct upload.
        </p>
      )}
      {value ? (
        <img
          src={value}
          alt=""
          loading="lazy"
          className="h-24 w-full rounded-lg border border-border object-cover"
        />
      ) : null}
    </div>
  );
}
