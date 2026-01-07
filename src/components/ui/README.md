# GlowCard (Spotlight Card) Component

A beautiful React component that creates an interactive spotlight effect following your mouse cursor.

## Features

- ✨ Mouse-tracking spotlight effect
- 🎨 Multiple color variants (blue, purple, green, red, orange)
- 📐 Flexible sizing options
- 🎯 Custom size support
- 🔧 Easy to integrate

## Usage

### Basic Usage

```jsx
import { GlowCard } from '@/components/ui/spotlight-card';

function MyComponent() {
  return (
    <GlowCard>
      <h2>Your Content Here</h2>
      <p>Add any content inside the card</p>
    </GlowCard>
  );
}
```

### With Different Colors

```jsx
<GlowCard glowColor="blue">Blue Spotlight</GlowCard>
<GlowCard glowColor="purple">Purple Spotlight</GlowCard>
<GlowCard glowColor="green">Green Spotlight</GlowCard>
<GlowCard glowColor="red">Red Spotlight</GlowCard>
<GlowCard glowColor="orange">Orange Spotlight</GlowCard>
```

### Custom Sizing

```jsx
// Use predefined sizes
<GlowCard size="sm">Small Card</GlowCard>
<GlowCard size="md">Medium Card</GlowCard>
<GlowCard size="lg">Large Card</GlowCard>

// Custom dimensions
<GlowCard customSize={true} width="400px" height="500px">
  Custom Size Card
</GlowCard>

// Using className for full control
<GlowCard customSize={true} className="w-full h-96">
  Full Width Card
</GlowCard>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to display inside the card |
| `className` | string | `''` | Additional CSS classes |
| `glowColor` | `'blue' \| 'purple' \| 'green' \| 'red' \| 'orange'` | `'blue'` | Color of the spotlight effect |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Predefined size (ignored if customSize is true) |
| `width` | string \| number | - | Custom width (requires customSize=true) |
| `height` | string \| number | - | Custom height (requires customSize=true) |
| `customSize` | boolean | `false` | Enable custom sizing (ignores size prop) |

## Examples in Your App

### Integrated with ProductCard

The GlowCard is already integrated with your ProductCard component:

```jsx
// src/components/ProductCard.jsx
<GlowCard glowColor="blue" customSize={true} className="product-card-modern neon-card">
  {/* Product content */}
</GlowCard>
```

### Demo Page

Visit `/demo` route to see all color variants in action!

## How It Works

1. **Mouse Tracking**: Listens to mouse movement across the entire screen
2. **CSS Variables**: Updates CSS custom properties with mouse coordinates
3. **Radial Gradients**: Creates dynamic spotlight effects using CSS radial gradients
4. **Before/After Pseudo-elements**: Uses `::before` and `::after` for layered glow effects

## Browser Support

Works in all modern browsers that support:
- CSS Custom Properties
- CSS Masks
- Radial Gradients
- Pointer Events

## Performance Notes

- Uses `will-change` for optimized animations
- Single event listener for all cards
- GPU-accelerated with `backdrop-filter`

## Customization Tips

1. **Adjust Spotlight Size**: Modify `--size` CSS variable (default: 200)
2. **Change Glow Intensity**: Adjust opacity values in the component
3. **Border Width**: Modify `--border` variable (default: 3)
4. **Corner Radius**: Change `--radius` variable (default: 14)

## Integration Steps Completed

✅ Created `/components/ui` folder structure  
✅ Converted TypeScript component to JavaScript  
✅ Added path alias (`@`) to vite.config.js  
✅ Integrated with ProductCard component  
✅ Created demo page at `/demo` route  
✅ No external dependencies required  

## Notes

- **No TypeScript Required**: Component has been converted to JavaScript
- **No Tailwind CSS Required**: Uses inline styles for maximum compatibility
- **No External Dependencies**: Pure React implementation
- **Works with Your Existing CSS**: Integrates seamlessly with your neon/gaming theme
