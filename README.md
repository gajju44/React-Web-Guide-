# React Web Guide 

**React Web Guide** is a customizable, interactive website tour component for React applications. Guide users through your app with engaging, cursor-based tours to enhance onboarding and user experience.

[![npm version](https://img.shields.io/npm/v/@gajendra-naphade/react-web-guide.svg)](https://www.npmjs.com/package/@gajendra-naphade/react-web-guide)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/gajju44/React-Web-Guide)](https://github.com/gajju44/React-Web-Guide/issues)

---

## Table of Contents

- [Features ](#features)
- [Demo ](#demo)
- [Installation ](#installation)
- [Quick Start ](#quick-start)
- [Props Documentation ](#props-documentation)
- [Example Usage ](#example-usage)
- [Contributing ](#contributing)
- [License ](#license)
- [Support ](#support)

---

## Features

-  **Interactive Tours**: Cursor-driven navigation for intuitive user guidance.
-  **Customizable Styling**: Match your app's branding with ease.
-  **Responsive Design**: Seamless experience on desktop and mobile.
-  **Progress Tracking**: Clear indicators to show tour progress.
-  **Smooth Animations**: Fluid transitions for a polished look.
-  **Minimizable UI**: Compact interface to save screen space.
-  **Modern UI**: Beautiful default design with gradient effects.
-  **React version Support**: Supports React version >=16.

Ideal for **user onboarding**, **feature showcases**, and **guided tutorials** in Web apps.

---

## Demo

See **React Web Guide** in action:

![React Web Guide Demo](https://i.postimg.cc/c4tdCfDN/NewGuide.gif)

---

## Installation

Install **React Web Guide** via npm, Yarn or pnpm :

```bash
npm install @gajendra-naphade/react-web-guide
```

```bash
yarn add @gajendra-naphade/react-web-guide
```
```bash
pnpm add @gajendra-naphade/react-web-guide
```
---

## Quick Start

Get started in minutes:

```jsx
import TourGuide from '@gajendra-naphade/react-web-guide';
import '@gajendra-naphade/react-web-guide/dist/styles.css';
import { useRef } from 'react';

function App() {
  const buttonRef = useRef(null);
  const tourSteps = [
    {
      ref: buttonRef,
      name: "Guide",
      color: "black",
      message: "This is the header section of your page",
      offsetX: 0,
      offsetY: 0,
      CursorMessageGap:10,
    },
    // Add more steps
  ];

  return (
    <div>
      <button ref={buttonRef}>Start</button>
      <TourGuide
        steps={tourSteps}
        onComplete={() => console.log('Tour completed!')}
      />
    </div>
  );
}
```

---

## Props Documentation

Customize **React Web Guide** with these props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | Array | `[]` | Array of tour steps (required) |
| `onComplete` | Function | - | Callback when tour completes |
| `startButtonText` | String | "Start Tour" | Text for the start button |
| `skipButtonText` | String | "Skip Tour" | Text for the skip button |
| `minimizedStartText` | String | "Start" | Text for minimized start button |
| `minimizedSkipText` | String | "Skip" | Text for minimized skip button |
| `showProgress` | Boolean | `true` | Show/hide progress indicator |
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
| `CustomCursorClass` | String | `null` | CSS classes for custom cursor |
| `messageBoxStyle` | Object | `{}` | Custom styles for message box |
| `cursorStyle` | Object | `{}` | Custom styles for cursor |
| `nextButtonText` | String | "Next →" | Text for next button |
| `nextButtonContinueText` | String | "Continue" | Text for continue button |
| `nextButtonClassName` | String | - | CSS classes for next button |
| `nextButtonStyle` | Object | `{}` | Custom styles for next button |
| `Theme` | String | "Light" | Theme for the tour ("Light" or "Dark") |
| `Minimized` | Boolean | `true` | Whether to start in minimized state |
| `showTooltip` | Boolean | `true` | Show/hide the start tooltip |
| `messageClass` | String | - | CSS classes for the message box |


### Step Object Structure

```typescript
interface Step {
  ref: React.RefObject<HTMLElement>; // Target element reference
  name: string;                     // Cursor display name
  message: string;                  // Tour message
  color?: string;                   // Cursor color
  offsetX?: number;                 // X offset for cursor
  offsetY?: number;                 // Y offset for cursor
  CursorMessageGap?: number;        // Gap between cursor and message(in pixels "px")
}
```

---

## Example Usage

```jsx
import { useRef } from 'react';
import TourGuide from '@gajendra-naphade/react-web-guide';
import '@gajendra-naphade/react-web-guide/dist/styles.css';

function App() {
  const buttonRef = useRef(null);
  const featureRef = useRef(null);
  const settingsRef = useRef(null);

  const tourSteps = [
    {
      ref: buttonRef,
      name: "Welcome",
      message: "Start your journey here!",
      color: "#ff6b6b",
      CursorMessageGap: 10
    },
    {
      ref: featureRef,
      name: "Features",
      message: "Explore our amazing features!",
      color: "#4CAF50",
      offsetX: 20,
      offsetY: 10
    },
    {
      ref: settingsRef,
      name: "Settings",
      message: "Customize your experience here",
      color: "#2196F3",
      CursorMessageGap: 15
    }
  ];

  return (
    <div>
      <button ref={buttonRef}>Start</button>
      <div ref={featureRef}>Features</div>
      <div ref={settingsRef}>Settings</div>
      <TourGuide
        steps={tourSteps}
        onComplete={() => console.log('Tour completed!')}
        startButtonText="Begin Tour"
        skipButtonText="End Tour"
        minimizedStartText="Start"
        minimizedSkipText="Skip"
        showProgress={true}
        Theme="Dark"
        Minimized={true}
        showTooltip={true}
        buttonPosition={{
          bottom: '2rem',
          right: '2rem'
        }}
        messageClass="custom-message"
        nextButtonText="Next Step"
        nextButtonContinueText="Continue"
        nextButtonClassName="custom-next-button"
      />
    </div>
  );
}
```

---

## Contributing

We welcome contributions! To get started:

1. Fork the repo.
2. Create a branch (`git checkout -b feature/YourFeature`).
3. Commit changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request

---

## License

[MIT License](https://github.com/gajju44/React-Web-Guide/blob/main/License.md) - Use **React Web Guide** freely in your projects!

---

## Support

-  Report bugs: [GitHub Issues](https://github.com/gajju44/React-Web-Guide/issues)
-  Email: [gajendra44.connect@gmail.com](mailto:gajendra44.connect@gmail.com) 

---

Made with ❤️ by [Gajendra Naphade](https://gajendra-naphade.vercel.app/)

---