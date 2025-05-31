import CategoryListBar from "../features/category/components/CategoryListBar";
import ShowProducts from "../features/product/components/ShowProducts";

const Products = () => {
  return (
    <main>
      <section>
        <CategoryListBar />
        <ShowProducts />
      </section>
    </main>
  );
};

export default Products;
