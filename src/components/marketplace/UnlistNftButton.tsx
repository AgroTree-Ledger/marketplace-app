"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { CompressedListingType } from "@/types/Contract.type";
import {
  useWallets,
  usePublicClient,
  SolanaChain,
} from "@particle-network/connectkit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn, transformToVersionedTransaction } from "@/lib/utils";
import { CircleArrowDown, Loader2 } from "lucide-react";
import NftImage from "../trees/NftImage";
import { TreeNftType } from "@/types/TreeNft.type";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  syncAfterUnlistTreeNftAction,
  unlistTreeNftAction,
} from "@/_actions/marketplace.actions";

type Props = {
  item: TreeNftType;
  marketItem: CompressedListingType;
  full?: boolean;
};

const UnlistNftButton: React.FC<Props> = ({ item, marketItem, full }) => {
  const [open, setOpen] = useState(false);
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["unlist-tree-nft", item.address],
    mutationFn: async () => {
      if (!publicClient)
        return {
          error: "Please connect your wallet",
          tx: null,
        };
      const {
        transaction,
        success,
        data: { merkleTree },
      } = await unlistTreeNftAction(item.address);
      if (!success || !transaction) {
        return {
          error: "[S]-Failed to unlist NFT",
          tx: null,
          merkleTree: null,
        };
      }
      const wallet = primaryWallet.getWalletClient<SolanaChain>();
      const signedTx = await wallet.signTransaction(
        transformToVersionedTransaction(transaction)
      );
      console.log("Signed tx", signedTx);
      const tx = await publicClient.sendTransaction(signedTx);
      if (tx && merkleTree) {
        await syncAfterUnlistTreeNftAction(
          merkleTree,
          item.address,
          BigInt(marketItem.account.price),
          tx
        );
      }
      return { tx, error: null, merkleTree };
    },
  });

  const handleUnlist = useCallback(async () => {
    if (!publicClient) return;
    toast.promise(
      new Promise<{
        tx: string;
      }>(async (resolve, reject) => {
        try {
          const { tx, error } = await mutateAsync();

          if (error || !tx) {
            reject("Failed to unlist NFT");
            return;
          }
          resolve({ tx });
        } catch (error) {
          console.error("Error unlist NFT", error);
          reject(error);
        }
      }),
      {
        loading: "Unlisting NFT ...",
        success: ({ tx }) => {
          setOpen(false);
          return `NFT unlisted successfully. Tx: ${tx}`;
        },
        error: "Failed to unlist NFT",
      }
    );
  }, [mutateAsync, publicClient]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(full && "w-full")} variant={"secondary"}>
          <CircleArrowDown className="size-4 mr-2" />
          Unlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Unlist: {item.metadata.name} - {item.address.slice(0, 6)}...
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to unlist this item from the marketplace?
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-5">
          {item.file?.uri ? <NftImage src={item.file.uri} /> : null}
          <div className="space-y-8 flex flex-col justify-between">
            <div></div>

            <div className="flex gap-5">
              <Button
                variant={"secondary"}
                disabled={isPending}
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={isPending}
                className="w-full"
                onClick={handleUnlist}
              >
                {isPending ? (
                  <Loader2 className="size-4 mr-2 animate-spin" />
                ) : null}
                OK
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlistNftButton;
