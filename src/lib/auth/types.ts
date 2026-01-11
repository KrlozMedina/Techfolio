export type UserRole = "admin" | "editor" | "viewer";

export type AuthUser = {
  username: string;
  role: UserRole;
};
