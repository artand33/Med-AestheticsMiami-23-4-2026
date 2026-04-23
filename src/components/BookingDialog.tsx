import { createContext, useContext, useState, ReactNode, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

type Ctx = { open: () => void };
const BookingCtx = createContext<Ctx>({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honey = (form.elements.namedItem("company") as HTMLInputElement)?.value;
    if (honey) return; // bot
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    if (!name || !email || !phone) {
      toast.error("Please complete name, email and phone.");
      return;
    }
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setService("");
  };

  return (
    <BookingCtx.Provider value={{ open: () => { reset(); setIsOpen(true); } }}>
      {children}
      <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) reset(); }}>
        <DialogContent className="sm:max-w-lg bg-background">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl">Book Your Bespoke Consultation</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Share a few details and our team will reach out within one business day to design your roadmap.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4 mt-2">
                {/* honeypot */}
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required maxLength={80} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required maxLength={30} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required maxLength={120} />
                </div>
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="date">Preferred date</Label>
                    <Input id="date" name="date" type="date" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Input id="notes" name="notes" maxLength={200} placeholder="Anything we should know" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-primary-foreground h-11 font-medium tracking-wide">
                  Request Consultation
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to be contacted regarding your inquiry.
                </p>
              </form>
            </>
          ) : (
            <div className="py-6 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h3 className="font-serif text-2xl">Thank you.</h3>
              <p className="text-muted-foreground">
                Your consultation request has been received. A member of our concierge team will reach out within one business day to begin designing your bespoke roadmap.
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