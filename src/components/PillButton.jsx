/**
 * PillButton — matches navbar Contact pill site-wide.
 * variant: "default" (dark on light) | "light" (light on dark overlays)
 * Use `to` for internal SPA routes, `href` for external/mailto links.
 */
import { Link } from "react-router-dom";

export default function PillButton({
  children,
  href = "#",
  to,
  onClick,
  type = "button",
  arrow = "↗",
  variant = "default",
  className = "",
  showArrow = true,
  ...rest
}) {
  const classes = [
    "pill-btn",
    variant === "light" ? "pill-btn--light" : "",
    "inline-flex items-center gap-[0.35em] px-5 py-[0.55em]",
    "rounded-full border transition-all duration-300 cursor-pointer font-sans",
    "no-underline bg-transparent",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const textClass =
    "pill-btn-text text-[clamp(10px,0.82vw,13px)] font-semibold tracking-[0.16em] uppercase transition-colors duration-300";

  const content = (
    <>
      {showArrow && arrow && (
        <span className={`${textClass} leading-none`}>{arrow}</span>
      )}
      <span className={textClass}>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (onClick || type === "submit") {
    return (
      <button type={type} onClick={onClick} className={classes} {...rest}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} onClick={onClick} className={classes} {...rest}>
      {content}
    </a>
  );
}
