"use client";

import Image from "next/image";

interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) => {
  // 默认占位图片
  const placeholderImage =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwbC01MCA1MGg5Nmw1LTUweiIgZmlsbD0iI2Q1ZDdkYSIvPgo8cGF0aCBkPSJNMTcwIDEyMGMwIDExLjA0Ni04Ljk1NCAyMC0yMCAyMHMtMjAtOC45NTQtMjAtMjAgOC45NTQtMjAgMjAtMjAgMjAgOC45NTQgMjAgMjB6IiBmaWxsPSIjZDVkN2RhIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjg3MjhiIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZHk9Ii4zZW0iPuaXoOWbvuWDjzwvdGV4dD4KPC9zdmc+";

  if (!src) {
    return (
      <div
        className={`relative bg-gray-100 flex items-center justify-center ${className}`}
      >
        <Image
          src={placeholderImage}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      className={`object-cover ${className}`}
      quality={85}
    />
  );
};

export default OptimizedImage;
