"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Building2,
  Check,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import type { IStudio } from "@/components/type/studio.type";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MyListingsProps = {
  studios: IStudio[];
  loadError: boolean;
};

type StudioDraft = Pick<IStudio, "title" | "location" | "hourlyRate">;

const fieldClassName =
  "h-11 rounded-lg border-border bg-background px-3.5 text-sm shadow-sm";

export function MyListings({ studios, loadError }: MyListingsProps) {
  const [studioToDelete, setStudioToDelete] = useState<IStudio | null>(null);
  const [studioToUpdate, setStudioToUpdate] = useState<IStudio | null>(null);
  const [draft, setDraft] = useState<StudioDraft | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3500);
  };

  const openUpdateDialog = (studio: IStudio) => {
    setStudioToUpdate(studio);
    setDraft({
      title: studio.title,
      location: studio.location,
      hourlyRate: studio.hourlyRate,
    });
  };

  const saveUpdate = () => {
    if (!studioToUpdate || !draft) return;

    
    
    setStudioToUpdate(null);
    setDraft(null);
    showToast("Studio listing updated in this preview.");
  };

  const confirmDelete = () => {
    if (!studioToDelete) return;

   
    setStudioToDelete(null);
    showToast("Studio removed from your listings.");
  };

  return (
    <section className="relative flex-1 overflow-hidden bg-background py-28 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Badge
              variant="outline"
              className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
            >
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              HOST / YOUR WORKSPACES
            </Badge>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              My <span className="text-primary">listings</span>
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Keep your creative spaces up to date and ready to welcome their
              next project.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={<Link href="/add-studio" />}
            className="h-11 shrink-0 gap-2 rounded-lg px-5 font-semibold shadow-lg shadow-primary/15"
          >
            <Plus aria-hidden="true" />
            Add a studio
          </Button>
        </header>


        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Your spaces
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {loadError
                ? "Your listings could not be loaded."
                : `${studios.length} ${studios.length === 1 ? "space" : "spaces"} owned by your account`}
            </p>
          </div>
          {!loadError && studios.length > 0 && (
            <span className="hidden font-mono text-xs tracking-widest text-muted-foreground sm:inline">
              OWNER VERIFIED
            </span>
          )}
        </div>

        {loadError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center"
          >
            <h3 className="font-heading text-lg font-bold text-foreground">
              We couldn’t load your listings
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
          </div>
        ) : studios.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
              <Building2 className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">
              Your next creative space starts here
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              You don’t have any studio listings yet. Add a space to share it
              with the StudioSpace community.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/add-studio" />}
              className="mt-6 gap-2"
            >
              <Plus aria-hidden="true" />
              Add your first studio
            </Button>
          </div>
        ) : (
          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-primary/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] text-primary/50">
                      <Building2 className="size-12" aria-hidden="true" />
                    </div>
                  )}
                  <Badge
                    variant="outline"
                    className="absolute left-4 top-4 border-border/70 bg-background/85 text-foreground shadow-sm backdrop-blur-md"
                  >
                    {studio.category}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="line-clamp-1 font-heading text-xl font-bold tracking-tight text-foreground">
                    {studio.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="truncate">{studio.location}</span>
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Hourly rate
                      </p>
                      <p className="mt-0.5 font-heading text-xl font-bold text-primary">
                        ${studio.hourlyRate}
                        <span className="ml-1 font-sans text-xs font-normal text-muted-foreground">
                          / hr
                        </span>
                      </p>
                    </div>
                    <p className="text-right text-xs text-muted-foreground">
                      <span className="block font-semibold text-foreground">
                        {studio.maxCapacity}
                      </span>
                      guest capacity
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => openUpdateDialog(studio)}
                      className="h-10 gap-2 border-border hover:border-primary/30 hover:text-primary"
                    >
                      <Pencil aria-hidden="true" />
                      Update
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStudioToDelete(studio)}
                      className="h-10 gap-2 border-destructive/25 text-destructive hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
                    >
                      <Trash2 aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={studioToUpdate !== null}
        onOpenChange={(open) => {
          if (!open) {
            setStudioToUpdate(null);
            setDraft(null);
          }
        }}
      >
        <DialogContent className="gap-0 overflow-hidden border border-border bg-card p-0 sm:max-w-lg">
          <DialogHeader className="border-b border-border p-6">
            <Badge
              variant="outline"
              className="w-fit border-primary/30 bg-primary/5 text-primary"
            >
              LISTING / EDIT
            </Badge>
            <DialogTitle className="mt-3 font-heading text-2xl font-bold">
              Update your studio
            </DialogTitle>
            <DialogDescription>
              Make changes to the listing details shown on this preview.
            </DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid gap-5 p-6">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Studio name</Label>
                <Input
                  id="edit-title"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                  className={fieldClassName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={draft.location}
                  onChange={(event) =>
                    setDraft({ ...draft, location: event.target.value })
                  }
                  className={fieldClassName}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-hourly-rate">Hourly rate</Label>
                <Input
                  id="edit-hourly-rate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={draft.hourlyRate}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      hourlyRate: Number(event.target.value),
                    })
                  }
                  className={fieldClassName}
                />
              </div>
            </div>
          )}
          <DialogFooter className="border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setStudioToUpdate(null);
                setDraft(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={saveUpdate}
              disabled={!draft?.title.trim() || !draft?.location.trim()}
              className="gap-2"
            >
              <Check aria-hidden="true" />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={studioToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setStudioToDelete(null);
        }}
      >
        <AlertDialogContent className="border border-border bg-card sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2 aria-hidden="true" />
            </AlertDialogMedia>
            <AlertDialogTitle className="font-heading text-xl font-bold">
              Delete this studio listing?
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold text-foreground">
                {studioToDelete?.title}
              </span>{" "}
              will be removed from this preview. This UI-only action does not
              delete the MongoDB document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-border">
            <AlertDialogCancel onClick={() => setStudioToDelete(null)}>
              Keep listing
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 aria-hidden="true" />
              Delete listing
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-[60] flex max-w-sm items-center gap-3 rounded-xl border border-accent/30 bg-popover px-4 py-3 text-popover-foreground shadow-2xl shadow-background/30"
        >
          <Check
            className="size-5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </section>
  );
}
