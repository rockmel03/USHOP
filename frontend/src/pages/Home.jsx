import ProductList from "../features/product/components/ProductList/ProductList";
import CategoryListBar from "../features/category/components/CategoryListBar";
import CollageGrid from "../components/CollageGrid";
import { useSelector } from "react-redux";

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
  const { value: products } = useSelector((state) => state.products);

  return (
    <main className="w-full min-h-screen max-w-[1440px] mx-auto overflow-hidden">
      <CollageGrid collageData={collageData} />
      <CategoryListBar />
      <ProductList data={products?.slice(0, 10)} />
    </main>
  );
};

export default Home;
