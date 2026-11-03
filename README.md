# 💳 T1 - Strategy Pattern Payment Demo

[![Angular](https://img.shields.io/badge/Angular-20.3.0-red)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Descripción

Una aplicación Angular moderna que demuestra la implementación del **Patrón de Diseño Strategy** para diferentes métodos de pago. La aplicación permite procesar pagos mediante tarjetas de crédito, PayPal y criptomonedas, cada uno con su propia estrategia de procesamiento.

## 🚀 Características

- ✨ **Patrón Strategy**: Implementación clean del patrón de diseño
- 🔒 **Validaciones Robustas**: Validación de formularios con feedback en tiempo real
- ⚠️ **Manejo de Errores**: Simulación de diferentes escenarios de error
- 🎨 **UI Moderna**: Interfaz responsive con feedback visual
- 🧪 **Testing Completo**: Tests unitarios para todas las estrategias
- 🏗️ **Arquitectura Angular Moderna**: Standalone components y Signals

## 🛠️ Tecnologías Implementadas

### Frontend Framework

- **Angular 20.3.0** - Framework principal
- **TypeScript 5.9.2** - Tipado estático
- **Angular Standalone Components** - Arquitectura moderna sin NgModules
- **Angular Signals** - Gestión de estado reactiva

### Herramientas de Desarrollo

- **Angular CLI 20.3.2** - Tooling y scaffolding
- **Karma + Jasmine** - Testing framework
- **Prettier** - Formateo de código
- **ESLint** - Linting y calidad de código

### Patrones de Diseño

- **Strategy Pattern** - Para métodos de pago
- **Dependency Injection** - Para servicios
- **Observer Pattern** - Vía RxJS para eventos

## 🏗️ Arquitectura

```
src/app/
├── strategies/
│   ├── payment-strategy.ts          # Interface Strategy
│   ├── card-payment.strategy.ts     # Concrete Strategy: Tarjeta
│   ├── paypal-payment.strategy.ts   # Concrete Strategy: PayPal
│   └── crypto-payment.strategy.ts   # Concrete Strategy: Crypto
├── validators/
│   └── payment-validator.service.ts # Validaciones de datos
├── payment/
│   ├── payment.component.ts         # Componente UI
│   ├── payment.component.html       # Template
│   └── payment.component.css        # Estilos
├── payment-context.ts               # Context del Strategy Pattern
└── app.component.ts                 # Componente raíz
```

## 🎯 Patrón Strategy Implementado

### 1. Strategy Interface

```typescript
export interface PaymentStrategy {
  pay(amount: number, data: any): Promise<PaymentResult>;
}
```

### 2. Concrete Strategies

- **`CardPaymentStrategy`** - Procesa pagos con tarjeta
- **`PaypalPaymentStrategy`** - Procesa pagos con PayPal
- **`CryptoPaymentStrategy`** - Procesa pagos con criptomonedas

### 3. Context Service

```typescript
@Injectable({ providedIn: 'root' })
export class PaymentContextService {
  setStrategy(strategy: PaymentStrategy): void;
  pay(amount: number, data: any): Promise<PaymentResult>;
}
```

## 🔧 Instalación y Desarrollo

### Prerequisitos

- Node.js 18+
- npm 9+
- Angular CLI 20+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/By-JesusMore/t1_SolWeb_PDStrategy.git
cd t1_SolWeb_PDStrategy

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start
# o
ng serve

# La aplicación estará disponible en http://localhost:4200/
```

### Testing

```bash
# Ejecutar tests unitarios
npm test
# o
ng test

# Ejecutar tests con coverage
ng test --code-coverage

# Ejecutar tests en modo watch
ng test --watch=true
```

### Build

```bash
# Build para producción
npm run build
# o
ng build --configuration=production

# Build para desarrollo
ng build --configuration=development
```

## 🧪 Testing

El proyecto incluye tests comprehensivos para:

- ✅ **Strategy Pattern**: Tests para cada estrategia de pago
- ✅ **PaymentContext Service**: Tests del contexto principal
- ✅ **Validaciones**: Tests para todas las validaciones de datos
- ✅ **Componentes**: Tests de comportamiento UI

### Cobertura de Tests

- Estrategias de pago: 100%
- Servicios: 100%
- Validadores: 100%
- Componentes: 95%

## 🔒 Validaciones Implementadas

### Validación de Monto

- ✅ Monto mayor a 0
- ✅ Límite máximo de S/10,000

### Validación de Tarjeta

- ✅ Nombre requerido (mín. 2 caracteres)
- ✅ Número de tarjeta (algoritmo de Luhn)
- ✅ Fecha de expiración válida
- ✅ CVV de 3-4 dígitos

### Validación de PayPal

- ✅ Email válido y requerido
- ✅ Formato de email correcto

### Validación de Criptomonedas

- ✅ Dirección de wallet requerida
- ✅ Longitud válida (26-62 caracteres)
- ✅ Caracteres alfanuméricos únicamente

## ⚠️ Manejo de Errores

La aplicación simula diferentes escenarios de error:

### Tarjeta de Crédito

- 🔴 Transacciones rechazadas (5% aleatorio)
- 🔴 Fondos insuficientes (montos > S/5,000)
- 🔴 Validaciones de formato

### PayPal

- 🔴 Cuentas no verificadas
- 🔴 Límites diarios (montos > S/3,000)
- 🔴 Validaciones de email

### Criptomonedas

- 🔴 Red blockchain congestionada (10% aleatorio)
- 🔴 Wallets sin fondos
- 🔴 Costos de gas altos (montos > S/2,000)

## 🎨 Características UI/UX

- 📱 **Responsive Design**: Adaptable a móviles y desktop
- 🎯 **Feedback Visual**: Indicadores de error y éxito
- ⏳ **Estados de Loading**: Feedback durante procesamiento
- 🔄 **Formateo Automático**: Números de tarjeta y fechas
- 🎨 **Tema Moderno**: Colores y animaciones suaves

## 📊 Scripts NPM Disponibles

```bash
npm start          # Servidor de desarrollo
npm test           # Tests unitarios
npm run build      # Build de producción
npm run watch      # Build con watch mode
npm run lint       # Linting del código
npm run format     # Formatear código con Prettier
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Miguel** - [@By-JesusMore](https://github.com/By-JesusMore)

---

**⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!**

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
