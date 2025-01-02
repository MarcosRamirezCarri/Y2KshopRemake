export const controlProduct = (
  name: string,
  images: string[],
  price: number,
  clasification: string,
  description: string
) => {
  const newErrors = {
    name: "",
    images: "",
    price: "",
    colors: "",
    sizes: "",
    clasification: "",
    description: "",
  };

  if (!name) {
    newErrors.name = "Name is required";
  }
  if (name.length > 12) {
    newErrors.name = "Name need to be less than 12 characters";
  }
  if (!images.length) {
    newErrors.images = "At least one image is required";
  }
  if (images.length > 4) {
    newErrors.images = "Max of images: 4";
  }
  if (price <= 0 || price >= 9999) {
    newErrors.price = "Price must between 0 and 9999";
  }
  if (!clasification) {
    newErrors.clasification = "Clasification is required";
  }
  if (!description) {
    newErrors.description = "Description is required";
  }
  if (description.length > 100) {
    newErrors.description = "Description need to be less than 100 characters";
  }

  return newErrors;
};
