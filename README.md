# React Web Guide 🚀

A beautiful and customizable website tour guide component for React applications. Help your users navigate through your website with an interactive and engaging tour experience.

## Features ✨

- 🎯 Interactive cursor-based tour guide
- 🎨 Fully customizable styling
- 📱 Responsive design
- 🔄 Progress tracking
- ⚡ Smooth animations
- 🎭 Minimizable interface
- 🎮 Keyboard navigation support
- 🌈 Beautiful default UI with gradient effects

## Installation 📦

```bash
npm i @gajendra-naphade/react-web-guide

```

## Quick Start 🚀

```jsx
import { TourGuide } from 'react-web-guide';
import '@gajendra-naphade/react-web-guide/dist/styles.css';

function App() {
  const tourSteps = [
    {
      ref: buttonRef,
      name: "Welcome",
      message: "Click here to start your journey!",
      color: "#ff6b6b"
    },
    // Add more steps...
  ];

  return (
    <TourGuide 
      steps={tourSteps}
      onComplete={() => console.log('Tour completed!')}
    />
  );
}
```

## Props Documentation 📚

### TourGuide Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | Array | `[]` | Array of tour steps (required) |
| `onComplete` | Function | - | Callback when tour completes |
| `startButtonText` | String | "Start Tour" | Text for the start button |
| `skipButtonText` | String | "Skip Tour" | Text for the skip button |
| `minimizedStartText` | String | "Start" | Text for minimized start button |
| `minimizedSkipText` | String | "Skip" | Text for minimized skip button |
| `showProgress` | Boolean | `true` | Show/hide progress indicator |
| `ProgressTheme` | String | "Light" | Progress theme ("Light" or "Dark") |
| `buttonPosition` | Object | `{ bottom: '1.5rem', right: '1.5rem' }` | Position of the control button |
| `expandedButtonClassName` | String | - | CSS classes for expanded button |
| `minimizedButtonClassName` | String | - | CSS classes for minimized button |
| `buttonStyle` | Object | `{}` | Custom styles for buttons |
| `CloseButtonText` | ReactNode | `<X size={16} />` | Close button content |
| `ExpandButtonText` | ReactNode | `<Maximize2 size={16} />` | Expand button content |
| `minimizedButtonStyle` | Object | - | Styles for minimized button |
| `closeButtonClassName` | String | - | CSS classes for close button |
| `expandButtonClassName` | String | - | CSS classes for expand button |
| `closeButtonStyle` | Object | `{}` | Custom styles for close button |
| `expandButtonStyle` | Object | `{}` | Custom styles for expand button |
| `cursorImage` | String | `null` | Custom cursor image URL |
| `messageBoxStyle` | Object | `{}` | Custom styles for message box |
| `cursorStyle` | Object | `{}` | Custom styles for cursor |
| `nextButtonText` | String | "Next →" | Text for next button |
| `nextButtonContinueText` | String | "Continue" | Text for continue button |
| `nextButtonClassName` | String | - | CSS classes for next button |
| `nextButtonStyle` | Object | `{}` | Custom styles for next button |

### Step Object Structure

```typescript
interface Step {
  ref: React.RefObject<HTMLElement>;  // Reference to the target element
  name: string;                       // Name shown in the cursor
  message: string;                    // Message to display
  color?: string;                     // Custom color for the cursor
  offsetX?: number;                   // Custom X offset for cursor position
  offsetY?: number;                   // Custom Y offset for cursor position
}
```

## Example Usage 🎯

```jsx
import { useRef } from 'react';
import { TourGuide } from 'react-web-guide';
import '@gajendra-naphade/react-web-guide/dist/styles.css';

function App() {
  const buttonRef = useRef(null);
  const featureRef = useRef(null);
  const settingsRef = useRef(null);

  const tourSteps = [
    {
      ref: buttonRef,
      name: "Welcome",
      message: "Click here to start your journey!",
      color: "#ff6b6b"
    },
    {
      ref: featureRef,
      name: "Features",
      message: "Discover our amazing features!",
      color: "#4CAF50"
    },
    {
      ref: settingsRef,
      name: "Settings",
      message: "Customize your experience here.",
      color: "#2196F3"
    }
  ];

  return (
    <div>
      <button ref={buttonRef}>Start</button>
      <div ref={featureRef}>Features Section</div>
      <div ref={settingsRef}>Settings Section</div>

      <TourGuide 
        steps={tourSteps}
        onComplete={() => console.log('Tour completed!')}
        startButtonText="Begin Tour"
        showProgress={true}
        ProgressTheme="Dark"
      />
    </div>
  );
}
```

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

MIT License - feel free to use this component in your projects!

---

Made with ❤️ by [Gajendra-Naphade]
