import Product from "./Types";

function addDescription(product: Product[]): Product[] {
  return product.map(product => {
    const colorList = product.colors.map(color => color.color).join(", ");
    const description = `The ${product.name} is available in the following colors: ${colorList}. Perfect for any occasion, this jacket combines style and comfort.`;

    return {
      ...product,
      description
    };
  });
}
export default addDescription
