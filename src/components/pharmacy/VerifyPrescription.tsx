
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Prescription } from "@/types/medical";

const verificationSchema = z.object({
  verificationCode: z.string().min(6, "Verification code must be at least 6 characters"),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

interface VerifyPrescriptionProps {
  onVerify: (prescription: Prescription | null) => void;
}

export function VerifyPrescription({ onVerify }: VerifyPrescriptionProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Form setup
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: VerificationFormValues) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to verify the prescription
      console.log("Verifying prescription with code:", data.verificationCode);
      
      // For demo purposes, simulate a successful verification after 1.5 seconds
      setTimeout(() => {
        // Mock prescription data
        const prescription: Prescription = {
          id: "presc-123456",
          patientId: "pat-987654",
          doctorId: "doc-246810",
          hospitalName: "City Medical Center",
          date: new Date().toISOString(),
          expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          medicines: [
            {
              name: "Amoxicillin",
              dosage: "500mg",
              duration: "7 days",
              frequency: "3 times daily",
              notes: "Take after meals",
            },
            {
              name: "Paracetamol",
              dosage: "650mg",
              duration: "3 days",
              frequency: "as needed for fever",
            },
          ],
          instructions: "Complete the full course of antibiotics. Rest and drink plenty of fluids.",
          status: "active",
          verificationCode: data.verificationCode,
        };
        
        onVerify(prescription);
      }, 1500);
    } catch (error) {
      console.error("Verification failed:", error);
      onVerify(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Verify Prescription</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Enter the verification code provided on the patient's prescription to verify its authenticity.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter the prescription verification code" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Prescription"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
