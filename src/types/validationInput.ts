import {
  IsString,
  IsBoolean,
  IsArray,
  IsDate,
  isDateString,
  IsDateString,
  IsObject,
  IsNumber,
} from "class-validator";

export class UserSignUpInput {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  city: string;
  @IsString()
  role: string;
  @IsBoolean()
  isAccountVerified: boolean;
  @IsString()
  accountVerificationToken: string;
  @IsDateString()
  accountVerificationTokenExpires: Date;
  @IsArray()
  projects: object;
}

export class UserSignInInput {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class EmployeeSignUpInput {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: number;
  @IsString()
  city: string;
  @IsString()
  profilePhoto: string;
  @IsString()
  bio: string;
  @IsString()
  role: string;
  @IsString()
  linkedinProfile: string;
}

export class EmployeeSignInInput {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class AddCityInput {
  @IsString()
  city: string;
}

export class UserUpdateInfo {
  @IsString()
  id: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  city: string;
  @IsString()
  role: string;
  @IsBoolean()
  isAccountVerified: boolean;
  @IsString()
  accountVerificationToken: string;
  @IsDateString()
  accountVerificationTokenExpires: Date;
}

export class EmployeeUpdateInfo {
  @IsString()
  id: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: number;
  @IsString()
  city: string;
  @IsString()
  profilePhoto: string;
  @IsString()
  bio: string;
  @IsString()
  role: string;
  @IsString()
  linkedinProfile: string;
}

export class TokenInput {
  @IsString()
  token: string;
}

export class ProjectInfo {
  @IsString()
  id: string;
  @IsString()
  projectName: string;
  @IsString()
  projectCity: string;
  @IsString()
  projectArea: number;
  @IsString()
  projectDuration: number;
  @IsString()
  projectEstimate: number;
}

export class AdminSignUpInput {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  phone: number;
  @IsString()
  city: string;
  @IsString()
  profilePhoto: string;
  @IsString()
  bio: string;
  @IsString()
  role: string;
  @IsString()
  linkedinProfile: string;
}

export class CustomerProjectInput {
  @IsObject()
  customerId: object;
  @IsString()
  projectCity: string;
  @IsNumber()
  projectArea: number;
  @IsString()
  projectType: string;
}

export class ProjectIdInput {
  @IsString()
  projectId: string;
}

export class ProjectAssignmentInput {
  @IsString()
  projectId: string;
  @IsString()
  assigneeId: string;
  @IsString()
  projectName: string;
  @IsBoolean()
  projectConfirmationStatus: boolean;
  @IsBoolean()
  projectAssigned: boolean;
}

export class ProjectReviewInput {
  @IsNumber()
  projectId: number;
  @IsNumber()
  projectArea: number;
  @IsString()
  projectType: string;
  @IsNumber()
  projectEstimate: number;
  @IsString()
  projectCity: string;
}

export class ProjectCancelInput {
  @IsString()
  projectId: string;
}
