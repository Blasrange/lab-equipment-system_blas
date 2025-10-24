import AppLogoIcon from "@/components/app-logo-icon";
import { home } from "@/routes";
import { Link } from "@inertiajs/react";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8 rounded-xl border border-blue-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Link
              href={home()}
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="mb-1 flex items-center justify-center">
                <AppLogoIcon className="fill-current text-white w-16" />
              </div>
              <span className="sr-only">{title}</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold text-blue-800">{title}</h1>
              <p className="text-center text-sm text-blue-600">{description}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
