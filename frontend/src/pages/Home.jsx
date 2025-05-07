import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../features/category/categoryThunk";

const categories = [
  {
    name: "Fashion & Apparel",
    image:
      "https://images.pexels.com/photos/31667397/pexels-photo-31667397/free-photo-of-portrait-of-two-stylish-young-adults-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Electronics",
    image:
      "https://images.pexels.com/photos/306763/pexels-photo-306763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Home & Living",
    image:
      "https://images.pexels.com/photos/709767/pexels-photo-709767.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Beauty & personal care",
    image:
      "https://images.pexels.com/photos/2866796/pexels-photo-2866796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Food & Groceries",
    image:
      "https://images.pexels.com/photos/9070106/pexels-photo-9070106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Fitness & Sports",
    image:
      "https://images.pexels.com/photos/16686174/pexels-photo-16686174/free-photo-of-table-tennis-rackets-and-ball.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Toys & Games",
    image:
      "https://images.pexels.com/photos/163077/mario-yoschi-figures-funny-163077.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Travel & Outdoors",
    image:
      "https://images.pexels.com/photos/8212233/pexels-photo-8212233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Pets",
    image:
      "https://images.pexels.com/photos/1938123/pexels-photo-1938123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2 ",
  },
];

const collageData = [
  {
    image:
      "https://images.unsplash.com/photo-1744812441673-df2f1ce89854?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    heading: "Shoes",
    subHeading: "lorem ipsum dolor",
    link: "",
  },

  {
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    heading: "Fashion",
    subHeading: "lorem ipsum dolor",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584184804426-5e2aa23c2937?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    heading: "accesories",
    subHeading: "lorem ipsum dolor",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    heading: "Beauty & personal care",
    subHeading: "lorem ipsum dolor",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1632781297772-1d68f375d878?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    heading: "Gym & Sports",
    subHeading: "lorem ipsum dolor",
    link: "",
  },
  {
    image:
      "https://images.pexels.com/photos/1162983/pexels-photo-1162983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    heading: "jwellery",
    subHeading: "lorem ipsum dolor",
    link: "",
  },
];

const Home = () => {
  const { loading, error, value } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <main className="w-full min-h-screen max-w-[1440px] mx-auto overflow-hidden">
      <section className="w-full h-[80vh] grid grid-cols-12 grid-rows-2 gap-4 p-5">
        {collageData.map((item, idx) => {
          const boxPositions = [
            "col-span-3",
            "col-span-3 row-span-2",
            "col-span-6",
            "col-span-3",
            "col-span-2",
            "col-span-4",
          ];
          return (
            <div
              key={idx}
              className={`group/collage relative rounded-xl overflow-hidden bg-black ${boxPositions[idx]}`}
            >
              <img
                src={item.image}
                alt={item.heading}
                className="w-full h-full object-cover scale-105 group-hover/collage:scale-100 transition ease duration-300"
              />
              <div className="absolute w-full h-full top-0 bg-[linear-gradient(0deg,_rgb(0_0_0_/_57%)_0%,_rgb(255_255_255_/_0%)_100%)] text-white p-4 flex flex-col justify-between transition-all ease duration-200">
                <div className="rounded-full w-fit bg-white text-yellow-500 text-xs font-bold px-1.5 py-0.5">
                  <span>⭐</span> <span>{item.rating}</span>
                </div>
                <div>
                  <h2 className="capitalize font-semibold text-lg leading-[1.2]">
                    {item.heading}
                  </h2>
                  <h4 className="opacity-80 leading-[1.2]">
                    {item.subHeading}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <section className="flex items-start justify-between gap-2">
        {categories.map((i, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-35 flex flex-col items-center"
          >
            <div className="w-full aspect-square bg-zinc-500 overflow-hidden rounded-lg">
              <img
                src={i.image}
                alt={i.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-center font-semibold opacity-50">
              {i.name}
            </p>
          </div>
        ))}
      </section>
      <section className="w-full grid grid-cols-10 gap-3 p-5">
        {[...new Array(10)].map((item, idx) => (
          <div
            key={idx}
            className=" col-span-2 aspect-3/4 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex-1 w-full h-[60%]"></div>
            <div className="px-2 py-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium capitalize">
                  {"Product Name"}
                </h2>
                <h3 className="px-1 py-0.5 bg-green-500 text-white rounded text-xs font-medium">
                  <span>⭐</span>
                  <span> {(Math.random() * 5).toFixed(1)}</span>
                </h3>
              </div>
              <p className="text-base opacity-80 leading-[1.2] my-3">
                {"Product Desription Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, laudantium.".slice(
                  0,
                  90
                ) + "..."}
              </p>
              <h2 className="text-xl font-medium text-orange-500">
                ₹ {(Math.random() * 1000).toFixed(2)}
              </h2>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
