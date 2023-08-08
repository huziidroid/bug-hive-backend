import { Exclude } from 'class-transformer';

export class ReporterEntity {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<ReporterEntity>) {
    Object.assign(this, partial);
  }
}
