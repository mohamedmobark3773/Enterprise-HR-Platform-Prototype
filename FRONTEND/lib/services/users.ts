export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Suspended";
  lastSeen: string;
}

const users: PlatformUser[] = [
  { id: "U-1001", name: "Amira Khalid", email: "amira.khalid@nexus.energy", role: "Admin", status: "Active", lastSeen: "2 min ago" },
  { id: "U-1002", name: "Yacine Bouzid", email: "y.bouzid@nexus.energy", role: "Ops Manager", status: "Active", lastSeen: "12 min ago" },
  { id: "U-1003", name: "Karim Hadj", email: "k.hadj@nexus.energy", role: "Finance", status: "Invited", lastSeen: "—" },
  { id: "U-1004", name: "Sofia Rahmani", email: "s.rahmani@nexus.energy", role: "HR", status: "Active", lastSeen: "1 h ago" },
  { id: "U-1005", name: "Omar Benali", email: "o.benali@nexus.energy", role: "Operations", status: "Suspended", lastSeen: "3 d ago" },
];

export async function listUsers(): Promise<PlatformUser[]> {
  await new Promise((r) => setTimeout(r, 200));
  return users;
}
