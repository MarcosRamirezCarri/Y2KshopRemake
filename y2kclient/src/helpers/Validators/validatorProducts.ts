import Product from "../Types";

const validateProduct = (product: Product) => {
    const newErrors = {
      name: '',
      images: '',
      price: '',
      clasification: '',
    };
    let isValid = true;

    if (!product.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!product.images.length) {
      newErrors.images = 'At least one image is required';
      isValid = false;
    }
    if (product.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
      isValid = false;
    }
    if (!product.clasification) {
      newErrors.clasification = 'Clasification is required';
      isValid = false;
    }

    return newErrors;
    
  };

  export default validateProduct;