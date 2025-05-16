import { useState } from "react";

const ListItem = ({ data: product }) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_0.5fr] items-center">
      <div className="flex items-center justify-start gap-1">
        <img
          src={product.images[0]?.url || "/landscape-placeholder.png"}
          alt=""
          className="w-10 aspect-square object-contain bg-gray-100 rounded-md"
        />
        <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
          {product.name}
        </p>
      </div>
      <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
        {product.category.name}
      </p>
      <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
        {product.stock}
      </p>
      <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
        {product.price}
      </p>
      <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
        Active
      </p>
      <div className="relative ">
        <button
          title="More"
          onClick={() => setShowActions((prev) => !prev)}
          className="p-2 w-fit text-sm font-semibold text-zinc-600 hover:text-zinc-800"
        >
          <span>
            <i className="ri-more-2-fill"></i>
          </span>
        </button>
        {showActions && (
          <div
            onBlur={() => setShowActions(false)}
            onClickCapture={() => setShowActions(false)}
            className="absolute z-1 right-0 rounded w-fit p-1 flex flex-col bg-white shadow-md"
          >
            <button className="text-sm px-2 py-1 hover:bg-zinc-100 rounded text-zinc-500 hover:text-zinc-700 cursor-pointer text-start flex flex-nowrap">
              <span className="mr-1">
                <i className="ri-information-2-fill"></i>
              </span>
              <span className="font-semibold"> Info</span>
            </button>
            <button className="text-sm px-2 py-1 hover:bg-zinc-100 rounded text-zinc-500 hover:text-zinc-700 cursor-pointer text-start flex flex-nowrap">
              <span className="mr-1">
                <i className="ri-pencil-fill"></i>
              </span>
              <span className="font-semibold"> Edit</span>
            </button>
            <button className="text-sm px-2 py-1 hover:bg-zinc-100 rounded text-red-400 hover:text-red-500 cursor-pointer text-start flex flex-nowrap">
              <span className="mr-1">
                <i className="ri-delete-bin-5-fill"></i>
              </span>
              <span className="font-semibold"> Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;
