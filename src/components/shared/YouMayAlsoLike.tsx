import ProductCard from "../shared/ProductCard";
interface YouMayAlsoLikeProps {
  data: Record<string, any>[];
}

const YouMayAlsoLike: React.FC<YouMayAlsoLikeProps> = ({ data }) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {data?.map((product, index) => (
        <ProductCard
          key={index}
          id={product.product_pid}
          variantId={product.varient_pid}
          name={product.product_name}
          image={product.thumbnail_img}
          price={product.mrp}
          oldPrice={product.mrp_primary}
          rating={product.avg_rating}
          sale={product.is_sale}
        />
      ))}
    </div>
  );
};

export default YouMayAlsoLike;
