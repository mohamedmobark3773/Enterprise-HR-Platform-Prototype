export interface Branch {
  id: string;
  name: string;
  code: string;
  city: string;
  manager: string;
  status: "Active" | "Planned" | "Closed";
  sites: number;
}

const branches: Branch[] = [
  { id: "BR-01", name: "Hassi Messaoud", code: "HMD", city: "Ouargla", manager: "Yacine Bouzid", status: "Active", sites: 12 },
  { id: "BR-02", name: "Skikda Terminal", code: "SKD", city: "Skikda", manager: "Sofia Rahmani", status: "Active", sites: 4 },
  { id: "BR-03", name: "Arzew Port", code: "ARZ", city: "Oran", manager: "Karim Hadj", status: "Planned", sites: 2 },
  { id: "BR-04", name: "In Amenas", code: "INA", city: "Illizi", manager: "Omar Benali", status: "Closed", sites: 0 },
];

export async function listBranches(): Promise<Branch[]> {
  await new Promise((r) => setTimeout(r, 200));
  return branches;
}
