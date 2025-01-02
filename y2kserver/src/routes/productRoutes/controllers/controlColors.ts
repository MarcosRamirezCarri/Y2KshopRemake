interface Size {
  size: string;
  quantity: number;
}

interface Color {
  color: string;
  sizes: Size[];
}

export const controlColors = (colors: Color[]) => {
  let errors = {
    colors: "",
    colorErrors: [] as string[],
    sizeErrors: [] as string[],
  };

  if (colors.length === 0) {
    errors.colors = "You must add at least one color.";
    return errors;
  }

  colors.forEach((color, colorIndex) => {
    let colorError = `Errors for color ${
      color.color || `at index ${colorIndex + 1}`
    }:`;
    let hasColorError = false;

    if (!color.color) {
      colorError += `\n- Color name is required.`;
      hasColorError = true;
    }

    if (color.sizes.length === 0) {
      colorError += `\n- At least one size must be added.`;
      hasColorError = true;
    }

    const sizeSet = new Set<string>();

    color.sizes.forEach((size, sizeIndex) => {
      if (size.quantity < 1) {
        colorError += `\n- Size ${
          size.size || `at index ${sizeIndex + 1}`
        } must have a quantity of at least 1.`;
        hasColorError = true;
      }

      if (sizeSet.has(size.size)) {
        colorError += `\n- Duplicate size '${size.size}' found.`;
        hasColorError = true;
      } else {
        sizeSet.add(size.size);
      }
    });

    if (hasColorError) {
      errors.colorErrors.push(colorError);
    }
  });

  return errors;
};
