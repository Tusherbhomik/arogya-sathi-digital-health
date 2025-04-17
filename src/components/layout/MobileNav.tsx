
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  User, 
  UserPlus, 
  FileText, 
  Pill, 
  BarChart3,
  Home,
  ClipboardList,
  UserCog
} from "lucide-react";

export function MobileNav() {
  const location = useLocation();
  const [role] = useState<string>("patient"); // For demo, would come from auth context
  
  const patientLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/health-card", label: "Health Card", icon: User },
    { href: "/medical-records", label: "Medical Records", icon: FileText },
    { href: "/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/profile", label: "Profile", icon: UserCog },
  ];
  
  const doctorLinks = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/patients", label: "Patients", icon: UserPlus },
    { href: "/medical-records", label: "Records", icon: FileText },
    { href: "/prescriptions", label: "Prescriptions", icon: FileText },
    { href: "/profile", label: "Profile", icon: UserCog },
  ];
  
  const adminLinks = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/users", label: "User Management", icon: User },
    { href: "/audit", label: "Audit Logs", icon: ClipboardList },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/profile", label: "Profile", icon: UserCog },
  ];
  
  const pharmacyLinks = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/verify", label: "Verify Prescription", icon: FileText },
    { href: "/dispense", label: "Dispense Medicine", icon: Pill },
    { href: "/history", label: "History", icon: ClipboardList },
    { href: "/profile", label: "Profile", icon: UserCog },
  ];
  
  const auditorLinks = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/audit", label: "Audit Records", icon: ClipboardList },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/flagged", label: "Flagged Items", icon: FileText },
    { href: "/profile", label: "Profile", icon: UserCog },
  ];
  
  // Choose the right links based on user role
  const links = 
    role === "doctor" ? doctorLinks :
    role === "admin" ? adminLinks :
    role === "pharmacy" ? pharmacyLinks :
    role === "auditor" ? auditorLinks :
    patientLinks;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="py-2">
        <h2 className="px-4 text-lg font-semibold tracking-tight mb-3">
          Menu
        </h2>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                  location.pathname === link.href
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
