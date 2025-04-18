interface UserNT {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  avatar: string;
  role: UserRole | null;
  status: MemberStatus;
  level: SkillLevel;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  dateOfBirth: Date | null;
  address: string | null;
  bio: string | null;
  parentId: string | null;
}

enum UserRole {
  STUDENT = "STUDENT",
  PARENT = "PARENT",
  MEMBER = "MEMBER",
}

enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
  INCOMPLETE = "INCOMPLETE",
}

enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
