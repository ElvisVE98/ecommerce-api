```
====================
E-commerce API
====================

API REST para un comercio electrónico simple con autenticación y gestión de productos.

1. Estructura
--------------------
backend/                        # Lógica del servidor
  ├── src/
  │   ├── config/             # Configuración de Supabase
  │   ├── routes/             # Definición de endpoints (auth, products)
  │   ├── schemas/            # Esquemas de validación (Zod)
  │   └── server.ts           # Punto de entrada de la API
  ├── .env                    # Variables de entorno (no versionar)
  ├── package.json            # Dependencias y scripts
  └── tsconfig.json           # Configuración de TypeScript

frontend/                       # Interfaz de usuario (Vue 3 + Vite)
  ├── src/
  │   ├── components/         # Componentes reutilizables (Navbar, Button, etc.)
  │   ├── views/              # Vistas principales (Login, Register, Home, etc.)
  │   ├── App.vue             # Componente raíz
  │   └── main.ts             # Punto de entrada de la aplicación
  ├── .env                    # Variables de entorno (VITE_API_URL)
  ├── package.json            # Dependencias
  └── vite.config.ts          # Configuración de Vite

2. Instalación
--------------------
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install

3. Variables de Entorno
--------------------
Crear archivo .env en backend/ y frontend/ con el siguiente contenido:

# Backend (.env)
SUPABASE_URL=tu_supabase_url
SUPABASE_KEY=tu_supabase_key
PORT=3000

# Frontend (.env)
VITE_API_URL=http://localhost:3000/api

4. Ejecución
--------------------
# Backend (en desarrollo)
npm run dev

# Frontend
npm run dev

# Para producción
npm run build  # Backend y Frontend
npm start      # Solo backend

5.endpoints
--------------------
Autenticación:
  GET    /api/auth/me            # Obtener usuario actual
  POST   /api/auth/register      # Registrar usuario
  POST   /api/auth/login         # Iniciar sesión
  POST   /api/auth/logout        # Cerrar sesión

Productos:
  GET    /api/products           # Listar productos
  GET    /api/products/:id       # Obtener producto por ID
  POST   /api/products           # Crear producto (Admin)
  PUT    /api/products/:id       # Actualizar producto (Admin)
  DELETE /api/products/:id       # Eliminar producto (Admin)

6. Validación
--------------------
Se utiliza Zod para validar datos de entrada en auth y products:

loginSchema.ts: email (string, email), password (string)
registerSchema.ts: name (string), email (string, email), password (string)
productSchema.ts: title (string), price (number > 0), stock (number >= 0)
```
