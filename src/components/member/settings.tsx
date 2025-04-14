"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/memberCard";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User, Mail, Phone, Lock, Shield } from "lucide-react";
import ActionButton from "../ui/actionbtn";

export default function ProfileSettings() {
  // This would come from your API in a real implementation
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tennis Court Lane, Sports City",
    bio: "Tennis enthusiast for over 10 years. Love to play doubles and improve my backhand.",
    playingLevel: "Intermediate",
    preferredPlayTime: "Evenings and weekends",
    notifications: {
      email: true,
      sms: false,
      app: true,
    },
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked,
      },
    }));
  };

  return (
    <Tabs defaultValue="personal">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="personal">Personal Info</TabsTrigger>
        <TabsTrigger value="preferences">Preferences</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="mt-4">
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/60">
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center space-y-2 mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=100&width=100" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <button className="rounded-lg text-sm px-3 text-pear/70 hover:text-pear/100 transition-colors cursor-pointer">
                {" "}
                Change photo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/30">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/30">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground/30">
                  Phone
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-foreground/30">
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-foreground/30">
                Bio
              </Label>
              <Textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <ActionButton variant="primary" size="md" text="Cancel" />
            <ActionButton variant="secondary" size="md" text="Save Changes" />
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="preferences" className="mt-4">
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/60">
              Customize your tennis experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playingLevel" className="text-foreground/30">
                Playing Level
              </Label>
              <select
                id="playingLevel"
                name="playingLevel"
                value={userData.playingLevel}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md text-foreground border-foreground/30 focus:outline-none focus:border-pear/40"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredPlayTime" className="text-foreground/30">
                Preferred Play Time
              </Label>
              <Input
                id="preferredPlayTime"
                name="preferredPlayTime"
                value={userData.preferredPlayTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-pear">
                Notification Preferences
              </h3>

              <div className="flex items-center justify-between border-t border-t-foreground/5 pt-2">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="emailNotifications"
                    className="text-foreground"
                  >
                    Email Notifications
                  </Label>
                  <p className="text-sm text-foreground/40">
                    Receive booking confirmations and updates
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={userData.notifications.email}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("email", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications" className="text-foreground">
                    SMS Notifications
                  </Label>
                  <p className="text-sm text-foreground/40">
                    Receive text messages for important alerts
                  </p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={userData.notifications.sms}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("sms", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appNotifications" className="text-foreground">
                    App Notifications
                  </Label>
                  <p className="text-sm text-foreground/40">
                    Receive in-app notifications
                  </p>
                </div>
                <Switch
                  id="appNotifications"
                  checked={userData.notifications.app}
                  onCheckedChange={(checked) =>
                    handleNotificationChange("app", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <ActionButton variant="primary" size="md" text="Cancel" />
            <ActionButton variant="secondary" size="md" text="Save Changes" />
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="mt-4">
        <Card>
          <CardHeader>
            <CardDescription className="text-foreground/60">
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium flex items-center text-pear">
                <Lock className="h-4 w-4 mr-2" />
                Password
              </h3>

              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-foreground/30">
                  Current Password
                </Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-foreground/30">
                  New Password
                </Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground/30">
                  Confirm New Password
                </Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <ActionButton
                variant="secondary"
                size="sm"
                text="Update Password"
              />
            </div>

            <div className="border-t border-t-gray-900/50 pt-6">
              <h3 className="text-sm font-medium flex items-center text-pear">
                <Shield className="h-4 w-4 mr-2" />
                Account Security
              </h3>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor" className="text-foreground">
                      Two-factor Authentication
                    </Label>
                    <p className="text-sm text-foreground/30">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <ActionButton variant="ghost" size="sm" text="Setup" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-foreground">Connected Devices</Label>
                    <p className="text-sm text-foreground/30">
                      Manage devices that are logged into your account
                    </p>
                  </div>
                  <ActionButton variant="ghost" size="sm" text="Manage" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
