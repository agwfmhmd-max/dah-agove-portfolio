import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/lib/supabase";
import { ImageField } from "./image-field";

export type FieldType = "text" | "textarea" | "number" | "bool" | "tags" | "image" | "date";

export type FieldSpec = {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  placeholder?: string;
};

type Row = Record<string, unknown> & { id: string };

function emptyValues(fields: FieldSpec[]) {
  const out: Record<string, unknown> = {};
  fields.forEach((f) => {
    out[f.name] = f.type === "bool" ? false : f.type === "number" ? 0 : f.type === "tags" ? [] : "";
  });
  return out;
}

export function CrudManager({
  table,
  title,
  fields,
  primaryField,
  secondaryField,
  orderBy = "sort_order",
}: {
  table: string;
  title: string;
  fields: FieldSpec[];
  primaryField: string;
  secondaryField?: string;
  orderBy?: string;
}) {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, unknown>>(emptyValues(fields));
  const [toDelete, setToDelete] = useState<Row | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending: true });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin", table] });
    void queryClient.invalidateQueries();
  };

  const save = useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      if (editing) {
        const { error } = await supabase.from(table).update(payload).eq("id", editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      setOpen(false);
      setEditing(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      setToDelete(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  function startCreate() {
    setEditing(null);
    setValues(emptyValues(fields));
    setOpen(true);
  }

  function startEdit(row: Row) {
    const next: Record<string, unknown> = {};
    fields.forEach((f) => {
      const v = row[f.name];
      next[f.name] =
        f.type === "tags"
          ? Array.isArray(v)
            ? (v as string[]).join(", ")
            : ""
          : (v ?? (f.type === "bool" ? false : ""));
    });
    setValues(next);
    setEditing(row);
    setOpen(true);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Record<string, unknown> = {};
    fields.forEach((f) => {
      const raw = values[f.name];
      if (f.type === "tags") {
        payload[f.name] = String(raw ?? "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      } else if (f.type === "number") {
        payload[f.name] = raw === "" || raw === null ? null : Number(raw);
      } else if (f.type === "bool") {
        payload[f.name] = Boolean(raw);
      } else {
        payload[f.name] = raw === "" ? null : raw;
      }
    });
    save.mutate(payload);
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button onClick={startCreate}>
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm">
          {(error as Error).message}
        </p>
      ) : !data || data.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Nothing here yet. Create your first entry.
        </p>
      ) : (
        <ul className="space-y-3">
          {data.map((row) => (
            <li
              key={row.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{String(row[primaryField] ?? "")}</p>
                {secondaryField ? (
                  <p className="truncate text-sm text-muted-foreground">
                    {String(row[secondaryField] ?? "")}
                  </p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => startEdit(row)}>
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setToDelete(row)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? `Update ${title}` : `Create ${title}`}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            {fields.map((f) => {
              const id = `${table}-${f.name}`;
              const value = values[f.name];
              return (
                <div key={f.name} className="space-y-2">
                  <Label htmlFor={id}>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea
                      id={id}
                      rows={4}
                      value={String(value ?? "")}
                      required={f.required}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    />
                  ) : f.type === "bool" ? (
                    <div>
                      <Switch
                        id={id}
                        checked={Boolean(value)}
                        onCheckedChange={(c) => setValues((v) => ({ ...v, [f.name]: c }))}
                      />
                    </div>
                  ) : f.type === "image" ? (
                    <ImageField
                      id={id}
                      value={String(value ?? "")}
                      onChange={(val) => setValues((v) => ({ ...v, [f.name]: val }))}
                    />
                  ) : (
                    <Input
                      id={id}
                      type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                      value={String(value ?? "")}
                      required={f.required}
                      placeholder={f.placeholder ?? (f.type === "tags" ? "React, Supabase" : undefined)}
                      onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                    />
                  )}
                </div>
              );
            })}
            <DialogFooter>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!toDelete} onOpenChange={(v) => !v && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => toDelete && remove.mutate(toDelete.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
