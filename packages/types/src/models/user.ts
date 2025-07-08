// Domain Entity: User
export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}
