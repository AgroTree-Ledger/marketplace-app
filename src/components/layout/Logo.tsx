import Image from "next/image";
import Link from "next/link";
import React from "react";
type Props = {
  isMobile?: boolean;
};
const Logo: React.FC<Props> = ({ isMobile }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {!isMobile ? (
        <Image
          alt="logo"
          src={"/assets/agrotree.white.png"}
          width={134}
          height={40}
          className="object-cover"
        />
      ) : (
        <Image
          alt="logo"
          src={"/assets/agrotree.white.png"}
          width={90}
          height={36}
          className="object-cover"
        />
      )}
      {/* <p className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        Budget Tracker
      </p> */}
    </Link>
  );
};

export default Logo;
