import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/memberCard"
import { Button } from "../ui/button"
import { CalendarDays, Award, CheckCircle } from "lucide-react"
import ActionButton from "../ui/actionbtn"

export default function MembershipCard() {
  // This would come from your API in a real implementation
  const membershipData = {
    plan: "Premium Membership",
    validUntil: "December 31, 2023",
    status: "Active",
    benefits: [
      "Unlimited court bookings",
      "10% discount on lessons",
      "Free equipment rental",
      "Access to member tournaments",
    ],
    nextPayment: "December 1, 2023",
    amount: "€120.00",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-br to-pear from-gray-800 text-gray-900 rounded-t-md">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">{membershipData.plan}</CardTitle>
            <Award className="h-8 w-8 text-pear" />
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-pear mr-2"></div>
            <span className="font-medium text-pear">{membershipData.status}</span>
          </div>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col gap-4">

          <h3 className="font-semibold mb-2 text-foreground">Membership Benefits:</h3>
          <ul className="space-y-2">
            {membershipData.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start text-foreground/80 text-sm font-poppins">
                <CheckCircle className="h-4 w-4 text-pear mr-2 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <CalendarDays className="h-5 w-5 text-foreground mr-2" />
            <span className="text-sm text-foreground">Next payment: {membershipData.nextPayment}</span>
          </div>
          <div className="font-semibold text-foreground">{membershipData.amount}</div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton variant="secondary" size="md" text="Upgrade Membership" />
        <ActionButton variant="outline" size="md" text="View Payment History" />
      </div>
    </div>
  )
}
