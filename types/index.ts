import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  features: string[];
}

export interface WhyUsItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ScopeItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  service: string;
  area: string;
  rating: number;
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ServiceType =
  | "move-in"
  | "move-out"
  | "residential"
  | "office"
  | "post-construction"
  | "etc";

export interface QuoteFormValues {
  name: string;
  phone: string;
  serviceType: ServiceType;
  area: string;
  address: string;
  message?: string;
  privacyAgree: boolean;
}
