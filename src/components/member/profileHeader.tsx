import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import ActionButton from "../ui/actionbtn";
import { useAuthStore } from "@/stores/authStore";

export default function ProfileHeader() {
  const { user, isAuthenticated, loading } = useAuthStore();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || !user) return <div>Please log in</div>;

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 bg-gray-800 rounded-lg shadow-sm">
      <div className="relative">
        <Avatar className="h-24 w-24 border-2 border-pear">
          <AvatarImage src={user.avatar} alt={user.name} />
        </Avatar>
        {user.status && (
          <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pear">
            {user.status}
          </Badge>
        )}
      </div>

      <div className="text-center md:text-left space-y-1">
        <h1 className="text-2xl font-bold font-poppins text-pear">
          {user.name}
        </h1>
        <p className="text-foreground font-thin">{user.email}</p>
        <p className="text-sm text-foreground">
          Member since{" "}
          <span className="text-pear font-semibold">{user.createdAt}</span>
        </p>
      </div>

      {/* <div className="ml-auto hidden md:flex space-x-2">
        <ActionButton variant="outline" size="md" text="Edit Profile" />
      </div> */}
    </div>
  );
}
