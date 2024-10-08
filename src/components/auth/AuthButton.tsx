"use client";
import { useAccount, useModal } from "@particle-network/connectkit";
import React from "react";
import { Button } from "../ui/button";
import { Loader2, UserCircle, Wallet } from "lucide-react";
import { useAuthProvider } from "../providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

type Props = {
  label?: string;
};
const AuthButton: React.FC<Props> = ({ label }) => {
  const { isConnected, address, isConnecting } = useAccount();
  const { setOpen } = useModal({
    onDisconnect() {
      console.log("Disconnected");
    },
    onConnect({ address, connectorId }) {
      console.log("Connected", address, connectorId);
    },
  });
  const { loading, session, logout } = useAuthProvider();

  if (isConnected && session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button disabled={isConnecting}>
            <UserCircle className="mr-2 size-4" />
            {address?.slice(0, 6)} ...
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            My Wallet
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${address}`}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <Button onClick={() => setOpen(true)} disabled={isConnecting || loading}>
      {isConnecting || loading ? (
        <Loader2 className="size-5 mr-2 animate-spin" />
      ) : (
        <Wallet className="mr-2 size-4" />
      )}
      {label ?? "Login"}
    </Button>
  );
};

export default AuthButton;
