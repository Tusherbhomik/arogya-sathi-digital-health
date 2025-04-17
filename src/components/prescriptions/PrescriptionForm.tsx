
import { useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Prescription, Medicine } from "@/types/medical";
import { Card, CardContent } from "@/components/ui/card";

const medicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  duration: z.string().min(1, "Duration is required"),
  frequency: z.string().min(1, "Frequency is required"),
  notes: z.string().optional(),
});

const prescriptionSchema = z.object({
  patientId: z.string().min(1, "Patient ID is required"),
  doctorId: z.string().min(1, "Doctor ID is required"),
  hospitalName: z.string().min(1, "Hospital name is required"),
  date: z.date(),
  expiryDate: z.date(),
  medicines: z.array(medicineSchema).min(1, "At least one medicine is required"),
  instructions: z.string().min(1, "Instructions are required"),
});

type PrescriptionFormValues = z.infer<typeof prescriptionSchema>;

interface PrescriptionFormProps {
  onSubmit: (prescription: Prescription) => void;
  patient?: { id: string; name: string };
}

export function PrescriptionForm({ onSubmit, patient }: PrescriptionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Form setup
  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues: {
      patientId: patient?.id || "",
      doctorId: "doctor-123", // This would come from authentication in a real app
      hospitalName: "City Medical Center", // This would come from doctor profile in a real app
      date: new Date(),
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      medicines: [{ 
        name: "", 
        dosage: "", 
        duration: "", 
        frequency: "", 
        notes: "" 
      }] as Medicine[], // Explicitly type as Medicine[] to match the required type
      instructions: "",
    },
  });

  // Setup fields array for medicines
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicines",
  });

  // Handle form submission
  const handleSubmit = async (data: PrescriptionFormValues) => {
    setIsLoading(true);
    try {
      // Create prescription
      const prescription: Prescription = {
        id: `presc-${Date.now()}`,
        patientId: data.patientId,
        doctorId: data.doctorId,
        hospitalName: data.hospitalName,
        date: data.date.toISOString(),
        expiryDate: data.expiryDate.toISOString(),
        medicines: data.medicines,
        instructions: data.instructions,
        status: "active",
        verificationCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      };
      
      // Save prescription
      onSubmit(prescription);
      form.reset();
    } catch (error) {
      console.error("Error creating prescription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {patient ? `Create Prescription for ${patient.name}` : "Create Prescription"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient ID</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter patient ID" 
                    {...field} 
                    disabled={!!patient}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="doctorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor ID</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter doctor ID" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter hospital name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expiry Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick an expiry date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Medicines</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => append({ 
                  name: "", 
                  dosage: "", 
                  duration: "", 
                  frequency: "", 
                  notes: "" 
                })}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Medicine
              </Button>
            </div>
            
            <div className="space-y-4">
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Medicine {index + 1}</h4>
                      {index > 0 && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => remove(index)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`medicines.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Medicine Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter medicine name" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`medicines.${index}.dosage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dosage</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., 500mg" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`medicines.${index}.frequency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frequency</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Twice daily" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`medicines.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., 7 days" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name={`medicines.${index}.notes`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Notes (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Additional notes" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter detailed instructions for the patient" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Prescription"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
