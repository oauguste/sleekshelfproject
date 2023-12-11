import { FC } from "react";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface PageProps {
  id: string;
}

const Page: FC<PageProps> = ({ id }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl md:text-4xl">
        Your Profile
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/* Your profile */}
      </div>
      <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
        {/*  */}
        <div className="bg-emerald-100 px-6 py-4 ">
          <p className="font-semibold py-3 flex items-center gap-1.5">
            Home
          </p>
        </div>
        <div className="-my-3 divide-y divide-gray-100  px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <p className="">Your personal bookshelf</p>
          </div>
          <Link
            className={buttonVariants({
              className: "w-full mt-4 mb-6",
            })}
            href={`/${id}/l/create`}
          >
            Create List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
