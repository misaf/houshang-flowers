"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { PLACEHOLDER_IMAGE } from "@/shared/lib/image";
import { cn, normalizeImageUrl } from "@/shared/lib/utils";

interface CategoryMediaImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  imageClassName?: string;
  children?: ReactNode;
}

function toCssImageUrl(src: string): string {
  return `url("${src.replace(/["\\\n\r\f]/g, "\\$&")}")`;
}

export function CategoryMediaImage({
  src,
  alt,
  className,
  imageClassName,
  children,
}: CategoryMediaImageProps) {
  const normalizedSrc = normalizeImageUrl(src);
  const [resolvedSrc, setResolvedSrc] = useState(normalizedSrc);

  useEffect(() => {
    let isCancelled = false;

    setResolvedSrc(normalizedSrc);

    if (normalizedSrc === PLACEHOLDER_IMAGE) {
      return () => {
        isCancelled = true;
      };
    }

    const image = new window.Image();
    image.onload = () => {
      if (!isCancelled) {
        setResolvedSrc(normalizedSrc);
      }
    };
    image.onerror = () => {
      if (!isCancelled) {
        setResolvedSrc(PLACEHOLDER_IMAGE);
      }
    };
    image.src = normalizedSrc;

    return () => {
      isCancelled = true;
    };
  }, [normalizedSrc]);

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative overflow-hidden", className)}
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-0 bg-cover bg-center", imageClassName)}
        style={{ backgroundImage: toCssImageUrl(resolvedSrc) }}
      />
      {children}
    </div>
  );
}
