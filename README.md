# SalesNexus Backend

Sistema de gestión de ventas y facturación desarrollado con Flask y SQLAlchemy.

## Requisitos

- Python 3.8 o superior
- Poetry 2.1.2 o superior

## Instalación

1. Instalar Poetry (si no está instalado):
```bash
pip install poetry==2.1.2
```

2. Clonar el repositorio:
```bash
git clone <repository-url>
cd salesnexus
```

3. Instalar dependencias:
```bash
poetry install
```

4. Activar el entorno virtual:
```bash
poetry shell
```

## Comandos de Desarrollo

Poetry proporciona varios comandos útiles para el desarrollo:

### Servidor de Desarrollo
- `poetry run start` - Iniciar servidor Flask
- `poetry run dev` - Iniciar servidor Flask en modo debug

### Base de Datos
- `poetry run db-init` - Inicializar las migraciones
- `poetry run db-migrate` - Crear una nueva migración
- `poetry run db-upgrade` - Aplicar migraciones pendientes
- `poetry run db-downgrade` - Revertir última migración

### Testing y Calidad de Código
- `poetry run test` - Ejecutar tests
- `poetry run check` - Ejecutar tests con cobertura
- `poetry run format` - Formatear código con black
- `poetry run lint` - Verificar código con flake8
- `poetry run sort-imports` - Ordenar imports con isort

### Gestión de Dependencias
- `poetry add <package>` - Añadir nueva dependencia
- `poetry add -D <package>` - Añadir dependencia de desarrollo
- `poetry remove <package>` - Eliminar dependencia
- `poetry update` - Actualizar dependencias
- `poetry show` - Listar dependencias instaladas

## Estructura del Proyecto

```
backend/
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── extensions.py
│   ├── models/
│   ├── api/
│   ├── schemas/
│   └── utils/
├── tests/
├── migrations/
├── instance/
├── pyproject.toml
└── README.md
```

## Desarrollo

1. Activar el entorno virtual:
```bash
poetry shell
```

2. Iniciar el servidor de desarrollo:
```bash
poetry run dev
```

3. Para ejecutar los tests:
```bash
poetry run test
```

4. Antes de hacer commit:
```bash
poetry run format  # formatear código
poetry run lint    # verificar estilo
poetry run test    # ejecutar tests
```

## Notas Importantes

- Siempre usar `poetry run` para ejecutar comandos dentro del entorno virtual
- Mantener las dependencias actualizadas con `poetry update`
- Seguir las guías de estilo del proyecto (Black + Flake8)
- Ejecutar los tests antes de hacer commit 