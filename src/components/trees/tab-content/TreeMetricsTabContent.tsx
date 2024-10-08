import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttributeValue } from "@/lib/utils";
import { TreeNftType } from "@/types/TreeNft.type";
import React from "react";
type Props = {
  nft: TreeNftType;
};
const TreeMetricsTabContent: React.FC<Props> = ({ nft }) => {
  const rows: {
    canopy: string;
    currentDbh: string;
    standardGrDbh: string;
    observedGrDbh: string;
    date: string;
  }[] = [
    {
      canopy: getAttributeValue(nft, "canopy_cover_percentage"),
      currentDbh: getAttributeValue(nft, "current_dbh"),
      standardGrDbh: getAttributeValue(nft, "standard_growth_rate_height"),
      observedGrDbh: getAttributeValue(nft, "observed_growth_rate_height"),
      date: getAttributeValue(nft, "update_date"),
    },
  ];
  return (
    <div className="bg-foreground/5 p-5 rounded-3xl">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="py-5 text-center">Canopy %</TableHead>
            <TableHead className="py-5 text-center">Current DBH</TableHead>
            <TableHead className="py-5 text-center">Standard GR DBH</TableHead>
            <TableHead className="py-5 text-center">Observed GR DBH</TableHead>
            <TableHead className="py-5 text-center">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell className="py-5 text-center">{item.canopy}</TableCell>
              <TableCell className="py-5 text-center">
                {item.currentDbh}
              </TableCell>
              <TableCell className="py-5 text-center">
                {item.standardGrDbh}
              </TableCell>
              <TableCell className="py-5 text-center">
                {item.observedGrDbh}
              </TableCell>
              <TableCell className="py-5 text-center">{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreeMetricsTabContent;
