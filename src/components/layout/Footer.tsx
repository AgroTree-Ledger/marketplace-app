import appConfig from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mx-auto container px-6 py-12 md:flex md:flex-col md:items-center md:justify-between lg:px-8">
      <div className="flex justify-between md:items-end w-full border-b border-b-white border-dashed py-10 flex-wrap flex-col md:flex-row gap-10">
        <div>
          <Image
            src={"/assets/agrotree.white.png"}
            alt={appConfig.appTitle}
            width={188}
            height={56}
            className="w-48 h-14 object-cover aspect-auto"
          />
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="space-y-5">
              <h3>Agrotree</h3>
              <ul className="flex items-center gap-3 text-muted-foreground">
                <Link href="#">
                  <li>Launch app</li>
                </Link>
              </ul>
            </div>
            <div className="space-y-5">
              <h3>Resource</h3>
              <ul className="flex items-center gap-3 text-muted-foreground">
                <Link href="#">
                  <li>Docs</li>
                </Link>
                <Link href="#">
                  <li>Blog</li>
                </Link>
              </ul>
            </div>
            <div className="space-y-5">
              <h3>Company</h3>
              <ul className="flex items-center gap-3 text-muted-foreground">
                <Link href="#">
                  <li>About</li>
                </Link>
                <Link href="#">
                  <li>Term</li>
                </Link>
              </ul>
            </div>
            <div className="space-y-5">
              <h3>Community</h3>
              <ul className="flex items-center gap-3 text-muted-foreground">
                <Link href="#">
                  <li>
                    <Image
                      src={"/socials/logo-x.png"}
                      alt="twitter"
                      width={24}
                      height={24}
                      className="size-6 object-cover aspect-square"
                    />
                  </li>
                </Link>
                <Link href="#">
                  <li>
                    <Image
                      src={"/socials/logo-telegram.png"}
                      alt="telegram"
                      width={24}
                      height={24}
                      className="size-6 object-cover aspect-square"
                    />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-3">
        <p className="text-left text-muted-foreground">
          Copyright by Agrotree © Agrotree 2024
        </p>
      </div>
    </footer>
  );
};

export default Footer;
