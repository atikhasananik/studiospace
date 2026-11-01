"use client";

import Image from "next/image";
import { useState } from "react";
import { Building2, Check, MapPin, Pencil, Trash2 } from "lucide-react";

import type { IStudio } from "@/components/type/studio.type";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteStudioData } from "../data/deleteData";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MylistingsCard = ({ studio: initialStudio }: { studio: IStudio }) => {
  const [studio] = useState(initialStudio);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [saveMessage] = useState("");
  const Router = useRouter();
  console.log(studio._id);

  const handleDelete = async () => {
    console.log("delete btn clicked");
    const res = await deleteStudioData(studio._id);
    if (!res) {
      console.warn("Failed to delete studio data");
      return;
    } else {
      console.log("Studio deleted successfully");
      Router.refresh();
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-background/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-primary/5">
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
        {saveMessage && (
          <p
            role="status"
            className="mb-3 flex items-center gap-2 text-xs font-medium text-accent"
          >
            <Check className="size-4" aria-hidden="true" />
            {saveMessage}
          </p>
        )}
        <h3 className="line-clamp-1 font-heading text-xl font-bold tracking-tight text-foreground">
          {studio.title}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span className="truncate">{studio.location}</span>
        </p>

        <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Hourly rate</p>
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
          <Link href={`/studios/edit/${studio._id}`}>
            <Button
              type="button"
              variant="outline"
              className="h-10 gap-2 border-border hover:border-primary/30 hover:text-primary"
            >
              <Pencil aria-hidden="true" />
              Update
            </Button>
          </Link>

          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="h-10 gap-2 border-destructive/25 text-destructive hover:border-destructive/40 hover:bg-destructive/5 hover:text-destructive"
          >
            <Trash2 aria-hidden="true" />
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="border border-border bg-card sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive">
              <Trash2 aria-hidden="true" />
            </AlertDialogMedia>
            <AlertDialogTitle className="font-heading text-xl font-bold">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the listing for{" "}
              <span className="font-semibold text-foreground">
                {studio.title}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-border">
            <AlertDialogCancel>Keep listing</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 aria-hidden="true" />
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
};

export default MylistingsCard;
