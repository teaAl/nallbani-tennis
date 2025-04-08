"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/memberCard"
import { Progress } from "../ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Award, TrendingUp, Target, Calendar } from "lucide-react"

export default function ProgressTracker() {
  // This would come from your API in a real implementation
  const progressData = {
    skillLevel: "Intermediate",
    overallProgress: 68,
    // overallProgress: 12,
    skills: [
      { name: "Forehand", level: 75 },
      { name: "Backhand", level: 60 },
      { name: "Serve", level: 55 },
      { name: "Volley", level: 45 },
      { name: "Footwork", level: 70 },
    ],
    recentLessons: [
      { date: "November 10, 2023", focus: "Serve technique", notes: "Improved toss consistency" },
      { date: "November 3, 2023", focus: "Backhand drills", notes: "Working on follow-through" },
      { date: "October 27, 2023", focus: "Match strategy", notes: "Discussed court positioning" },
    ],
    upcomingGoals: ["Improve serve accuracy by 15%", "Master topspin backhand", "Develop better net game"],
    achievements: [
      { name: "First Tournament", date: "September 2023", description: "Participated in club tournament" },
      { name: "Consistent Player", date: "August 2023", description: "Attended 10 consecutive lessons" },
    ],
  }

  const getColorForLevel = (level: number) => {
    if (level < 40) return "bg-[#B3404A]"
    if (level < 70) return "bg-[#FFC61B]"
    return "bg-[#16A34A]"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TODO: fix progress bar or use an outside library */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground ">
              <Target className="h-5 w-5 mr-2 text-pear" />
              Skill Level
            </CardTitle>
            <CardDescription>Your current tennis proficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-pear">{progressData.skillLevel}</span>
            </div>
            <div className="space-y-4 text-foreground">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{progressData.overallProgress}%</span>
                </div>
                <Progress value={progressData.overallProgress} className={`h-2 ${getColorForLevel(progressData.overallProgress)}`}/>
              </div>

              {progressData.skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className={`h-2 ${getColorForLevel(skill.level)}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* TODO: make Achivments section scrollable */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Award className="h-5 w-5 mr-2 text-pear" />
              Achievements
            </CardTitle>
            <CardDescription>Your tennis milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.achievements.map((achievement, index) => (
                <div key={index} className="border-l-2 border-pear pl-4 py-1">
                  <h4 className="font-semibold text-pear">{achievement.name}</h4>
                  <p className="text-sm text-foreground/30">{achievement.date}</p>
                  <p className="text-sm mt-1 text-foreground/80">{achievement.description}</p>
                </div>
              ))}

              <div className="border-l-2 border-gray-300 pl-4 py-1 opacity-50">
                <h4 className="font-semibold text-pear">Next Achievement</h4>
                <p className="text-sm text-foreground/30">In progress...</p>
                <p className="text-sm mt-1 text-foreground/80">Complete 5 more lessons to unlock</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="lessons">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="lessons">Recent Lessons</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* TODO: Think of a better UI of lessons and goals so that you dont use tabs inside tabs */}

        <TabsContent value="lessons" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {progressData.recentLessons.map((lesson, index) => (
                  <div key={index} className="flex items-start pb-4 border-b border-b-foreground/20 last:border-0">
                    <Calendar className="h-5 w-5 mr-3 text-pear mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{lesson.date}</div>
                      <div className="text-sm text-foreground/50">Focus: <span className="text-pear/70">{lesson.focus}</span></div>
                      <div className="text-sm text-foreground/80 mt-1">{lesson.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {progressData.upcomingGoals.map((goal, index) => (
                  <div key={index} className="flex items-start">
                    <TrendingUp className="h-5 w-5 mr-3 text-pear mt-0.5" />
                    <div className="font-medium text-foreground">{goal}</div>
                  </div>
                ))}

                <div className="pt-4 border-t border-t-foreground/20">
                  <button className="text-pear font-medium flex items-center">
                    <span className="mr-1">+</span> Add new goal
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
