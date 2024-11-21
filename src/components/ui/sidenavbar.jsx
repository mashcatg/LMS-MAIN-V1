"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

/**
 * @typedef {Object} NavLink
 * @property {string} title
 * @property {string} [label]
 * @property {LucideIcon} icon
 * @property {"default" | "menuitems"} variant
 */

/**
 * @param {{ isCollapsed: boolean, links: NavLink[] }} props
 */
export function SideNavbar({ links, isCollapsed }) {
  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="overflow-y-auto overflow-x-hidden max-h-[80vh] grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.url}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "relative h-10 w-10 flex items-center justify-center p-1",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    {link.variant === "menu_active_item" && (
                      <div className="absolute h-10 rounded left-[-60px] bg-primary w-12"></div> // Adjusted left value to -50px
                    )}
                    <link.icon className="h-5 w-5" /> {/* Smaller icon size */}
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-2 text-sm" // Reduced gap and smaller text
                >
                  {link.title}
                  {link.label && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {link.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href={link.url}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  "relative flex items-center justify-start p-4 text-sm h-10 mx-1",
                  link.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                {link.variant === "menu_active_item" && (
                  <div className="absolute h-10 rounded left-[-55px] bg-primary w-12 z-10"></div>
                )}
                <link.icon className="mr-2 h-5 w-5" /> {/* Smaller icon size */}
                <span className="text-xs font-semibold">{link.title}</span>{" "}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto text-xs",
                      link.variant === "default" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
