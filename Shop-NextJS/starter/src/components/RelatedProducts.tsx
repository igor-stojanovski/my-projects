import React from "react";
import ProductItem, { ProductItemData } from "./ProductItem";

interface Props {
  data: ProductItemData[];
}

const RelatedProducts: React.FC<Props> = ({ data }) => {
  return (
    <section className="sec-relate-product bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex">
            {(data || []).map((product) => {
              return <ProductItem key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
