import type { ComponentProps } from "react"

type IconProps = Omit<ComponentProps<"svg">, "ref">

/**
 * Arrow-up-right icon. Plain SVG (no forwardRef) to avoid
 * RSC serializing ref="$undefined" in the payload.
 */
export function IconArrowUpRight(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}
