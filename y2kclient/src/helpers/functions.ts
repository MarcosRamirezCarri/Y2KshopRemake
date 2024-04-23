export const getSizesForCategory = (category: string): string[] => {
    switch (category) {
      case "men's clothing":
        return ['S', 'M', 'L', 'XL'];
      case "women's clothing":
        return ['S', 'M', 'L'];
     
      default:
        return ['Does not have categories'];
    }
  };