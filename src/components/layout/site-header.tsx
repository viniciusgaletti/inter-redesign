"use client";

import { useEffect, useState } from "react";
import { Dialog, NavigationMenu } from "radix-ui";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { menus } from "@/content/nav";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Wordmark } from "@/components/layout/wordmark";

const triggerClass =
  "group inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[0.9375rem] font-medium text-text transition-colors duration-200 hover:bg-surface-2 data-[state=open]:bg-surface-2";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header data-scrolled={scrolled} className="site-header sticky top-0 z-40">
      <div className="header-bar">
        <span aria-hidden className="header-progress" />
        <Wordmark />

        <NavigationMenu.Root delayDuration={80} className="hidden lg:block" aria-label="Principal">
          <NavigationMenu.List className="flex items-center gap-0.5">
            {menus.map((menu) => (
              <NavigationMenu.Item key={menu.label}>
                <NavigationMenu.Trigger className={triggerClass}>
                  {menu.label}
                  <ChevronDown
                    aria-hidden
                    className="size-4 text-muted transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180"
                  />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[min(64rem,calc(100vw-2.5rem))] p-3">
                  <div className="grid grid-cols-[1fr_15.5rem] gap-3">
                    <div
                      className="grid gap-x-2 gap-y-6 p-4"
                      style={{ gridTemplateColumns: `repeat(${Math.min(menu.groups.length, 4)}, minmax(0, 1fr))` }}
                    >
                      {menu.groups.map((group) => (
                        <div key={group.title}>
                          <p className="type-label mb-2 px-2.5 text-[0.6875rem] text-muted">{group.title}</p>
                          <ul>
                            {group.items.map((entry) => (
                              <li key={entry.label}>
                                <NavigationMenu.Link
                                  href={entry.href}
                                  className="block rounded-control px-2.5 py-2 transition-colors duration-150 hover:bg-surface-2"
                                >
                                  <span className="block text-[0.9375rem] font-semibold leading-snug">{entry.label}</span>
                                  <span className="block text-[0.8125rem] leading-snug text-muted">{entry.description}</span>
                                </NavigationMenu.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <NavigationMenu.Link
                      href={menu.feature.href}
                      className="group/feature relative flex min-h-64 flex-col justify-end overflow-hidden rounded-[1.25rem] bg-brand-soft p-5"
                    >
                      <span
                        aria-hidden
                        className="absolute -right-10 -top-10 size-44 rounded-full bg-brand/70 blur-2xl transition-transform duration-700 ease-out-expo group-hover/feature:scale-125"
                      />
                      <ArrowUpRight
                        aria-hidden
                        className="absolute right-4 top-4 size-5 text-on-brand transition-transform duration-300 ease-out-expo group-hover/feature:-translate-y-0.5 group-hover/feature:translate-x-0.5 dark:text-text"
                      />
                      <span className="type-label relative text-[0.6875rem] text-brand-ink">{menu.feature.eyebrow}</span>
                      <span className="relative mt-2 font-display text-2xl font-medium leading-[1.1] tracking-[-0.03em]">
                        {menu.feature.title}
                      </span>
                      <span className="relative mt-2 text-sm text-muted">{menu.feature.description}</span>
                    </NavigationMenu.Link>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}
            <NavigationMenu.Item>
              <NavigationMenu.Link href="#shop" className={triggerClass}>
                Loop
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <div className="absolute inset-x-0 top-full flex justify-center px-5 pt-2">
            <NavigationMenu.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-float transition-[width,height] duration-300 ease-out-expo data-[state=open]:animate-[menu-in_0.3s_var(--ease-out-expo)]" />
          </div>
        </NavigationMenu.Root>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <Button href="#" variant="ghost" size="sm" className="hidden h-10 sm:inline-flex">
            Entrar
          </Button>
          <Button href="#abrir-conta" size="sm" className="h-10 px-5">
            Abra sua conta
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Abrir menu"
        className="inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface-2 lg:hidden"
      >
        <Menu aria-hidden className="size-5" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.25s_ease-out]" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(26rem,100vw)] flex-col bg-bg shadow-float data-[state=open]:animate-[drawer-in_0.4s_var(--ease-out-expo)]">
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between px-5">
            <Dialog.Title className="type-label text-muted">Menu</Dialog.Title>
            <Dialog.Close
              aria-label="Fechar menu"
              className="inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface-2"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">Navegação principal do site</Dialog.Description>

          <nav aria-label="Principal" className="flex-1 overflow-y-auto px-5 pb-6">
            {menus.map((menu) => (
              <details key={menu.label} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-display text-2xl font-medium tracking-[-0.03em] [&::-webkit-details-marker]:hidden">
                  {menu.label}
                  <ChevronDown
                    aria-hidden
                    className="size-5 text-muted transition-transform duration-300 ease-out-expo group-open:rotate-180"
                  />
                </summary>
                <div className="space-y-5 pb-5">
                  {menu.groups.map((group) => (
                    <div key={group.title}>
                      <p className="type-label mb-1 text-[0.6875rem] text-muted">{group.title}</p>
                      <ul>
                        {group.items.map((entry) => (
                          <li key={entry.label}>
                            <a href={entry.href} onClick={() => setOpen(false)} className="block py-2 font-medium">
                              {entry.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}
            <a
              href="#shop"
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-2xl font-medium tracking-[-0.03em]"
            >
              Loop
            </a>
          </nav>

          <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-border p-5">
            <Button href="#" variant="secondary" onClick={() => setOpen(false)}>
              Entrar
            </Button>
            <Button href="#abrir-conta" onClick={() => setOpen(false)}>
              Abra sua conta
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
