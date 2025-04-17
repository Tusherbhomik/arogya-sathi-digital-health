
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserRole } from "@/types/user";

const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "NID or phone number is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  nid: z.string().min(10, "NID must be at least 10 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["patient", "doctor", "admin", "auditor", "pharmacy"] as const),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      nid: "",
      phoneNumber: "",
      password: "",
      role: "patient",
    },
  });

  // Handle login form submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      // Here would be an actual login API call
      console.log("Login with:", data);
      
      // Fake successful authentication
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle register form submission
  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      // Here would be an actual registration API call
      console.log("Register with:", data);
      
      // Fake successful registration
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      
      {/* Login Tab */}
      <TabsContent value="login">
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Login to Your Account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your NID or phone number and password to access your account
            </p>
          </div>
          
          <Form {...loginForm}>
            <form 
              onSubmit={loginForm.handleSubmit(onLoginSubmit)} 
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NID or Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your NID or phone number" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </TabsContent>
      
      {/* Register Tab */}
      <TabsContent value="register">
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to create your Arogya Sathi account
            </p>
          </div>
          
          <Form {...registerForm}>
            <form 
              onSubmit={registerForm.handleSubmit(onRegisterSubmit)} 
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID (NID)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your NID number" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your phone number" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Create a password" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={registerForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Account Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="patient" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Patient
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="doctor" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Doctor
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pharmacy" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pharmacy
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="admin" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Admin
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="auditor" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Auditor
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
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
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </TabsContent>
    </Tabs>
  );
}
