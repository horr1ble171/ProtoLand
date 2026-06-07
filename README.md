# ProtoLand — Интерактивный шаблон лендинга

**ProtoLand** — это демонстрационный шаблон лендинга, который позволяет заказчику в реальном времени изучить возможности будущего сайта: переключать цветовые схемы (светлая/тёмная, акцентные цвета), просматривать типовую структуру секций и примеры контента.

## Возможности

- 🎨 **Переключение тем** — светлая/тёмная тема и выбор акцентного цвета (красный, зелёный, синий)
- 📱 **Адаптивность** — корректное отображение от 320px до 1920px
- ⚡ **Производительность** — Lighthouse Performance ≥ 90
- ♿ **Доступность** — семантическая вёрстка, WCAG AA
- 🚀 **Технологии** — Astro, TypeScript, TailwindCSS

## Установка и запуск

```bash
npm install
npm run dev
```

Сборка статики:

```bash
npm run build
```

## Структура проекта

```
src/
├── components/
│   ├── common/        # Header, Footer, Container
│   ├── sections/      # Hero, Features, Testimonials, Form
│   ├── ThemeSwitcher/ # Логика смены темы
│   └── UI/            # Button, Card, Accordion, Tabs
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── styles/
│   ├── global.css
│   └── themes.css
└── utils/
    └── themeStore.ts
```