"use client";

import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string | null;
    amazonUrl: string;
    featured: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">无图片</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
            精选
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 text-amber-900">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-amber-700">
            ¥{product.price.toLocaleString()}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="bg-amber-700 text-white px-3 py-1 rounded-md text-sm hover:bg-amber-800 transition-colors"
          >
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
}
