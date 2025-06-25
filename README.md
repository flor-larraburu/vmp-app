# TFG VMP Backend Monorepo

![Project Banner](https://user-images.githubusercontent.com/tu_usuario/tu_imagen.png)

---

## 📚 Descripción

Este repositorio contiene el backend monorepo para el proyecto TFG Vehículos de Movilidad Personal (VMP). Está organizado en múltiples servicios y librerías para manejar la ingesta de datos, procesamiento y API REST, utilizando NestJS y Kafka para comunicación eficiente basada en eventos.

---

## 🚀 Arquitectura General

- **Monorepo** organizado con [npm workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces)
- Backend dividido en microservicios:
  - `api-gateway`: API REST para consumo de datos y gestión.
  - `ingestion-service`: Servicio que escucha eventos de Kafka y procesa señales.
  - `analytics-service`: Servicio que genera estadísticas y métricas agregadas.
- Librerías compartidas en `libs/`:
  - `kafka`: Código para interactuar con Kafka (productores y consumidores).
  - `domain`: Modelos y lógica de negocio común.
- Base de datos PostgreSQL y almacenamiento de series temporales en InfluxDB (configuración externa).

---

## 🛠️ Tecnologías

- [NestJS](https://nestjs.com/) (framework backend)
- [KafkaJS](https://kafka.js.org/) (cliente Kafka)
- Docker + Docker Compose (para levantar Kafka y Zookeeper)
- PostgreSQL e InfluxDB (base de datos y almacenamiento temporal)
- TypeScript (tipado estático y seguridad)
- npm workspaces (monorepo)

---

## 📦 Estructura del proyecto

```plaintext
tfg-vmp-backend/
├── apps/
│   ├── api-gateway/         # API REST
│   ├── ingestion-service/   # Servicio de ingesta desde Kafka
│   └── analytics-service/   # Servicio de análisis y estadísticas
├── libs/
│   ├── kafka/               # Lógica Kafka compartida
│   └── domain/              # Modelos y lógica común
├── docker/
│   └── kafka/               # Kafka + Zookeeper Docker Compose
├── package.json             # Workspaces & scripts
└── README.md
```

# ⚡️ Primeros pasos: Configurar entorno local

## 1. Clona el repositorio

```bash
git clone https://github.com/tu_usuario/tfg-vmp-backend.git
cd tfg-vmp-backend
```

## 2. Instala dependencias

```bash
npm install
```

Esto instalará dependencias en todos los workspaces (apps y libs).

## 3. Levanta Kafka y Zookeeper con Docker Compose

```bash
docker-compose -f docker/kafka/docker-compose.yml up -d
```

Verifica que los contenedores estén corriendo:

```bash
docker ps
```

# 🚀 Ejecutar los servicios

En terminales separadas puedes iniciar cada app con:

```bash
npm run start:api-gateway
npm run start:ingestion
npm run start:analytics
```

# 🧩 Uso de Kafka

- Los servicios usan la librería `libs/kafka` para producir y consumir eventos.
- Los topics se crean automáticamente o se configuran en `docker-compose`.
- La comunicación entre servicios es asíncrona y basada en eventos Kafka.

# 🛠 Desarrollo

- Modifica código en las carpetas `apps/` para lógica de negocio y controladores.
- Modifica o crea utilidades en `libs/` para código compartido.
- Cada app puede tener sus propias dependencias y scripts (`package.json` dentro de cada app).
- Usa `npm run build` para construir todo el monorepo.

# 🧪 Tests

Ejecuta tests para todos los paquetes con:

```bash
npm run test
```

# 🐳 Docker y despliegue

- Puedes dockerizar cada app creando Dockerfiles específicos.
- Usa Kubernetes o cualquier orquestador para desplegar los servicios y Kafka.
- Configura variables de entorno para conexiones a Kafka y bases de datos.

# 📚 Recursos y documentación

- [NestJS Docs](https://docs.nestjs.com/)
- [KafkaJS Docs](https://kafka.js.org/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [InfluxDB](https://docs.influxdata.com/)

# 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para nuevas funcionalidades o bugs, abre un issue o pull request.

# 📄 Licencia

MIT License © 2025 Tu Nombre
