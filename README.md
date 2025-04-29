# Node.js Authentication API con Clean Architecture

Este proyecto implementa un sistema de autenticación RESTful utilizando Node.js, Express, TypeScript y MongoDB, siguiendo los principios de Clean Architecture.

## Características

- Registro de usuarios
- Inicio de sesión con JWT
- Arquitectura limpia con separación clara de responsabilidades:
  - Dominio
  - Casos de uso
  - Infraestructura
  - Presentación
- MongoDB como base de datos
- Docker para facilitar el despliegue

## Estructura del Proyecto

```
src/
├── app.ts                 # Punto de entrada de la aplicación
├── config/                # Configuraciones y adaptadores
├── data/                  # Capa de acceso a datos
│   └── mongodb/           # Implementación con MongoDB
├── domain/                # Reglas de negocio y entidades
│   ├── datasources/       # Interfaces para fuentes de datos
│   ├── dtos/              # Objetos de transferencia de datos
│   ├── entities/          # Entidades del dominio
│   ├── repositories/      # Interfaces de repositorios
│   └── use-cases/         # Casos de uso
├── infrastructure/        # Implementaciones concretas
│   ├── datasources/       # Implementación de fuentes de datos
│   ├── mappers/           # Mapeadores entre capas
│   └── repositories/      # Implementación de repositorios
└── presentation/          # API y controladores
    ├── auth/              # Controladores y rutas de autenticación
    ├── middlewares/       # Middlewares de Express
    ├── routes.ts          # Configuración de rutas
    └── server.ts          # Configuración del servidor
```

## Requisitos Previos

- Node.js (v18 o superior)
- Docker y Docker Compose
- npm o yarn

## Instalación y Configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sorodriguezz/node-auth-clean-architecture.git
   cd node-auth-clean-architecture
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:

   Cree un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```
   PORT=3000
   MONGO_URL=mongodb://mongo-user:123456@localhost:27017
   MONGO_DB_NAME=auth-db
   JWT_SECRET=YourSecretKey
   ```

## Ejecución

### Usando Docker (recomendado)

1. Iniciar la base de datos MongoDB:
   ```bash
   docker-compose up -d
   ```

2. Iniciar el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Sin Docker

1. Asegúrese de tener MongoDB instalado y corriendo localmente.
2. Ajuste las variables de entorno según sea necesario.
3. Ejecute:
   ```bash
   npm run dev
   ```

## Endpoints de la API

### Registro de Usuario

```
POST /api/auth/register
```

**Cuerpo de la petición:**
```json
{
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "user_id",
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "token": "jwt_token"
}
```

### Iniciar Sesión

```
POST /api/auth/login
```

**Cuerpo de la petición:**
```json
{
  "email": "correo@ejemplo.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": "user_id",
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "token": "jwt_token"
}
```

## Pruebas con Postman/cURL

### Registrar un usuario con cURL:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Usuario Prueba","email":"test@example.com","password":"Password123"}'
```

### Iniciar sesión con cURL:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'
```

## Desarrollo

- Para desarrollo con recarga automática:
  ```bash
  npm run dev
  ```

- Para generar build de producción:
  ```bash
  npm run build
  ```

- Para ejecutar en producción:
  ```bash
  npm start
  ```

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **TypeScript**: Superset tipado de JavaScript
- **Express**: Framework web
- **MongoDB/Mongoose**: Base de datos NoSQL y ODM
- **JWT (jsonwebtoken)**: Autenticación basada en tokens
- **bcryptjs**: Encriptación de contraseñas
- **Docker**: Contenedorización

## Arquitectura

Este proyecto implementa Clean Architecture que permite:

- Independencia de frameworks
- Testabilidad
- Independencia de la UI
- Independencia de la base de datos
- Independencia de cualquier agente externo

Las capas del proyecto están organizadas desde el interior (dominio) hacia el exterior (infraestructura y presentación).
