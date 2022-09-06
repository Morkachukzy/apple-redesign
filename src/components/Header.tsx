import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import {
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { selectCartCount } from "../app/cartSlice";
import { signIn, signOut, useSession } from "next-auth/react";

type HeaderProps = {};
const Header = forwardRef<HTMLHeadElement>((props, ref) => {
  const cartCount = useSelector(selectCartCount);
  const { data: session } = useSession();
  return (
    <header
      ref={ref}
      className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7ECEE] p-4"
    >
      <div className="flex items-center justify-center md:flex md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-5 cursor-pointer opacity-75 transition hover:opacity-100">
            <Image
              src="https://rb.gy/vsvv2o"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a className="headerLink">Products</a>
        <a className="headerLink">Explore</a>
        <a className="headerLink">Support</a>
        <a className="headerLink">Business</a>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <SearchIcon className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            {cartCount > 0 && (
              <span className="bg-gradient-primary absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                {cartCount}
              </span>
            )}
            <ShoppingBagIcon className="headerIcon" />
          </div>
        </Link>
        {session ? (
          <Image
            src={
              session.user?.image ||
              "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
            }
            alt=""
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <UserIcon className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  );
});

export default Header;
