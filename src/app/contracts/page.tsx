"use client";

import { Button } from "@/components/ui/button";
import { makeInitMarketInstruction } from "@/lib/contracts/marketplace.contract";
import { transformToVersionedTransaction } from "@/lib/utils";
import {
  SolanaChain,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import { toast } from "sonner";

const ContractsPage = () => {
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();
  const handleInitMarketplace = async () => {
    if (!publicClient) return;
    toast.promise(
      new Promise<{
        tx: string;
      }>(async (resolve, reject) => {
        try {
          const wallet = primaryWallet.getWalletClient<SolanaChain>();
          const { success, transaction } = await makeInitMarketInstruction({
            feeRate: 1000,
            authority: new PublicKey(wallet.publicKey),
          });

          if (success && transaction) {
            const signedTx = await wallet.signTransaction(
              transformToVersionedTransaction(transaction)
            );

            const tx = await publicClient.sendTransaction(signedTx);

            resolve({ tx });
          } else {
            reject(new Error("Failed to initialize marketplace"));
          }
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Init Marketplace...",
        success: "Marketplace initialized",
        error: "Failed to initialize marketplace",
      }
    );
  };
  return (
    <div>
      <Button onClick={handleInitMarketplace}>Init Marketplace</Button>
    </div>
  );
};

export default ContractsPage;
