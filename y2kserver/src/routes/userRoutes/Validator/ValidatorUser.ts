const Validate = async(name: string, email: string, phone: string, password: string, location: any) => {
    const errors = [];

    if (!name || typeof name !== 'string' || name.length > 128) {
      errors.push('El nombre es obligatorio, debe ser un string y tener máximo 128 caracteres.');
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('El email no es válido.');
    }
  
    if (phone && (typeof phone !== 'string' || phone.length > 15 || !/^[0-9]+$/.test(phone))) {
      errors.push('El teléfono debe ser un string, tener máximo 15 caracteres y solo contener números.');
    }
  
    if (!password || typeof password !== 'string' || password.length < 6) {
      errors.push('La contraseña es obligatoria y debe tener al menos 6 caracteres.');
    }
    if (!location.city || !location.province || !location.country) {
      errors.push('Debe haber ciudad, provincia y pais');
    }

    return errors;
  };

export default Validate;
