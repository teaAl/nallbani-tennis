"use client"

import type React from "react"
import { createContext, useContext, useId } from "react"
import { cn } from "@/lib/cn"
import { Label } from "./label"

interface FormFieldContextValue {
  name: string
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined)

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export function Form({ className, ...props }: FormProps) {
  return <form className={cn("space-y-6", className)} {...props} />
}

interface FormFieldProps {
  name: string
  children: React.ReactNode
}

export function FormField({ name, children }: FormFieldProps) {
  return <FormFieldContext.Provider value={{ name }}>{children}</FormFieldContext.Provider>
}

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn("space-y-2", className)} {...props} />
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function FormLabel({ className, ...props }: FormLabelProps) {
  const fieldContext = useContext(FormFieldContext)
  const id = useId()

  return (
    <Label className={cn("text-sm font-medium", className)} htmlFor={fieldContext?.name || id} {...props}>
      {props.children}
    </Label>
  )
}

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormControl({ ...props }: FormControlProps) {
  const fieldContext = useContext(FormFieldContext)
  const id = useId()

  return <div id={fieldContext?.name || id} {...props} />
}

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />
}

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  return (
    <p className={cn("text-sm font-medium text-red-500", className)} {...props}>
      {children}
    </p>
  )
}
