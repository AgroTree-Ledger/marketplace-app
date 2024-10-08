"use client";
import { getTreeNftTransactions } from "@/_actions/nfts.actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TreeNftType } from "@/types/TreeNft.type";
import React from "react";
import dayjs from "dayjs";
import {
  displayPrice,
  getExplorerLink,
  getExplorerTxLink,
  truncateAddress,
} from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  nft: TreeNftType;
};
const TreeHistoryTransactionsTabContent: React.FC<Props> = ({ nft }) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["market-transaction", nft.address],
    queryFn: () => getTreeNftTransactions(nft.address),
  });

  return (
    <div className="bg-foreground/5 p-5 rounded-3xl">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="py-5 text-center">Type</TableHead>
            <TableHead className="py-5 text-center">Price</TableHead>
            <TableHead className="py-5 text-center">User</TableHead>
            <TableHead className="py-5 text-center">Tx</TableHead>
            <TableHead className="py-5 text-center">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading &&
            Array.from({ length: 3 }, (_, ri) => (
              <TableRow key={`r-${ri}`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <TableCell key={i} className="py-5 text-center">
                    <Skeleton className="w-full h-4 bg-primary/40" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {transactions?.map((item) => (
            <TableRow key={item.id} className="text-muted-foreground text-sm">
              <TableCell className="py-5 text-center">{item.type}</TableCell>
              <TableCell className="py-5 text-center">
                {displayPrice(item.price)} SOL
              </TableCell>
              <TableCell className="py-5 text-center">
                <a
                  href={getExplorerLink(item.userId)}
                  className="text-green-500 cursor-pointer"
                  target="_blank"
                >
                  {truncateAddress(item.userId)}
                </a>
              </TableCell>
              <TableCell className="py-5 text-center">
                {item.tx ? (
                  <a
                    href={getExplorerTxLink(item.tx)}
                    className="text-green-500 cursor-pointer"
                    target="_blank"
                  >
                    {truncateAddress(item.tx)}
                  </a>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="py-5 text-center">
                {dayjs(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TreeHistoryTransactionsTabContent;
