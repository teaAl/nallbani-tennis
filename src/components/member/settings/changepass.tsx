// import ActionButton from "@/components/ui/actionbtn";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// const ChangePassword = ({ user }: { user: UserNT }) => {
//   return (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="currentPassword" className="text-foreground/30">
//           Current Password
//         </Label>
//         <Input id="currentPassword" type="password" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="newPassword" className="text-foreground/30">
//           New Password
//         </Label>
//         <Input id="newPassword" type="password" />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword" className="text-foreground/30">
//           Confirm New Password
//         </Label>
//         <Input id="confirmPassword" type="password" />
//       </div>
//       <ActionButton variant="secondary" size="sm" text="Update Password" />
//     </div>
//   );
// };

// export default ChangePassword;

// //TODO: Add validation for password + change password api implementation

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordResetForm() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSuccess(true);
      // Optionally redirect after success
      setTimeout(() => router.push("/profile"), 2000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Password updated successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-pear text-gray-900 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-pear transition-colors"
        >
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

// TODO: logout user after password change and redirect to login page. Notify user that they are going to get logged out.
