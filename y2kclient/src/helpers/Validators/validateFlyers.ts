import { FlyerType } from "../types/FlyerType";

const validateFlyer = (flyer: FlyerType) => {
  const newErrors = {
    name: "",
    image: "",
    type: "",
    text: "",
  };
  let isValid = true;

  if (!flyer.type) {
    newErrors.type = "Type of flyer is required";
  }
  if (!flyer.name) {
    newErrors.name = "Name is required";
    isValid = false;
  }

  if (flyer.name.length > 12) {
    newErrors.name = "Name need to be less than 12 characters";
    isValid = false;
  }
  if (flyer.type !== "text") {
    if (!flyer.image) {
      newErrors.image = "The Image is required!";
      isValid = false;
    }
    if (flyer.text) {
      newErrors.text =
        "The text on the flyer of type 'bigFlyer/smallFlyer' is not allowed";
      isValid = false;
    }
  } else {
    if (flyer.image.length > 3) {
      newErrors.image = "The image on the flyer of type 'Text' is not allowed";
      isValid = false;
    }
    if (flyer.text.length < 6) {
      newErrors.text = "The text is required!";
      isValid = false;
    }
  }

  return newErrors;
};

export default validateFlyer;
