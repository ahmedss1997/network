"use client";
import React from "react";
import { useThemeStore } from "@/store";
import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { redirect } from "next/navigation";
import {usePathname} from "next/navigation";

const DirectionProvider = ({ children, lang }: { children: React.ReactNode; lang: string }) => {
  const { isRtl } = useThemeStore();

  const direction = lang === "ar" || isRtl ? "rtl" : "ltr";  
  const pathName = usePathname();
  if (pathName === "/" + lang) {
    redirect("/dashboard");
  }

  return (
    <div dir={direction}>
      <RadixDirectionProvider dir={direction}>
        {children}
      </RadixDirectionProvider>
    </div>
  );
};

export default DirectionProvider;
