# Demo de Automatización Sauce – Desafío QA

Suite de pruebas automatizadas para [Sauce Demo](https://www.saucedemo.com/) construida con **Playwright + Cucumber (BDD)** y el patrón de diseño **Page Object Model**.

---

## Historia de Usuario

> Como cliente de Sauce Demo,
> quiero poder iniciar sesión, agregar productos al carrito y completar una compra,
> para poder adquirir los productos que necesito.

---

## Stack Tecnológico

| Herramienta                                  | Propósito                    |
| -------------------------------------------- | ---------------------------- |
| [Playwright](https://playwright.dev/)        | Automatización de navegador  |
| [Cucumber.js](https://cucumber.io/)          | Ejecutor de pruebas BDD      |
| [Gherkin](https://cucumber.io/docs/gherkin/) | Sintaxis de archivos feature |
| Page Object Model                            | Patrón de diseño             |

---

## Estructura del Proyecto

```
├── features/               # Archivos feature en Gherkin
│   ├── login.feature
│   ├── products.feature
│   ├── cart.feature
│   └── checkout.feature
├── step-definitions/       # Implementaciones de pasos en Cucumber
├── page-objects/           # Clases POM (una por página)
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── playwright.config.js
├── cucumber.js
└── .env                    # Credenciales (no versionadas — ver configuración abajo)
```

---

## Configuración

### Prerrequisitos

* Node.js **20.x, 22.x o 24.x** (requisito de Playwright)
* npm

### Instalar dependencias

```bash
npm install
npx playwright install
```

> **Solo Linux:** si aparece un error por librería faltante, ejecuta:
>
> ```bash
> sudo apt-get install libavif13
> ```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto. Las credenciales están disponibles públicamente en la página de login de [Sauce Demo](https://www.saucedemo.com/).

````

> El archivo `.env` está incluido en `.gitignore` y no se subirá al control de versiones.

---

## Ejecución de Pruebas

### Suite completa
```bash
npm test                  # Todos los escenarios de Cucumber
npm run test:all          # Glob explícito — mismo resultado
````

### Por feature

```bash
npm run test:login        # Escenarios de login
npm run test:products     # Agregar producto al carrito
npm run test:cart         # Ver contenido del carrito
npm run test:checkout     # Flujo completo de compra
```

### Runner de Playwright

```bash
npm run test:playwright   # Headless
npm run test:headed       # Con UI del navegador visible
```

---

## Escenarios de Prueba

### Login (`login.feature`)

* ✅ Inicio de sesión exitoso con credenciales válidas (`standard_user`)
* ✅ Fallo de login con credenciales inválidas (`invalid_user` / contraseña incorrecta)
* ✅ Fallo de login con `locked_out_user` — valida el mensaje de error

### Productos (`products.feature`)

* ✅ Agregar un producto al carrito desde la página de productos
* ✅ El badge del carrito se actualiza correctamente

### Carrito (`cart.feature`)

* ✅ Los productos agregados aparecen en el carrito de compras
* ✅ Nombre, precio y cantidad del producto son correctos

### Checkout (`checkout.feature`)

* ✅ Completar el flujo de compra desde el carrito hasta la confirmación
* ✅ Se muestra el mensaje de confirmación al finalizar

---

## Patrón de Diseño

Este proyecto utiliza el **Page Object Model (POM)**. Cada página de la aplicación tiene una clase dedicada en `page-objects/` que encapsula sus selectores e interacciones. Las definiciones de pasos llaman a estos page objects y no contienen selectores directamente. `BasePage.js` contiene lógica compartida (navegación, esperas) que todas las páginas heredan.

Esto separa la intención de las pruebas (Gherkin) de la implementación (page objects), facilitando el mantenimiento cuando cambia la UI.

---

## Estrategia de Automatización

### Enfoque

Las pruebas están escritas en estilo **BDD** usando Gherkin, de modo que los criterios de aceptación se mapean directamente a escenarios ejecutables. Cada criterio de la historia de usuario tiene su archivo feature correspondiente.

### Patrón: Page Object Model

Los selectores y las interacciones están centralizados en clases de página. Si un selector cambia, solo se actualiza el page object, no todas las definiciones de pasos.

### Cobertura de usuarios

Se cubren todos los tipos de usuario y escenarios de credenciales requeridos:

* `standard_user` + contraseña válida — flujo feliz (login, carrito, checkout)
* `standard_user` + contraseña incorrecta — escenario negativo de login
* `locked_out_user` — valida el estado de error por cuenta bloqueada

### Consideraciones (Trade-offs)

* Cucumber añade algo de sobrecarga frente a pruebas puras con Playwright, pero se eligió para cumplir con el enfoque BDD y mantener los escenarios legibles como criterios de aceptación.
* Los archivos feature están organizados por página/flujo en lugar de por tipo de usuario, para mantener cada archivo enfocado y ejecutable de forma independiente mediante los scripts `test:*`.
