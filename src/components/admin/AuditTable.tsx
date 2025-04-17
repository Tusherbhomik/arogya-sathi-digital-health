
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuditRecord } from "@/types/medical";
import { Flag, Search, AlertTriangle, FileText } from "lucide-react";

interface AuditTableProps {
  records: AuditRecord[];
}

export function AuditTable({ records }: AuditTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<AuditRecord | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Filter records based on search term
  const filteredRecords = records.filter((record) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.type.toLowerCase().includes(searchLower) ||
      record.actorRole.toLowerCase().includes(searchLower) ||
      record.action.toLowerCase().includes(searchLower) ||
      record.entityId.toLowerCase().includes(searchLower)
    );
  });

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  // Handle row click to show details
  const handleRowClick = (record: AuditRecord) => {
    setSelectedRecord(record);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Audit Records</h2>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search records..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow 
                  key={record.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(record)}
                >
                  <TableCell className="font-medium">
                    {formatTimestamp(record.timestamp)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{record.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{record.action}</TableCell>
                  <TableCell>
                    <span className="rounded-full bg-secondary px-2 py-1 text-xs capitalize">
                      {record.actorRole}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {record.flagged ? (
                      <span className="inline-flex items-center text-healthcare-red gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Flagged</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Normal</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Details Dialog */}
      {selectedRecord && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Audit Record Details</DialogTitle>
              <DialogDescription>
                {formatTimestamp(selectedRecord.timestamp)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Record ID</p>
                  <p className="font-mono text-sm">{selectedRecord.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="capitalize">{selectedRecord.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entity ID</p>
                  <p className="font-mono text-sm">{selectedRecord.entityId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Actor</p>
                  <p>{selectedRecord.actorId} ({selectedRecord.actorRole})</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Action</p>
                <p className="bg-muted p-2 rounded-md">{selectedRecord.action}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Details</p>
                <pre className="bg-muted p-2 rounded-md text-xs overflow-auto max-h-48">
                  {JSON.stringify(selectedRecord.details, null, 2)}
                </pre>
              </div>

              {selectedRecord.flagged && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-md flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-healthcare-red flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-healthcare-red mb-1">
                      This record has been flagged
                    </p>
                    <p className="text-sm">
                      Reason: {selectedRecord.reason || "Suspicious activity detected"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              {!selectedRecord.flagged && (
                <Button variant="destructive" className="flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  Flag Record
                </Button>
              )}
              <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
