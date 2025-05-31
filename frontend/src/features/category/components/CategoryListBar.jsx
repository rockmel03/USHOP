import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";

const CategoryListBar = () => {
  const { value: categories } = useSelector((state) => state.categories);
  const [searchParams] = useSearchParams();

  const scrollerRef = useRef(null);
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      scroller.scrollLeft += e.deltaY;
    };

    scroller.addEventListener("wheel", handleWheel);
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
    };
  }, [categories]);

  return (
    categories.length > 0 && (
      <div
        ref={scrollerRef}
        className=" scrollbar-hidden px-4 py-0.5 whitespace-nowrap overflow-x-auto"
      >
        <NavLink to={`/products?category=all`}>
          {() => {
            const category = searchParams.get("category");
            const isActive = !category || category === "all";
            return (
              <span
                title="All Categories"
                className={`inline-block mr-1 px-3 py-1 rounded-full whitespace-nowrap border-2 border-gray-600 text-sm text-gray-600 hover:text-gray-800 hover:ring transition capitalize ${
                  isActive ? "ring" : ""
                } `}
              >
                All
              </span>
            );
          }}
        </NavLink>
        {categories.map((item) => {
          const id = searchParams.get("id");
          const category = searchParams.get("category");
          const isActive =
            id && category && category === item.name && id === item._id;
          return (
            <NavLink
              to={`/products?category=${item.name}&id=${item._id}`}
              key={item._id}
            >
              <span
                title={item.description}
                className={`inline-block mr-1 px-3 py-1 rounded-full whitespace-nowrap border-2 border-gray-600 text-sm text-gray-600 hover:text-gray-800 hover:ring transition capitalize ${
                  isActive ? "ring" : ""
                } `}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </div>
    )
  );
};

export default CategoryListBar;
