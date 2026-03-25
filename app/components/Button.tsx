interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ href, children, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-pill bg-accent px-6 py-2.5 font-heading text-base font-bold leading-[1.1] tracking-[-0.2px] text-text-dark transition-all duration-default hover:brightness-90 active:scale-[0.97] active:brightness-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-8 md:py-3 md:text-[20px] ${className}`}
    >
      {children}
    </a>
  );
}
