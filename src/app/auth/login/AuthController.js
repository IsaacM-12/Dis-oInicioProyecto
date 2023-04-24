const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para validar los datos de inicio de sesión
const validateLoginData = (username, password) => {
  if (!username || !password) {
    throw new Error("Nombre de usuario y contraseña requeridos");
  }
};

// Controlador de autenticación
class AuthController {
  // Método para iniciar sesión
  login(username, password) {
    // Validar los datos de entrada
    validateLoginData(username, password);

    // Buscar al usuario en la base de datos
    return User.findOne({ username: username }).then((user) => {
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Verificar la contraseña
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          throw new Error("Contraseña incorrecta");
        }

        // Generar un token JWT con el ID del usuario
        const token = jwt.sign({ userId: user._id }, "secret", {
          expiresIn: "1h",
        });
        return token;
      });
    });
  }
  
}

module.exports = AuthController;
