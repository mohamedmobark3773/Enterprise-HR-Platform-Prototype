"use client";

import { useRouter } from "next/navigation";
import { EmployeeProfileDrawer } from "@/components/employees/EmployeeProfileDrawer";
import { Employee } from "@/types/employee";

export function EmployeeDetailView({ employee }: { employee: Employee }) {
  const router = useRouter();

  return <EmployeeProfileDrawer employee={employee} close={() => router.back()} />;
}

export default EmployeeDetailView;