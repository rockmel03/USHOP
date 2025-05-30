import ProductList from "../features/product/components/ProductList/ProductList";
import CategoryListBar from "../features/category/components/CategoryListBar";

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
  return (
    <main className="w-full min-h-screen max-w-[1440px] mx-auto overflow-hidden">
      <CategoryListBar />
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
      <ProductList />
    </main>
  );
};

export default Home;
