import Link from "next/link";
import type { Item } from "@/lib/items";

export default function ItemCard({ product }: { product: Item }) {
  return (
    <Link href={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full">
        <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col flex-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.desc}</p>
          </div>
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2 whitespace-nowrap">
              <p className="text-lg font-bold text-gray-900">{product.price}</p>
              {"originalPrice" in product && product.originalPrice && (
                <>
                  <p className="text-sm text-gray-500 line-through">{product.originalPrice}</p>
                  {"discount" in product && product.discount && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{product.discount}</span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
