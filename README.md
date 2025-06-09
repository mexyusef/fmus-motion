# FMUS-Motion

> Delightful animation utilities for Framer Motion

FMUS-Motion (pronounced "famous motion") is an animation library that wraps Framer Motion with nicer APIs.

Designed for developers who value both productivity and creative expression.

## 🌟 Features

- **Human-Oriented**: APIs designed for how humans think, not how computers work
- **Terse but Expressive**: Maximum impact with minimum code
- **Joyful DX**: Surprise and delight in every interaction
- **Adaptive**: Works beautifully across devices and motion preferences
- **Composable**: Small pieces that combine powerfully

## 📦 Installation

```bash
# npm
npm install fmus-motion framer-motion

# yarn
yarn add fmus-motion framer-motion

# pnpm
pnpm add fmus-motion framer-motion
```

## 🚀 Quick Start

```jsx
import { FadeIn, Slide, Bop } from 'fmus-motion';

function App() {
  return (
    <div>
      <FadeIn>
        <h1>Welcome!</h1>
      </FadeIn>

      <Slide from="left" distance={30}>
        <p>This content slides in</p>
      </Slide>

      <Bop scale={1.05}>
        <button>Interactive Button</button>
      </Bop>
    </div>
  );
}
```

## 📋 Components API

### `<FadeIn>`

Fade elements in with smooth opacity transitions.

```jsx
<FadeIn
  delay={0.2}
  duration={0.5}
  ease="gentle"
  from={0}
  to={1}
>
  {children}
</FadeIn>
```

### `<Slide>`

Slide elements in from any direction.

```jsx
<Slide
  from="left" // "left", "right", "top", "bottom"
  distance={50} // px
  spring={true} // use spring physics
  bounce={0.25} // spring bounce
>
  {children}
</Slide>
```

### `<Bop>`

Create elements that respond to hover and tap with scale and rotation.

```jsx
<Bop
  scale={1.05} // hover scale
  rotate={2} // slight rotation on hover
  tapScale={0.95} // scale on tap
  duration={0.15}
>
  {children}
</Bop>
```

## 🪝 Hooks API

### `useScrollReveal()`

Trigger animations when elements scroll into view.

```jsx
const ref = useScrollReveal({
  threshold: 0.1, // % of element visible
  once: true, // only animate once
  animation: {
    opacity: [0, 1],
    y: [20, 0]
  }
});

return <div ref={ref}>Appears on scroll</div>;
```

### Coming Soon

- `useHoverFlip()` - 3D flip effect on hover
- `useDragToDismiss()` - Swipe to dismiss elements
- `useParallax()` - Parallax scrolling effects

## ⚙️ Configuration

### `<MotionConfig>`

Set global configuration and defaults for all FMUS components.

```jsx
<MotionConfig
  reducedMotion="user-preference" // "user-preference", "always", "never"
  debug={false} // show debug outlines
  defaults={{
    transition: {
      duration: 0.3,
      ease: "gentle"
    }
  }}
>
  {children}
</MotionConfig>
```

## 🔧 Utilities

FMUS-Motion includes useful utility functions:

```jsx
// Accessibility
import { usePrefersReducedMotion } from 'fmus-motion';
const prefersReducedMotion = usePrefersReducedMotion();

// Animation helpers
import { createTransition } from 'fmus-motion';
const transition = createTransition(0.3, 'pop', 0, 1);
```

## 📱 Accessibility

FMUS-Motion automatically respects user preferences for reduced motion:

- Honors the `prefers-reduced-motion` media query
- Provides graceful fallbacks when animations are disabled
- Maintains content visibility when motion is reduced

## 🔎 Debugging

Enable debug mode to visualize animation components:

```jsx
<MotionConfig debug={true}>
  {/* All FMUS components will show outlines */}
</MotionConfig>

// Or enable for a single component
<FadeIn debug={true}>...</FadeIn>
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a PR.

## 📄 License

MIT
