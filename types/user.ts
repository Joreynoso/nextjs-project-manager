
export type Role = {
  role?: "user" | "admin"
}

export type User = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
} & Role

export type Password = {
    password: string; // required
    passwordConfirmation: string; // required
}

export type Member = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
} & Role
  
