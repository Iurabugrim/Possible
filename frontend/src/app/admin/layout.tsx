"use client"
import { AuthProvider } from "@/providers/AuthProvider";
import React from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}