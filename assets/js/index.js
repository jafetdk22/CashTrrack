// Función para generar un hash de contraseña
async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Función para verificar la contraseña ingresada con el hash almacenado
async function verifyPassword(enteredPassword, hashedPassword) {
  const match = await bcrypt.compare(enteredPassword, hashedPassword);
  return match;
}

// Service Worker para la base de datos
class DatabaseServiceWorker {
  constructor() {
    this.database = {};
  }

  // Método para guardar un nuevo usuario y su contraseña cifrada
  async saveUser(username, password) {
    const hashedPassword = await hashPassword(password);
    this.database[username] = hashedPassword;
  }

  // Método para verificar si un usuario existe y su contraseña es correcta
  async authenticateUser(username, password) {
    if (!this.database.hasOwnProperty(username)) {
      return false; // Usuario no encontrado
    }

    const hashedPassword = this.database[username];
    const isPasswordCorrect = await verifyPassword(password, hashedPassword);
    return isPasswordCorrect;
  }
}

// Ejemplo de uso
const db = new DatabaseServiceWorker();
console.log(db);
