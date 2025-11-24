"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";
import { PLACEHOLDER_IMAGE } from "@/lib/image";
import { normalizeImageUrl } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string | null | undefined;
  alt: string;
};

export function SafeImage({ src, alt, onError, ...props }: SafeImageProps) {
  const normalizedSrc = normalizeImageUrl(src);
  const [resolvedSrc, setResolvedSrc] = useState(normalizedSrc);

  useEffect(() => {
    setResolvedSrc(normalizedSrc);
  }, [normalizedSrc]);

  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      onError={(event) => {
        setResolvedSrc(PLACEHOLDER_IMAGE);
        onError?.(event);
      }}
    />
  );
}
