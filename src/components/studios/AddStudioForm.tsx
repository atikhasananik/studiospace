"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  AudioLines,
  Check,
  Clapperboard,
  ImagePlus,
  Info,
  Mic,
  Palette,
  Plus,
  Camera,
  X,
  Star,
} from "lucide-react";
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { postStudioData } from "../data/postData";

const CATEGORIES = [
  { label: "Photo Studios", icon: Camera, detail: "Photography & production" },
  { label: "Sound Stages", icon: Clapperboard, detail: "Film & video shoots" },
  { label: "Podcast Rooms", icon: Mic, detail: "Podcasting & voice work" },
  { label: "Music Suites", icon: AudioLines, detail: "Recording & music" },
  { label: "Art Workshops", icon: Palette, detail: "Artistry & making" },
];

const FIELD_CONTROL_CLASS =
  "h-11 w-full rounded-lg border-border bg-background px-3.5 text-sm shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20";

const AMENITIES = [
  "High-speed Wi-Fi",
  "Professional lighting",
  "Soundproofing",
  "Changing room",
  "Air conditioning",
  "Free parking",
  "Kitchen access",
  "Wheelchair accessible",
  "Green screen",
  "Recording equipment",
];

type AddStudioFormProps = {
  user: {
    name: string;
    email: string;
  };
};

function FormField({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

export function AddStudioForm({ user }: AddStudioFormProps) {
  // Track the amenities selected in the custom checkbox list so we can submit them as an array.
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState("");
  const [previewNotice, setPreviewNotice] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  // Keep the selected amenity list in sync with the custom UI controls.
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
    const form = event.currentTarget;

    setPreviewNotice(true);

    const formData = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(
      formData.entries(),
    );

    data.amenities = amenities;
    data.ownerEmail = user.email;

    const res = await postStudioData(data);
    console.log(data)
    console.log(res);
    if (!res.acknowledged) {
      console.log("Failed to submit studio data:");
      return;
    } else {
      form.reset();
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
          render={<Link href="/studios" />}
          variant="ghost"
          className="mb-6 gap-2 pl-0 text-muted-foreground hover:text-primary"
        >
          <ArrowLeft aria-hidden="true" />
          Back to studios
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
            Host a creative space
          </Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Add a new <span className="text-primary">studio</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Share the details creators need to find the right space for their
            next project.
          </p>
        </header>

        {previewNotice && (
          <Alert className="mb-6 border-accent/30 bg-accent/5 text-foreground">
            <Info className="text-accent" aria-hidden="true" />
            <AlertDescription className="text-foreground">
              This form is a UI preview. Your studio details have not been
              submitted or saved.
            </AlertDescription>
          </Alert>
        )}

        <form
          onSubmit={handleSubmit}
          onReset={() => {
            setAmenities([]);
            setCustomAmenity("");
            setCategory(null);
            setPreviewNotice(false);
          }}
          onChange={() => setPreviewNotice(false)}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5"
        >
          <div className="space-y-10 p-5 sm:p-8 lg:p-10">
            <section aria-labelledby="listing-details-heading">
              <div className="mb-6 border-b border-border pb-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                  01 / LISTING
                </p>
                <h2
                  id="listing-details-heading"
                  className="mt-2 font-heading text-xl font-bold text-foreground"
                >
                  Studio details
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Give your space a clear identity.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <FormField
                    id="title"
                    label="Studio title"
                    hint="Choose a name that helps creators understand what makes your space special."
                  >
                    <Input
                      id="title"
                      name="title"
                      required
                      placeholder="e.g. The Northlight Photo Loft"
                      className={FIELD_CONTROL_CLASS}
                    />
                  </FormField>
                </div>

                <FormField id="category" label="Category">
                  <Select
                    name="category"
                    required
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger
                      id="category"
                      className={`${FIELD_CONTROL_CLASS} justify-between  py-5.5 data-popup-open:border-primary/40 data-popup-open:bg-card`}
                    >
                      <SelectValue placeholder="Choose a studio category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl  border border-border bg-card p-2 shadow-2xl shadow-background/40 ring-1 ring-primary/10">
                      {CATEGORIES.map(
                        ({ label, icon: Icon, detail }, index) => (
                          <SelectItem
                            key={label}
                            value={label}
                            className="group my-0.5 min-h-14 rounded-xl py-2 px-2.5  text-sm text-foreground transition-colors data-highlighted:bg-primary/10 data-highlighted:text-foreground data-[selected]:bg-primary/5"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-primary transition-colors group-data-highlighted:border-primary/30 group-data-highlighted:bg-primary/10">
                                <Icon className="size-4" aria-hidden="true" />
                              </span>
                              <span className="flex min-w-0 flex-col gap-1">
                                <span className="font-semibold leading-none">
                                  {label}
                                </span>
                                <span className="text-xs leading-none text-muted-foreground">
                                  {detail}
                                </span>
                              </span>
                              <span className="ml-auto mr-1 font-mono text-[10px] tracking-widest text-muted-foreground/60">
                                0{index + 1}
                              </span>
                            </span>
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField
                  id="location"
                  label="Location / address"
                  hint="Include a city or neighborhood so guests can find your space."
                >
                  <Input
                    id="location"
                    name="location"
                    required
                    placeholder="e.g. 24 Mercer Street, New York"
                    className={FIELD_CONTROL_CLASS}
                  />
                </FormField>

                <FormField
                  id="imageUrl"
                  label="Cover image URL"
                  hint="Use a direct link to a high-quality image of your studio."
                >
                  <div className="relative">
                    <ImagePlus
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      placeholder="https://example.com/studio.jpg"
                      className={`${FIELD_CONTROL_CLASS} pl-10`}
                    />
                  </div>
                </FormField>

                <FormField
                  id="Rating"
                  label="Studio Rating"
                  hint="Rate your studio from 0 to 5."
                >
                  <div className="relative">
                    <Star
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <Input
                      id="Rating"
                      name="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="4.0"
                      className={`${FIELD_CONTROL_CLASS} pl-10`}
                    />
                  </div>
                </FormField>
              </div>
            </section>

            <section aria-labelledby="pricing-heading">
              <div className="mb-6 border-b border-border pb-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                  02 / PRICING
                </p>
                <h2
                  id="pricing-heading"
                  className="mt-2 font-heading text-xl font-bold text-foreground"
                >
                  Rates & capacity
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Set expectations for your guests before they book.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <FormField id="hourlyRate" label="Hourly rate">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className={`${FIELD_CONTROL_CLASS} pl-8`}
                    />
                  </div>
                </FormField>

                <FormField id="securityDeposit" label="Security deposit">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      $
                    </span>
                    <Input
                      id="securityDeposit"
                      name="securityDeposit"
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="0.00"
                      className={`${FIELD_CONTROL_CLASS} pl-8`}
                    />
                  </div>
                </FormField>

                <FormField id="maxCapacity" label="Maximum capacity">
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    min="1"
                    step="1"
                    required
                    placeholder="e.g. 12"
                    className={FIELD_CONTROL_CLASS}
                  />
                </FormField>
              </div>
            </section>

            <section aria-labelledby="amenities-heading">
              <div className="mb-6 border-b border-border pb-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                  03 / FEATURES
                </p>
                <h2
                  id="amenities-heading"
                  className="mt-2 font-heading text-xl font-bold text-foreground"
                >
                  Amenities & equipment
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select what guests can expect to find in your space.
                </p>
              </div>

              <fieldset>
                <legend className="sr-only">Available amenities</legend>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {AMENITIES.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background px-3 py-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground has-aria-checked:border-primary/40 has-aria-checked:bg-primary/5 has-aria-checked:text-foreground"
                    >
                      <Checkbox
                        checked={amenities.includes(amenity)}
                        onCheckedChange={(checked) =>
                          toggleAmenity(amenity, checked === true)
                        }
                      />
                      {amenity}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5">
                <Label
                  htmlFor="customAmenity"
                  className="mb-2 text-sm font-semibold text-foreground"
                >
                  Add another amenity
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="customAmenity"
                    value={customAmenity}
                    onChange={(event) => setCustomAmenity(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addCustomAmenity();
                      }
                    }}
                    placeholder="Type an amenity and add it"
                    className={FIELD_CONTROL_CLASS}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addCustomAmenity}
                    className="h-11 shrink-0 gap-2"
                  >
                    <Plus aria-hidden="true" />
                    Add
                  </Button>
                </div>
                {amenities.some((amenity) => !AMENITIES.includes(amenity)) && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {amenities
                      .filter((amenity) => !AMENITIES.includes(amenity))
                      .map((amenity) => (
                        <li key={amenity}>
                          <Badge
                            variant="outline"
                            className="gap-1.5 border-primary/30 bg-primary/5 py-1.5 text-foreground"
                          >
                            {amenity}
                            <button
                              type="button"
                              aria-label={`Remove ${amenity}`}
                              onClick={() => toggleAmenity(amenity, false)}
                              className="rounded-full text-muted-foreground transition-colors hover:text-destructive"
                            >
                              <X className="size-3" aria-hidden="true" />
                            </button>
                          </Badge>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </section>

            <section aria-labelledby="overview-heading">
              <div className="mb-6 border-b border-border pb-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                  04 / STORY
                </p>
                <h2
                  id="overview-heading"
                  className="mt-2 font-heading text-xl font-bold text-foreground"
                >
                  Tell us about your space
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add helpful details about the space, setup, and ideal
                  projects.
                </p>
              </div>

              <FormField
                id="detailedOverview"
                label="Detailed overview"
                hint="Share any important details guests should know before booking."
              >
                <Textarea
                  id="detailedOverview"
                  name="detailedOverview"
                  required
                  rows={6}
                  placeholder="Describe the studio, its atmosphere, equipment, access, and what makes it a great place to create..."
                  className="min-h-36 resize-y rounded-xl border-border bg-background px-3.5 py-3 text-sm shadow-sm transition-all placeholder:text-muted-foreground/70 hover:border-primary/40 focus-visible:border-primary focus-visible:ring-primary/20"
                />
              </FormField>
            </section>

            <section aria-labelledby="host-heading">
              <div className="mb-6 border-b border-border pb-4">
                <p className="font-mono text-xs font-semibold tracking-[0.18em] text-primary">
                  05 / HOST
                </p>
                <h2
                  id="host-heading"
                  className="mt-2 font-heading text-xl font-bold text-foreground"
                >
                  Host account
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  These details are read-only and associated with your account.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField id="hostName" label="Your name">
                  <Input
                    id="hostName"
                    name="hostName"
                    value={user.name}
                    readOnly
                    className={`${FIELD_CONTROL_CLASS} cursor-not-allowed bg-muted text-muted-foreground hover:border-border`}
                  />
                </FormField>
                <FormField id="hostEmail" label="Your email">
                  <Input
                    id="hostEmail"
                    name="hostEmail"
                    type="email"
                    value={user.email}
                    readOnly
                    className={`${FIELD_CONTROL_CLASS} cursor-not-allowed bg-muted text-muted-foreground hover:border-border`}
                  />
                </FormField>
              </div>
            </section>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <p className="text-xs leading-relaxed text-muted-foreground">
              UI preview only — your listing will not be saved.
            </p>
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <Button type="reset" variant="outline" className="h-11 px-5">
                Reset form
              </Button>
              <Button
                type="submit"
                className="h-11 gap-2 rounded-lg px-6 font-semibold shadow-lg shadow-primary/15"
              >
                <Check aria-hidden="true" />
                Add Studio
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
