import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = { children: ReactNode; className?: string };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type Props = AnchorProps | NativeButtonProps;
export default function Button({ children, className, ...props }: Props) {
  const classes = cn("inline-flex items-center justify-center rounded-full px-5 py-3 font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-500", className);
  return "href" in props && props.href ? <a className={classes} {...props}>{children}</a> : <button className={classes} {...(props as NativeButtonProps)}>{children}</button>;
}
