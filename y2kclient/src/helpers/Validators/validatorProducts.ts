import Product from "../Types";

const validateProduct = (product: Product) => {
    const newErrors = {
      name: "",
      images: "",
      price: "",
      colors: "",
      sizes: "",
      clasification: "",
    };
    let isValid = true;

    if (!product.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (product.name.length > 12) {
      newErrors.name = 'Name need to be less than 12 characters';
      isValid = false;
    }
    if (!product.images.length) {
      newErrors.images = 'At least one image is required';
      isValid = false;
    }
    if (product.price < 0 && product.price >= 9999) {
      newErrors.price = 'Price must be greater than 0 and less than 9999';
      isValid = false;
    }
    if (!product.clasification) {
      newErrors.clasification = 'Clasification is required';
      isValid = false;
    }
    if (product.colors.length <= 0) {
      newErrors.colors = 'Colors are required';
      isValid = false;
    }

    return newErrors;
    
  };

  export default validateProduct;