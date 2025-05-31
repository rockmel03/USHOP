function CollageGrid({ collageData }) {
  return (
    <section className="w-full h-screen md:h-[80vh] grid grid-cols-6 grid-rows-4 md:grid-cols-12 md:grid-rows-2 gap-4 p-5">
      {collageData.map((item, idx) => {
        const boxPositions = [
          "order-1 md:order-1 col-span-3",
          "order-2 md:order-2 col-span-3 row-span-2",
          "order-4 md:order-3 col-span-6",
          "order-3 md:order-4 col-span-3",
          "order-5 md:order-5 col-span-2",
          "order-6 md:order-6 col-span-4",
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
                <h4 className="opacity-80 leading-[1.2]">{item.subHeading}</h4>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CollageGrid;
