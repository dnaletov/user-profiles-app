import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const hasToken = !!(await cookies()).get("token");

  return (
    <header className="bg-white shadow-sm sticky">
      <nav className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          href="/profiles"
          className="text-2xl font-semibold tracking-tight"
        >
          Profile Manager
        </Link>

        {hasToken && <LogoutButton />}
      </nav>
    </header>
  );
}
