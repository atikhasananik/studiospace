"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { postStudioData } from "../data/postData";
import type { IStudio } from "../type/studio.type";
import { updateStudioData } from "../data/updateData";
import type { TUpdatedData } from "../type/updateData.type";
import { ListingDetailsSection } from "./ListingDetailsSection";
import { PricingSection } from "./PricingSection";
import { AmenitiesSection } from "./AmenitiesSection";
import { OverviewSection } from "./OverviewSection";
import { HostSection } from "./HostSection";
import { FormActions } from "./FormActions";
import { authClient } from "@/lib/auth-client";
import { date } from "better-auth";


type AddStudioFormProps = {
  user: {
    name: string;
    email: string;
  };
  studio?: IStudio;
};

export function AddStudioForm({ user, studio }: AddStudioFormProps) {
  const [amenities, setAmenities] = useState<string[]>(studio?.amenities ?? []);
  const [customAmenity, setCustomAmenity] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState<string | null>(
    studio?.category ?? null,
  );
  
  const router = useRouter();
  
  const toggleAmenity = (amenity: string, checked: boolean) => {
    setAmenities((current) =>
      checked
        ? [...current, amenity]
        : current.filter((value) => value !== amenity),
    );
  };

  const addCustomAmenity = () => {
    const amenity = customAmenity.trim();
    if (!amenity || amenities.includes(amenity)) return;
    setAmenities((current) => [...current, amenity]);
    setCustomAmenity("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const getValue = (name: string) => String(formData.get(name) ?? "");
    const{data,error} = await authClient.token()
    const token = data?.token as string
    
    try {
      if (studio) {
        const updatedData: TUpdatedData = {
          title: getValue("title"),
          category: getValue("category"),
          location: getValue("location"),
          imageUrl: getValue("imageUrl"),
          hourlyRate: getValue("hourlyRate"),
          securityDeposit: getValue("securityDeposit"),
          maxCapacity: getValue("maxCapacity"),
          rating: getValue("rating"),
          amenities,
          detailedOverview: getValue("detailedOverview"),
          hostEmail: user.email,
          hostName: user.name,
        };
        
        const result = await updateStudioData(studio._id, updatedData,token);

        if (result === false) {
          toast.add({
            title: "Studio update failed",
            description: "Unable to update this studio. Please try again.",
            type: "error",
          });
          setSubmitError("Unable to update this studio. Please try again.");
          return;
        }
      } else {
        const payload = {
          ...Object.fromEntries(formData.entries()),
          amenities,
          hostEmail: user.email,
          hostName: user.name,
        };
        const result = await postStudioData(payload, token);
        if (!result?.acknowledged) {
          toast.add({
            title: "Studio creation failed",
            description: "Unable to add this studio. Please try again.",
            type: "error",
          });
          setSubmitError("Unable to add this studio. Please try again.");
          return;
        }
      }

      toast.add({
        title: studio ? "Studio updated" : "Studio created",
        description: studio
          ? "Your listing changes have been saved."
          : "Your new studio listing is live.",
        type: "success",
      });
      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : `Unable to ${studio ? "update" : "add"} this studio. Please try again.`;
      toast.add({
        title: studio ? "Studio update failed" : "Studio creation failed",
        description: message,
        type: "error",
      });
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex-1 overflow-hidden bg-background py-15 md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_68%)]"
      />
      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <Button
          nativeButton={false}
          render={<Link href={studio ? "/my-listings" : "/studios"} />}
          variant="ghost"
          className="mb-6 gap-2 pl-0 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" />
          {studio ? "Back to my listings" : "Back to studios"}
        </Button>

        <header className="mb-8 max-w-2xl">
          <Badge
            variant="outline"
            className="gap-2 border-accent/30 bg-card/80 px-3 py-1 text-accent"
          >
            <span
              className="size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {studio ? "HOST / EDIT WORKSPACE" : "Host a creative space"}
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            {studio ? (
              <>
                Update your <span className="text-primary">studio</span>
              </>
            ) : (
              <>
                Add a new <span className="text-primary">studio</span>
              </>
            )}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {studio
              ? "Refresh your listing details so creators have the latest information about your space."
              : "Share the details creators need to find the right space for their next project."}
          </p>
        </header>

        {submitError && (
          <Alert
            variant="destructive"
            className="mb-6 border-destructive/30 bg-destructive/5"
          >
            <Info aria-hidden="true" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          onReset={() => {
            setAmenities(studio?.amenities ?? []);
            setCustomAmenity("");
            setCategory(studio?.category ?? null);
            setSubmitError("");
          }}
          onChange={() => setSubmitError("")}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5"
        >
          <div className="space-y-10 p-5 sm:p-8 lg:p-10">
            <ListingDetailsSection
              studio={studio}
              category={category}
              onCategoryChange={setCategory}
            />
            <PricingSection studio={studio} />
            <AmenitiesSection
              amenities={amenities}
              customAmenity={customAmenity}
              onCustomAmenityChange={setCustomAmenity}
              onAddCustomAmenity={addCustomAmenity}
              onToggleAmenity={toggleAmenity}
            />
            <OverviewSection studio={studio} />
            <HostSection  user={user} />
          </div>
          <FormActions
            isEditing={Boolean(studio)}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </section>
  );
}
