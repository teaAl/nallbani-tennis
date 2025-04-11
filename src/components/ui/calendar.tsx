"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/cn"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  mode?: "single" | "range" | "multiple"
  selected?: Date | Date[] | { from: Date; to: Date }
  onSelect?: (date: Date) => void
  initialFocus?: boolean
}

export function Calendar({
  className,
  mode = "single",
  selected,
  onSelect,
  initialFocus = false,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [focusedDate, setFocusedDate] = useState<Date | null>(initialFocus ? new Date() : null)

  const isSelected = (date: Date) => {
    if (!selected) return false
    if (selected instanceof Date) {
      return date.toDateString() === selected.toDateString()
    }
    if (Array.isArray(selected)) {
      return selected.some((d) => date.toDateString() === d.toDateString())
    }
    if ("from" in selected && "to" in selected) {
      const from = selected.from
      const to = selected.to
      return date >= from && date <= to
    }
    return false
  }

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const handleDateClick = (date: Date) => {
    onSelect?.(date)
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 h-7 w-7 bg-transparent p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </button>
        <div className="text-sm font-medium">
          {monthNames[month]} {year}
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 h-7 w-7 bg-transparent p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days.map((day, index) => {
          if (!day) {
            return <div key={`empty-${index}`} className="h-9" />
          }
          const isToday = day.toDateString() === new Date().toDateString()
          const isSelectedDay = isSelected(day)
          const isFocused = focusedDate?.toDateString() === day.toDateString()

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                isSelectedDay && "bg-lime-500 text-white hover:bg-lime-600",
                !isSelectedDay && isToday && "border border-lime-500",
                !isSelectedDay && !isToday && "hover:bg-gray-100",
                isFocused && !isSelectedDay && "ring-2 ring-lime-500 ring-offset-2",
              )}
              onClick={() => handleDateClick(day)}
              onFocus={() => setFocusedDate(day)}
              onBlur={() => setFocusedDate(null)}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
