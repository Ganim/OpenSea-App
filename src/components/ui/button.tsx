import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none user-select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg',
        destructive:
          'bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg',
        outline:
          'border border-gray-200 dark:border-white/20 bg-transparent hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white',
        secondary:
          'backdrop-blur-xl bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 hover:bg-white/10 hover:border-white/20 text-gray-900 dark:text-white',
        ghost:
          'bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white',
        link: 'text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 rounded-2xl',
        sm: 'h-9 px-4 rounded-xl',
        lg: 'h-12 px-8 rounded-2xl',
        icon: 'size-10 rounded-2xl',
        'icon-sm': 'size-9 rounded-xl',
        'icon-lg': 'size-12 rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
