"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/config";
import { cn } from "@/lib/cn";
import { NavLink } from "./NavLink";

const iconButton =
  "flex size-12 items-center justify-center text-ink-secondary transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-raspberry-400";

// Focus trap, Escape, scroll kilidi ve aria bağları Radix'ten geliyor; elle yazmak göründüğünden zor.
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger aria-label="Menüyü aç" className={iconButton}>
        <Menu aria-hidden="true" strokeWidth={1.5} className="size-9" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-page-deep/60" />
        <Dialog.Content className="fixed inset-y-0 left-0 flex w-72 max-w-full flex-col bg-surface px-6 py-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-h3 text-ink">Menü</Dialog.Title>
            <Dialog.Close
              aria-label="Menüyü kapat"
              className={cn(iconButton, "-mr-1.5")}
            >
              <X aria-hidden="true" strokeWidth={1.5} className="size-9" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Sayfalar arasında gezinmek için bir bağlantı seç.
          </Dialog.Description>

          <nav aria-label="Sayfalar" className="mt-8">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    label={link.label}
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
