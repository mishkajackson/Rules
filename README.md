# Proxy Rules Repository

Этот репозиторий содержит правила, конфигурации, скрипты и геоданные для популярных прокси-клиентов: Mihomo (Clash-Meta), Stash, Sing-Box и Shadowrocket.

## Структура репозитория

- **`Mihomo`** — Правила и конфигурации для Mihomo (ранее Clash):
  - `Domains` — YAML-файлы с доменами, организованными по категориям.
  - `IPs` — YAML-файлы с IP-адресами, организованными по категориям
  - `Templates` — Шаблоны конфигураций.
- **`Geodata`** — Файлы геоданных (GeoIP, GeoSite) для всех клиентов.
- **`Shadowrocket`** — Правила для Shadowrocket.
- **`Sing-Box`** — Правила и конфигурации для Sing-Box.
- **`Stash`** — Правила и скрипты для Stash:
  - `Override` — Переопределения:
    - `AD` — Блокировка рекламы.
    - `DNS` — Настройки DNS.
    - `Scripts` — Скрипты для переопределений.
    - `Tiles` — Модули или настройки интерфейса.
  - `Scripts` — Общие скрипты для Stash.

## Как использовать

1. **Склонируйте репозиторий**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git