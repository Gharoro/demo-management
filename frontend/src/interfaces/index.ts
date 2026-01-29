export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface FeatureCardProps {
  feature: Feature;
}

export interface DemoFormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  companyName: string;
  country: string;
  phoneNumber: string;
  companyWebsite: string;
  processingVolume: string;
  howDidYouHear: string;
  description: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface CreateUserData {
  userId: string;
  isVerified: boolean;
  verificationToken?: string;
  accessToken?: string;
}

export interface CreateUserResponse extends ApiResponse<CreateUserData> {}

export interface VerifyEmailData {
  isVerified: boolean;
  accessToken?: string;
}

export interface VerifyEmailResponse extends ApiResponse<VerifyEmailData> {}

export interface AlertProps {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export interface CreateDemoRequestPayload {
  jobTitle: string;
  companyName: string;
  country: string;
  phoneNumber: string;
  companyWebsite?: string;
  currentMonthlyProcessingVolume?: number;
  howDidYouHearAboutEnif?: string;
  description?: string;
}

export interface CreateDemoRequestData {
  demoRequest: {
    _id: string;
    user: string;
    jobTitle: string;
    companyName: string;
    country: string;
    phoneNumber: string;
    status: string;
  };
}

export interface CreateDemoRequestResponse extends ApiResponse<CreateDemoRequestData> {}
