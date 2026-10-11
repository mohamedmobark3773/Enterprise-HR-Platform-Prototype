export interface DocumentRecord {
  id: string;
  employee: string;
  type: string;
  issue: string;
  expiry: string;
  status: string;
  version: number;
  file: string;
  size: number;
  uploadedBy: string;
  archived: boolean;
}

export const initialDocuments: DocumentRecord[] = [
  { id: "DOC-1042-ID", employee: "Jordan Lee", type: "National ID", issue: "2021-06-12", expiry: "2028-06-12", status: "Valid", version: 2, file: "jordan-id.pdf", size: 1.4, uploadedBy: "Maya Chen", archived: false },
  { id: "DOC-1007-CON", employee: "Omar Benali", type: "Contract", issue: "2023-04-01", expiry: "2025-04-01", status: "Expiring Soon", version: 3, file: "omar-contract-v3.pdf", size: 2.1, uploadedBy: "Sarah Kim", archived: false },
  { id: "DOC-1016-WP", employee: "Sophie Laurent", type: "Work Permit", issue: "2022-09-19", expiry: "2025-03-19", status: "Expired", version: 1, file: "sophie-permit.pdf", size: 0.8, uploadedBy: "Maya Chen", archived: false },
];
