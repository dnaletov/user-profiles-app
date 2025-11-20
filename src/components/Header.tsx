"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "./ui";

export default function Header() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/profiles"
          className="text-2xl font-semibold tracking-tight"
        >
          Profile Manager
        </Link>

        <div className="flex items-center gap-4">
          <Button 
            variant="secondary" 
            onClick={toggleLanguage}
            className="w-12 font-bold"
          >
            {language.toUpperCase()}
          </Button>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
