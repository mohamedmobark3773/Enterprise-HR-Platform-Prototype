import { notFound } from "next/navigation";
import { EmployeeDetailView } from "@/components/employees/EmployeeDetailView";
import { employeeService } from "@/lib/services/employeeService";

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = await employeeService.getEmployeeById(id);

  if (!employee) notFound();

  return <EmployeeDetailView employee={employee} />;
}
