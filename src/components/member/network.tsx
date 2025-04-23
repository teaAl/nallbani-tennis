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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Star, Search, UserPlus, Calendar, MessageSquare } from "lucide-react";
import ActionButton from "../ui/actionbtn";

export default function NetworkSection({ users }: { users: UserNT[] }) {
  // This would come from your API in a real implementation
  // const connections = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     level: "Advanced",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     rating: 4.8,
  //     lastPlayed: "2 days ago",
  //     status: "online",
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     level: "Intermediate",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     rating: 4.2,
  //     lastPlayed: "1 week ago",
  //     status: "offline",
  //   },
  //   {
  //     id: 3,
  //     name: "Emma Wilson",
  //     level: "Professional",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     rating: 4.9,
  //     lastPlayed: "3 days ago",
  //     status: "online",
  //   },
  // ]

  if (!users) {
    return (
      <div className="text-center py-10 text-foreground">
        No connections found
      </div>
    );
  }

  console.log("users", users);
  const suggestions = [
    {
      id: 4,
      name: "David Lee",
      level: "Intermediate",
      avatar: "/placeholder.svg?height=50&width=50",
      mutualConnections: 3,
    },
    {
      id: 5,
      name: "Sophia Garcia",
      level: "Advanced",
      avatar: "/placeholder.svg?height=50&width=50",
      mutualConnections: 1,
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredConnections = users.filter((connection) =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search connections..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="inline-flex text-sm text-gray-900 items-center justify-center rounded-md font-medium transition-colors bg-pear hover:bg-pear/90 cursor-pointer px-4 py-2">
          <UserPlus className="h-4 w-4 mr-2" />
          Find Players
        </button>
      </div>

      <Tabs defaultValue="connections">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="connections">My Connections</TabsTrigger>
          <TabsTrigger value="suggestions">Suggested Players</TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="mt-4">
          {filteredConnections?.length === 0 ? (
            <div className="text-center py-10 text-foreground">
              No connections found
            </div>
          ) : (
            <div className="space-y-4">
              {filteredConnections.map((connection) => (
                <Card key={connection.id}>
                  <CardContent className="p-0">
                    <div className="flex items-start p-4">
                      <div className="relative mr-4">
                        <Avatar className="h-12 w-12 border-2 border-pear/30">
                          <AvatarImage
                            src={`/images/avatars/${connection.avatar}.jpg`}
                            alt={connection.name}
                          />
                          <AvatarFallback>
                            {connection.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 right-1 h-3 w-3 rounded-full border-2 border-gray-900 ${
                            connection.status === "ACTIVE"
                              ? "bg-pear"
                              : "bg-foreground"
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {connection.name}
                            </h3>
                            <div className="flex items-center text-sm text-foreground/60">
                              <span className="text-pear/60">
                                {connection.level}
                              </span>
                              <span className="mx-2">•</span>
                              {/* <span>Last played {connection.lastPlayed}</span> */}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              <Star className="h-4 w-4 text-pear mr-1" />
                              {/* <span className="text-sm font-medium text-pear">{connection.rating}</span> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-t-gray-900/50 py-3 flex justify-between">
                      <button className="inline-flex text-sm text-pear/80 hover:text-pear/100 transition-colors font-light items-center justify-center rounded-md  cursor-pointer">
                        <MessageSquare className="h-3 w-4 mr-2" />
                        Message
                      </button>
                      <button className="inline-flex text-sm text-pear px-2 py-1 bg-gray-900 font-light items-center justify-center rounded-md hover:bg-gray-900/80 transition-colors cursor-pointer">
                        <MessageSquare className="h-3 w-4 mr-2" />
                        Invite to Play
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="suggestions" className="mt-4">
          {suggestions.length === 0 ? (
            <div className="text-center py-10 text-foreground">
              No suggestions available
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <Card key={suggestion.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage
                          src={suggestion.avatar}
                          alt={suggestion.name}
                        />
                        <AvatarFallback>
                          {suggestion.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">
                              {suggestion.name}
                            </h3>
                            <div className="text-sm ">
                              <span className="text-pear/60">
                                {suggestion.level}
                              </span>
                            </div>
                            <div className="text-sm text-foreground/60 mt-1">
                              {suggestion.mutualConnections} mutual connection
                              {suggestion.mutualConnections !== 1 ? "s" : ""}
                            </div>
                          </div>
                          <button className="inline-flex text-sm text-pear px-2 py-1 bg-gray-900 font-light items-center justify-center rounded-md hover:bg-gray-900/80 transition-colors cursor-pointer">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Connect
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="text-center pt-2">
                <Button variant="link" className="text-pear cursor-pointer">
                  View More Suggestions
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="text-pear">Upcoming Club Events</CardTitle>
          <CardDescription className="text-foreground/60">
            Connect with other players at these events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-pear/30 text-pear p-2 rounded-md mr-4 text-center min-w-[60px]">
                <div className="text-sm font-semibold">NOV</div>
                <div className="text-xl font-bold">25</div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Club Tournament</h4>
                <p className="text-sm text-foreground/60">
                  Singles and doubles matches for all levels
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant="primary" className="mr-2">
                    Tournament
                  </Badge>
                  <span className="text-sm text-pear/60">
                    12 members attending
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-foreground/30 text-gray-800 p-2 rounded-md mr-4 text-center min-w-[60px]">
                <div className="text-sm font-semibold">DEC</div>
                <div className="text-xl font-bold">10</div>
              </div>
              <div>
                <h4 className="font-medium text-foreground">Tennis Social</h4>
                <p className="text-sm text-foreground/60">
                  Meet and play with other club members
                </p>
                <div className="flex items-center mt-2">
                  <Badge variant="primary" className="mr-2">
                    Social
                  </Badge>
                  <span className="text-sm text-pear/60">
                    8 members attending
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {/* TODO: Make this button fullwidth */}
          <div className="inline-flex items-center justify-center w-full">
            <ActionButton
              variant="secondary"
              size="sm"
              text="View All Events"
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
