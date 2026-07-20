export interface NavLink {
  label: string;
  href: string;
}

export interface QuoteFormValues {
  name: string;
  phone: string;
  serviceType: string;
  area: string;
  address: string;
  message?: string;
  privacyAgree: boolean;
}
