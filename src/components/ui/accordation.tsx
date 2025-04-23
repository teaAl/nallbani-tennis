"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const AccordionContext = React.createContext<{
  expanded: string | null;
  setExpanded: (value: string | null) => void;
}>({
  expanded: null,
  setExpanded: () => null,
});

interface AccordionProps {
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}

export function Accordion({
  type = "single",
  defaultValue,
  className,
  children,
}: AccordionProps) {
  const [expanded, setExpanded] = React.useState<string | null>(
    defaultValue || null
  );

  return (
    <AccordionContext.Provider value={{ expanded, setExpanded }}>
      <div className={cn("space-y-1", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function AccordionItem({
  value,
  className,
  children,
}: AccordionItemProps) {
  const { expanded } = React.useContext(AccordionContext);
  const isExpanded = expanded === value;

  return (
    <div
      className={cn(
        "bg-gray-800 text-pear rounded-lg transition-all",
        isExpanded && "bg-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function AccordionTrigger({
  value,
  className,
  children,
}: AccordionTriggerProps) {
  const { expanded, setExpanded } = React.useContext(AccordionContext);
  const isExpanded = expanded === value;

  const handleClick = () => {
    setExpanded(isExpanded ? null : value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between w-full p-4 text-sm font-medium transition-all hover:underline cursor-pointer border-b border-pear/10",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-pear transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function AccordionContent({
  value,
  className,
  children,
}: AccordionContentProps) {
  const { expanded } = React.useContext(AccordionContext);
  const isExpanded = expanded === value;

  return (
    <div
      className={cn(
        "overflow-hidden transition-all",
        isExpanded ? "h-auto pb-4 pt-0" : "h-0",
        className
      )}
    >
      <div className="px-4">{children}</div>
    </div>
  );
}
