const Validate = async(name: string, price: number, password: string) => {
    const errors = [];

    if (!name || typeof name !== 'string' || name.length > 128) {
      errors.push('El nombre es obligatorio, debe ser un string y tener máximo 128 caracteres.');
    }
  
    if (price && typeof price !== Number ) {
      errors.push('El teléfono debe ser un string, tener máximo 15 caracteres y solo contener números.');
    }
  
    if (!password || typeof password !== 'string' || password.length < 6) {
      errors.push('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    }
  
    return errors;
  };