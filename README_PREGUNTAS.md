
# 📘 Preguntas Técnicas – Prueba Backend Semisenior

Este documento responde las preguntas teóricas incluidas en la prueba técnica de desarrollo backend.

---

## 🧩 1. Arquitectura MVC

### 1. ¿Qué significa MVC y cuáles son sus responsabilidades?
- **Model**: Acceso a datos y lógica de dominio.
- **View**: Presentación de datos (no aplica en backend puro).
- **Controller**: Coordina la solicitud, llama al modelo y retorna respuesta.

### 2. ¿Dónde ubicarías la lógica de negocio dentro del patrón MVC?
- En el **modelo** (servicios/clases del dominio), no en el controlador.

### 3. ¿Cómo organizarías un proyecto Express siguiendo MVC?
```
src/
├── controllers/
├── models/
├── services/
├── routes/
├── middlewares/
└── app.js
```

### 4. ¿Qué ventajas aporta el patrón MVC en equipos?
- Separación clara de responsabilidades
- Escalabilidad y mantenibilidad
- Facilita trabajo paralelo entre backend y frontend

---

## 🌐 2. API REST y Express

### 6. ¿Qué es una API RESTful y sus principios?
Una API basada en HTTP que sigue principios como: recursos identificables por URI, métodos estándar (GET, POST...), sin estado, y representación uniforme.

### 7. Métodos HTTP para CRUD:
- **POST**: Crear
- **GET**: Leer
- **PUT**: Reemplazar
- **PATCH**: Modificar parcialmente
- **DELETE**: Eliminar

### 8. PUT vs PATCH:
- **PUT**: Reemplazo total del recurso.
- **PATCH**: Modificación parcial. Usar PATCH cuando no se reemplace todo.

### 9. ¿Qué son los middlewares en Express?
Funciones que se ejecutan entre la solicitud y la respuesta. Se usan para validación, logs, parsing, autenticación, etc.

### 10. ¿Cómo manejar errores globales en Express?
Crear un middleware de error (`app.use((err, req, res, next) => {...})`) y centralizar ahí la respuesta a errores.

---

## 🔐 3. Seguridad y Autenticación

### 11. ¿Qué es un JWT y cómo funciona?
Es un token firmado que contiene información del usuario. Se envía al cliente tras el login y se incluye en headers para autorizar rutas protegidas.

### 12. Medidas para proteger una API pública:
- Autenticación y autorización
- HTTPS obligatorio
- Rate limiting
- Sanitización de inputs
- Logs y auditoría

### 13. Diferencia entre autenticación y autorización:
- **Autenticación**: Verifica identidad (¿quién eres?)
- **Autorización**: Verifica permisos (¿qué puedes hacer?)

---

## 🧾 4. XML y SOAP

### 14. ¿Qué es XML?
Un formato de datos estructurado, con base en etiquetas, muy similar a HTML. Fue ampliamente usado por ser extensible y compatible con servicios SOAP.

### 15. Diferencia entre REST y SOAP:
- **REST**: Ligero, usa HTTP, datos JSON.
- **SOAP**: Basado en XML, más rígido y con contratos definidos.

### 16. ¿Qué es un WSDL?
Archivo XML que describe los servicios, métodos y tipos de datos en un servicio SOAP.

### 17. Estructura de un mensaje SOAP:
- Envelope
  - Header (opcional)
  - Body (con la acción y parámetros)

### 18. ¿Cómo consumir un servicio SOAP desde Node.js?
Con paquetes como `soap`:
```js
const soap = require('soap');
soap.createClient(url, (err, client) => {
  client.MyMethod(args, callback);
});
```

### 19. ¿Cuándo preferir SOAP?
- Entornos legados
- Requisitos de contrato estricto
- Soporte para WS-Security (más robusto)

---

## 🗃️ 5. Base de Datos y ORM

### 20. ¿Qué es un ORM y ventajas?
Mapea tablas a objetos. Permite abstraer SQL con código legible, validaciones, relaciones y migraciones.

### 21. Diferencias de relaciones:
- **hasMany**: Uno a muchos
- **belongsTo**: Relación inversa
- **many-to-many**: Tabla intermedia con múltiples relaciones

### 22. ¿Cómo manejar migraciones en producción?
- Usar herramientas como TypeORM CLI, Sequelize CLI o Flyway.
- Versionar los scripts.
- Validar en staging antes de producción.
