export interface User {
  _id: string;
  email: string;
  name: string;
  authToken: string;
  googleId?: string;
  isVerified: boolean;
  provider: "local" | "google";
  createdAt: Date;
  picture?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
  url?: string;
}

export interface AuthStatus {
  user: User | null;
  isAuthenticated: boolean;
}

 