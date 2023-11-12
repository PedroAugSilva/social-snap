export interface User {
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  updatedAt?: Date;
}
