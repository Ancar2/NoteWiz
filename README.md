NoteWiz

Una aplicación web completa para tomar notas con autenticación de usuario, validaciones reactivas y cierre de sesión por inactividad o expiracion de token.  
Desarrollada con **Angular (frontend)** y **Node.js + Express (backend)**.


- **Frontend**: Angular
- **Backend**: Node.js + Express + MongoDB

---

## 📁 Estructura del Proyecto

```
NoteWiz/
├── AngularNotas/   → Aplicación frontend en Angular
├── ApiNotas/       → API REST backend con Express y MongoDB
```

---

## Tecnologías Utilizadas

### Frontend - AngularNotas

- Angular
- TypeScript
- Bootstrap
- Reactive Forms
- Angular Router
- JWT Auth

### Backend - ApiNotas

- Node.js
- Express 5.1
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt (encriptación de contraseñas)
- dotenv (variables de entorno)
- CORS

---

## Autenticación

- El sistema utiliza **JWT** para gestionar sesiones.
- Los tokens tienen expiración configurable (`TOKEN_EXPIRE`).
- Hay cierre automático de sesión por **inactividad o expiración del token**.

---

##  Funcionalidades

### Frontend

- Registro de usuario
- Inicio de sesión con token
- Crear, editar, enviar al basurero y eliminar notas
- Visualización por estado: pendiente, ejecutando, finalizado

### Backend

- Registro y login de usuarios con autenticación JWT
- CRUD de notas protegido por token
- Middleware de validación de token
- Base de datos MongoDB (local o en la nube)

---

## Instrucciones para ejecutar localmente

###  Requisitos previos

- Node.js y npm
- Angular CLI
- MongoDB local o URI de MongoDB Atlas

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/Ancar2/NotasApp.git
cd NotasAPP
```

---

### 2. Configurar el Backend

```bash
cd ../ApiNotas
npm install
```

#### Crear archivo `.env` en la raíz del backend

```.env
PORT= 3000
DB_URL= 'mongodb://localhost:27017/notasapp'
SECRET_JWT_KEY= 'tuClave'
TOKEN_EXPIRE= '2H'
CORREO = 'corrreo con el que se enviaran las verificaciones'
PASSCORREO = 'password' (configurarla como password de aplicaciones en la aplicacion de gmail, si utiliza gmail)
SERVICECORREO = "gmail"
```

#### Iniciar el servidor

```bash
npm run dev
```

El backend se ejecutará en `http://localhost:3000`.

---

### 3. Configurar el Frontend

```bash
cd ../AngularNotas
npm install
```

#### Iniciar la aplicación Angular

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Scripts útiles del backend

```json
"scripts": {
  "dev": "node --watch index.js"
}
```

---

##  Pruebas y validaciones

- Validación de formularios con mensajes personalizados
- Protección de rutas mediante AuthGuard
- Control de sesión y cierre automático por expiración o inactividad
- Mensajes de error claros en el login y registro

---

## Autor

**Andres Cardenas**
**Ancar**   
Desarrollador Full Stack | JavaScript | Angular | Node.js  
ancar.devcode@gmail.com  
🌐 [GitHub](https://github.com/Ancar2)


##  Licencia

MIT © 2025 - Andres Cardenas

---

## Contacto

¿Tienes preguntas o sugerencias?  
Puedes contactarme por GitHub o correo ancar.devcode@gmail.com si decides compartirlo públicamente.
