"use client";

import { useEffect } from "react";
import { useVerifyProfileQuery } from "@/infrastructure/auth/auth.api";
import ProjectsSection from "./sections/ProjectsSection";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const { data: verify, isLoading, error } = useVerifyProfileQuery(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (error || verify?.authenticated === false)) {
      router.replace("/auth");
    }
  }, [isLoading, verify, error, router]);

  if (isLoading) return null; // o loader

  return <ProjectsSection />;
};

export default DashboardPage;
