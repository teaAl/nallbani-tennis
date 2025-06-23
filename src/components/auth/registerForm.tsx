// File: components/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-pear">
      <h2 className="text-2xl font-bold mb-4">Registration Closed</h2>
      <p className="text-lg">
        Registration is only available via an admin. Please contact the club
        administration to create an account.
      </p>
    </div>
  );
}
