export interface CurrentUser {
  id: string;
  email: string;
  name: string | null;
  imageUrl: string | null;
  onboardingCompleted: boolean;
}
