import { ApiResponse, Role } from '@shared/types';

export interface UserProfileDto {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  timezone: string;
  locale: string;
  roles: Role[];
}

export type MeResponse = ApiResponse<UserProfileDto>;
