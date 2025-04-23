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
  preferedPlayTime: PreferedPlayTime;
  //TODO: add this to the user model and db
  notifications: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
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
  UNCOMPLETE = "UNCOMPLETE",
}

enum SkillLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  PROFESSIONAL = "PROFESSIONAL",
}

enum PreferedPlayTime {
  MORNING = "MORNING",
  LATE_MORNING = "LATE_MORNING",
  AFTERNOON = "AFTERNOON",
  EVENING = "EVENING",
  NIGHT = "NIGHT",
  ANYTIME = "ANYTIME",
}
