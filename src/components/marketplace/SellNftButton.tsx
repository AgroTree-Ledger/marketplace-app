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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import NftImage from "../trees/NftImage";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CircleFadingArrowUp, Loader2 } from "lucide-react";

import {
  SolanaChain,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import {
  cn,
  getAttributeValue,
  transformToVersionedTransaction,
} from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  sellTreeNftAction,
  syncAfterSellTreeNftAction,
} from "@/_actions/marketplace.actions";

const formSchema = z.object({
  assetId: z.string(),
  price: z.coerce.number(),
});

type FromSchemaType = z.infer<typeof formSchema>;

type Props = {
  item: TreeNftType;
  full?: boolean;
};

const SellNftButton: React.FC<Props> = ({ item, full }) => {
  const [open, setOpen] = useState(false);
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();
  const form = useForm<FromSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assetId: item.address,
      price: 0.05,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["listing-tree-nft", item.address],
    mutationFn: async ({
      assetId,
      price,
    }: {
      assetId: string;
      price: number;
    }) => {
      if (!publicClient)
        return {
          error: "Please connect your wallet",
          tx: null,
          merkleTree: null,
          price: null,
        };
      const _price = price * LAMPORTS_PER_SOL;
      const {
        transaction,
        success,
        data: { merkleTree },
      } = await sellTreeNftAction(assetId, _price);
      if (!success || !transaction) {
        return {
          error: "[S]-Failed to list NFT for sale",
          tx: null,
        };
      }
      const wallet = primaryWallet.getWalletClient<SolanaChain>();
      const signedTx = await wallet.signTransaction(
        transformToVersionedTransaction(transaction)
      );

      const tx = await publicClient.sendTransaction(signedTx);

      if (tx && merkleTree) {
        await syncAfterSellTreeNftAction(merkleTree, item.address, _price, tx);
      }

      return { tx, error: null, merkleTree, price: _price };
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
            reject("Failed to sell NFT");
            return;
          }
          resolve({ tx });
        } catch (error) {
          console.error("Failed to sell NFT", error);
          reject(error);
        }
      }),
      {
        loading: "Selling NFT",
        success: ({ tx }) => {
          setOpen(false);
          return `NFT listed for sale successfully tx: ${tx}`;
        },
        error: "Failed to sell NFT",
      }
    );
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(full && "w-full")}>
          <CircleFadingArrowUp className="size-4 mr-2" />
          Sell
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-full"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            SELL: {item.metadata.name} - {item.address.slice(0, 6)}...
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to sell this NFT? .This action will put your
            NFT on sale. Please enter the price you want to sell.
          </DialogDescription>
          <div className="grid md:grid-cols-2 gap-5">
            {item.file?.uri ? <NftImage src={item.file.uri} /> : null}
            <div className="space-y-8 flex flex-col justify-between">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Enter the price you want to sell this NFT
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Price for sale"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Current estimated value:{" "}
                          <span className="font-semibold text-green-500">
                            {" "}
                            {getAttributeValue(item, "current_estimated_value")}
                          </span>{" "}
                          USD
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-between gap-3">
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
                      type="submit"
                      disabled={isPending}
                      className="w-full"
                    >
                      {isPending ? (
                        <Loader2 className="size-4 mr-2 animate-spin" />
                      ) : null}
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SellNftButton;
