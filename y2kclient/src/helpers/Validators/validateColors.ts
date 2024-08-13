interface Size {
    size: string;
    quantity: number;
  }
  
  interface Color {
    color: string;
    sizes: Size[];
  }
  
  const validateColors = (colors: Color[]) => {
    let errors = {
      colors: "",
      sizes: "",
      colorName: "",
      sizesQuantity: "",
      duplicateSizes: ""
    };
  
    if (colors.length === 0) {
      errors.colors = "You must add at least one color";
      return errors;
    }
  
    colors.forEach((color, colorIndex) => {
      if (!color.color) {
        errors.colorName = `Color name is required at index ${colorIndex + 1}`;
      }
  
      if (color.sizes.length === 0) {
        errors.sizes = `You must add at least one size for color ${color.color || colorIndex + 1}`;
      }
  
      const sizeSet = new Set<string>();
  
      color.sizes.forEach((size, sizeIndex) => {
        if (size.quantity < 1) {
          errors.sizesQuantity = `Size ${size.size || sizeIndex + 1} for color ${color.color || colorIndex + 1} must have a quantity of at least 1`;
        }
  
        if (sizeSet.has(size.size)) {
          errors.duplicateSizes = `Duplicate size '${size.size}' found in color ${color.color || colorIndex + 1}`;
        } else {
          sizeSet.add(size.size);
        }
      });
    });
  
    return errors;
  };

  export default validateColors