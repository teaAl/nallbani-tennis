"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type AdminView =
  | "dashboard"
  | "groups"
  | "group-new"
  | "group-details"
  | "lessons"
  | "lesson-new"
  | "members"
  | "member-details"
  | "member-new"
  | "court-availability"

interface ViewContextState {
  currentView: AdminView
  viewParams: Record<string, string>
  setView: (view: AdminView, params?: Record<string, string>) => void
}

const AdminViewContext = createContext<ViewContextState | undefined>(undefined)

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<AdminView>("dashboard")
  const [viewParams, setViewParams] = useState<Record<string, string>>({})

  const setView = (view: AdminView, params: Record<string, string> = {}) => {
    setCurrentView(view)
    setViewParams(params)
  }

  return <AdminViewContext.Provider value={{ currentView, viewParams, setView }}>{children}</AdminViewContext.Provider>
}

export function useAdminView() {
  const context = useContext(AdminViewContext)
  if (context === undefined) {
    throw new Error("useAdminView must be used within an AdminViewProvider")
  }
  return context
}
