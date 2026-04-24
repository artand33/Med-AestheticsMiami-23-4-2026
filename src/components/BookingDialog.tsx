import { createContext, useContext, useState, ReactNode, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locations } from "@/lib/locations";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type BookingOpenOptions = {
  treatmentName?: string;
};

type Ctx = { open: (options?: BookingOpenOptions) => void };
const BookingCtx = createContext<Ctx>({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [treatmentName, setTreatmentName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submittedLocationName, setSubmittedLocationName] = useState("");

  const totalSteps = 3;
  const stepTitles = ["Choose location", "Your details", "Appointment info"] as const;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honey = (form.elements.namedItem("company") as HTMLInputElement)?.value;
    if (honey) return; // bot
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    if (!location || !trimmedName || !trimmedEmail || !trimmedPhone) {
      toast.error("Please complete preferred location, name, email and phone.");
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const selectedLocation = locations.find((item) => item.id === location);
    const submissionPayload = {
      location,
      locationName: selectedLocation?.name ?? "",
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      service,
      treatmentName: treatmentName.trim(),
      date,
      notes: notes.trim(),
    };
    setSubmittedLocationName(submissionPayload.locationName);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setStep(1);
    setLocation("");
    setName("");
    setPhone("");
    setEmail("");
    setService("");
    setTreatmentName("");
    setDate("");
    setNotes("");
    setSubmittedLocationName("");
  };

  const selectedLocation = locations.find((item) => item.id === location);
  const locationOptions = locations.filter((item) => ["brickell", "coral-gables", "aventura"].includes(item.id));

  const nextStep = () => {
    if (step === 1 && !location) {
      toast.error("Please choose your preferred location.");
      return;
    }
    if (step === 2) {
      if (!name.trim() || !phone.trim() || !email.trim()) {
        toast.error("Please complete name, phone, and email.");
        return;
      }
      if (!emailRegex.test(email.trim())) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <BookingCtx.Provider
      value={{
        open: (options?: BookingOpenOptions) => {
          reset();
          setTreatmentName(options?.treatmentName ?? "");
          setIsOpen(true);
        },
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) reset(); }}>
        <DialogContent className="my-8 max-h-[85vh] overflow-y-auto rounded-2xl bg-[#F9F9F7] shadow-xl sm:max-w-2xl [&>button]:opacity-100 [&>button]:text-[#0F0F0F]/70">
          {!submitted ? (
            <>
              <DialogHeader className="pr-10">
                <DialogTitle className="font-serif text-3xl">Book Your Bespoke Consultation</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Share a few details and our team will reach out within one business day to design your roadmap.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 rounded-lg border border-[#C5A059]/25 bg-[#C5A059]/10 px-4 py-2 text-sm text-[#0F0F0F]/75">
                Step {step} of {totalSteps} — {stepTitles[step - 1]}
              </div>
              <form onSubmit={onSubmit} className="space-y-4 mt-2">
                {/* honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {step === 1 ? (
                  <div className="space-y-1.5">
                    <Label>Preferred Location</Label>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      {locationOptions.map((item) => {
                        const isSelected = location === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setLocation(item.id)}
                            className={`rounded-xl border p-4 text-left transition-colors ${
                              isSelected
                                ? "border-[#C5A059] bg-[#C5A059]/12"
                                : "border-stone-200 bg-white hover:border-[#C5A059]/50"
                            }`}
                          >
                            <p className="font-medium text-[#0F0F0F]">{item.name.replace(" - ", " — ")}</p>
                            <p className="mt-1 text-xs text-[#0F0F0F]/70">{item.address}</p>
                            <p className="mt-1 text-xs text-[#0F0F0F]/70">{item.phone}</p>
                          </button>
                        );
                      })}
                    </div>
                    <input type="hidden" name="location" value={location} />
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" name="name" required maxLength={80} value={name} onChange={(event) => setName(event.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" type="tel" required maxLength={30} value={phone} onChange={(event) => setPhone(event.target.value)} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required maxLength={120} value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                  </div>
                ) : null}

                {step === 3 ? (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="service">Area of interest</Label>
                      <Select value={service} onValueChange={setService}>
                        <SelectTrigger id="service"><SelectValue placeholder="Select a treatment focus" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skin">Skin Remodeling (Morpheus8)</SelectItem>
                          <SelectItem value="body">Body Transformation (Venus Bliss)</SelectItem>
                          <SelectItem value="facial">Facial Artistry (Injectables)</SelectItem>
                          <SelectItem value="laser">Laser Excellence (Aerolase)</SelectItem>
                          <SelectItem value="unsure">Not sure yet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="treatment">Treatment of interest</Label>
                      <Input
                        id="treatment"
                        name="treatment"
                        value={treatmentName}
                        onChange={(event) => setTreatmentName(event.target.value)}
                        maxLength={120}
                        placeholder="Optional specific treatment"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="date">Preferred date</Label>
                        <Input id="date" name="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="notes">Notes (optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          maxLength={400}
                          placeholder="Anything we should know"
                          value={notes}
                          onChange={(event) => setNotes(event.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                    {selectedLocation ? (
                      <p className="text-xs text-muted-foreground">{selectedLocation.name} · {selectedLocation.address} · {selectedLocation.phone}</p>
                    ) : null}
                    <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground h-11 font-medium tracking-wide">
                      Request Consultation
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to be contacted regarding your inquiry.
                    </p>
                  </>
                ) : null}

                {step < 3 ? (
                  <div className="flex items-center justify-between gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={previousStep} disabled={step === 1}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep} className="bg-gold hover:bg-gold/90 text-primary-foreground">
                      Next
                    </Button>
                  </div>
                ) : null}
              </form>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h3 className="font-serif text-2xl">Thank you.</h3>
              <p className="text-muted-foreground">
                Your consultation request has been received. A team member from our {submittedLocationName} clinic will reach out within one business day to begin designing your bespoke roadmap.
              </p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </BookingCtx.Provider>
  );
}

export function BookButton({ className = "", children = "Book Your Bespoke Consultation", variant = "primary" }: { className?: string; children?: ReactNode; variant?: "primary" | "outline" }) {
  const { open } = useBooking();
  if (variant === "outline") {
    return (
      <Button onClick={open} variant="outline" className={`border-gold text-gold hover:bg-gold hover:text-primary-foreground ${className}`}>
        {children}
      </Button>
    );
  }
  return (
    <Button onClick={open} className={`bg-gold hover:bg-gold/90 text-primary-foreground tracking-wide ${className}`}>
      {children}
    </Button>
  );
}