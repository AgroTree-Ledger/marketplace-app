"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TreeNftType } from "@/types/TreeNft.type";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CircleFadingArrowUp, Loader2 } from "lucide-react";
import {
  SolanaChain,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { cn, displayPrice, transformToVersionedTransaction } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import NftImage from "../trees/NftImage";
import { CompressedListingType } from "@/types/Contract.type";
import {
  buyTreeNftAction,
  syncAfterBuyTreeNftAction,
} from "@/_actions/marketplace.actions";

const formSchema = z.object({
  assetId: z.string(),
});

type FromSchemaType = z.infer<typeof formSchema>;

type Props = {
  item: TreeNftType;
  marketItem: CompressedListingType;
  full?: boolean;
};

const BuyNftButton: React.FC<Props> = ({ item, marketItem, full }) => {
  const [open, setOpen] = useState(false);
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();
  const form = useForm<FromSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: marketItem.account.assetId.toString(),
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["buy-tree-nft", item.address],
    mutationFn: async ({ assetId }: { assetId: string }) => {
      if (!publicClient)
        return {
          error: "Please connect your wallet",
          tx: null,
        };
      const {
        transaction,
        success,
        data: { merkleTree },
      } = await buyTreeNftAction(assetId, marketItem.account.seller);
      if (!success || !transaction) {
        return {
          error: "[S]-Failed to buy NFT for sale",
          tx: null,
        };
      }
      const wallet = primaryWallet.getWalletClient<SolanaChain>();
      const signedTx = await wallet.signTransaction(
        transformToVersionedTransaction(transaction)
      );
      console.log("Signed tx", signedTx);
      const tx = await publicClient.sendTransaction(signedTx);
      if (tx && merkleTree) {
        await syncAfterBuyTreeNftAction(
          merkleTree,
          item.address,
          BigInt(marketItem.account.price),
          tx
        );
      }
      return { tx, error: null };
    },
  });

  async function onSubmit(values: FromSchemaType) {
    if (!publicClient) return;
    toast.promise(
      new Promise<{
        tx: string;
      }>(async (resolve, reject) => {
        try {
          const { tx, error } = await mutateAsync(values);

          if (error || !tx) {
            reject("Failed to buying NFT");
            return;
          }
          resolve({ tx });
        } catch (error) {
          console.error("Error buying NFT", error);
          reject(error);
        }
      }),
      {
        loading: "Buying NFT",
        success: ({ tx }) => {
          setOpen(false);
          return `NFT bought successfully. Tx: ${tx}`;
        },
        error: "Failed to buy NFT",
      }
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(full && "w-full")}>
          <CircleFadingArrowUp className="size-4 mr-2" />
          Buy
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            BUY: {item.metadata.name} - {item.address.slice(0, 6)}...
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to buy this NFT?
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-5">
          {item.file?.uri ? <NftImage src={item.file.uri} /> : null}
          <div className="space-y-8 flex flex-col justify-between">
            <div>
              Price to buy: {displayPrice(marketItem.account.price)} SOL
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Button type="submit" disabled={isPending} className="w-full">
                    {isPending ? (
                      <Loader2 className="size-4 mr-2 animate-spin" />
                    ) : null}
                    Buy
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyNftButton;
