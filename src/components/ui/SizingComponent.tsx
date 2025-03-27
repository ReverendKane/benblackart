import React from "react";

interface SizeData {
  name: string;
  paperSize: string;
  imageArea: string;
  margins: string;
  price: string;
}

interface SizingComponentProps {
  sizes: SizeData[];
  selectedSize: string;
  onSelectSize: (sizeName: string) => void;
}

export default function SizingComponent({
  sizes,
  selectedSize,
  onSelectSize,
}: SizingComponentProps) {
  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-3 font-Outfit">
      <p className="text-sm font-Outfit text-gray-600 mb-2">Available Sizes:</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.name}
            className={`px-3 py-1.5 text-sm rounded transition-all ${
              selectedSize === size.name
                ? "bg-blue-600 text-white border border-blue-600"
                : "border border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
            onClick={() => onSelectSize(size.name)}
          >
            {size.paperSize}
          </button>
        ))}
      </div>
    </div>
  );
}
