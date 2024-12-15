import {Product} from "../types/Types";

const validateProduct = (product: Product) => {
    const newErrors = {
      name: "",
      images: "",
      price: "",
      colors: "",
      sizes: "",
      clasification: "",
      description: ""
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
    if (product.images.length > 4) {
      newErrors.images = 'Max of images: 4';
      isValid = false;
    }
    if (product.price <= 0 || product.price >= 9999) {
      
      newErrors.price = 'Price must between 0 and 9999';
      isValid = false;
    }
    if (!product.clasification) {
      newErrors.clasification = 'Clasification is required';
      isValid = false;
    }
    if(!product.description){
      newErrors.description = 'Description is required'
      isValid = false;

    }

    return newErrors;
    
  };

  export default validateProduct;