# EIT Icons Web Component

This package provides a web component for displaying EIT icons with various styling options.

## Installation

### Using npm

```bash
npm install @EIT-Digital-Alumni/eit-icons
```

### Using GitHub Packages

If you're using GitHub Packages, you'll need to authenticate with GitHub:

1. Create a Personal Access Token (PAT) with the `read:packages` scope.
2. Configure npm to use your PAT:

```bash
npm login --registry=https://npm.pkg.github.com --scope=@EIT-Digital-Alumni
```

3. Install the package:

```bash
npm install @EIT-Digital-Alumni/eit-icons
```

## Usage

### Import in JavaScript

There are multiple ways to import the component:

#### ES Modules (Recommended)

```javascript
import '@EIT-Digital-Alumni/eit-icons';

// Or if you want to access the component class
import { EitIcons } from '@EIT-Digital-Alumni/eit-icons';
```

#### CommonJS

```javascript
const EitIcons = require('@EIT-Digital-Alumni/eit-icons');
```

#### Browser with CDN

```html
<script type="module" src="https://unpkg.com/@EIT-Digital-Alumni/eit-icons"></script>
```

### Using the Component

Once imported, you can use the component in your HTML:

```html
<!-- Basic usage -->
<eit-icons name="add_user"></eit-icons>

<!-- With circle and background color -->
<eit-icons name="book" with-circle background="red"></eit-icons>
```

## Asset layout and path resolution

This package ships SVGs as separate files so only the icons you use are requested by the browser.

Where the icons live after install:
- Package source: icons/<name>.svg
- Distributed bundle: dist/icons/<name>.svg (copied automatically on build/publish)

How the component finds icons:
- In module/bundler environments, the component derives the icon URL relative to the JS file using import.meta.url, resolving to dist/icons/<name>.svg next to the distributed bundle.
- When loaded via a script tag/CDN, icons are resolved relative to the script URL so the CDN path must expose an icons folder next to the distributed file (dist/icons in this package). Public CDNs like unpkg and jsDelivr serve these files as long as the package includes them.

If your app build doesn't copy static files by default:
- Ensure node_modules/@EIT-Digital-Alumni/eit-icons/dist/icons is included in your app's final assets.
- Optionally configure an alias for direct references if needed (not required for the component itself):

Vite example:
```js
// vite.config.js
export default {
  resolve: {
    alias: {
      '@EIT-Digital-Alumni/eit-icons/icons':
        '/node_modules/@EIT-Digital-Alumni/eit-icons/dist/icons'
    }
  }
}
```

Webpack example:
```js
// webpack.config.js
const path = require('path');
module.exports = {
  resolve: {
    alias: {
      '@EIT-Digital-Alumni/eit-icons/icons':
        path.resolve(__dirname, 'node_modules/@EIT-Digital-Alumni/eit-icons/dist/icons')
    }
  }
};
```

## Attributes

The component supports the following attributes:

| Attribute | Description | Default |
|---|---|---|
| `name` | Name of the icon to display (required) | - |
| `with-circle` | If present, adds a circle behind the icon | - |
| `background` | Color of the circle (when `with-circle` is present) | currentColor |

If the `with-circle` attribute is set, the circle class will be filled with the background color, and the icon color will be set to white.

If `with-circle` is not set, the icon will be scaled up by 1.5x and the circle will be hidden.

## Available Icons

| Icon Name | Icon |
|---|---|
| add_user | <img src="src/icons/add_user.svg" width="32"/> |
| arrows_both_ways | <img src="src/icons/arrows_both_ways.svg" width="32"/> |
| atom | <img src="src/icons/atom.svg" width="32"/> |
| bar_chart | <img src="src/icons/bar_chart.svg" width="32"/> |
| battery_charging | <img src="src/icons/battery_charging.svg" width="32"/> |
| book | <img src="src/icons/book.svg" width="32"/> |
| brainstorming_idea_exchange | <img src="src/icons/brainstorming_idea_exchange.svg" width="32"/> |
| cable | <img src="src/icons/cable.svg" width="32"/> |
| camera | <img src="src/icons/camera.svg" width="32"/> |
| chart | <img src="src/icons/chart.svg" width="32"/> |
| chart_globe | <img src="src/icons/chart_globe.svg" width="32"/> |
| chart_presentation | <img src="src/icons/chart_presentation.svg" width="32"/> |
| chat | <img src="src/icons/chat.svg" width="32"/> |
| chat_symbol | <img src="src/icons/chat_symbol.svg" width="32"/> |
| clock | <img src="src/icons/clock.svg" width="32"/> |
| coin_and_shield | <img src="src/icons/coin_and_shield.svg" width="32"/> |
| computer_monitor | <img src="src/icons/computer_monitor.svg" width="32"/> |
| computer_mouse | <img src="src/icons/computer_mouse.svg" width="32"/> |
| control_panel | <img src="src/icons/control_panel.svg" width="32"/> |
| currency_exchange | <img src="src/icons/currency_exchange.svg" width="32"/> |
| delete_user | <img src="src/icons/delete_user.svg" width="32"/> |
| direction_arrows_circle | <img src="src/icons/direction_arrows_circle.svg" width="32"/> |
| drop | <img src="src/icons/drop.svg" width="32"/> |
| flag | <img src="src/icons/flag.svg" width="32"/> |
| flask | <img src="src/icons/flask.svg" width="32"/> |
| flowchart | <img src="src/icons/flowchart.svg" width="32"/> |
| folder | <img src="src/icons/folder.svg" width="32"/> |
| gear | <img src="src/icons/gear.svg" width="32"/> |
| gears | <img src="src/icons/gears.svg" width="32"/> |
| globe | <img src="src/icons/globe.svg" width="32"/> |
| graduation_cap | <img src="src/icons/graduation_cap.svg" width="32"/> |
| group_people | <img src="src/icons/group_people.svg" width="32"/> |
| head_with_bolt | <img src="src/icons/head_with_bolt.svg" width="32"/> |
| headphones | <img src="src/icons/headphones.svg" width="32"/> |
| heart_health | <img src="src/icons/heart_health.svg" width="32"/> |
| hourglass | <img src="src/icons/hourglass.svg" width="32"/> |
| id_card | <img src="src/icons/id_card.svg" width="32"/> |
| leaf | <img src="src/icons/leaf.svg" width="32"/> |
| led | <img src="src/icons/led.svg" width="32"/> |
| light_bulb | <img src="src/icons/light_bulb.svg" width="32"/> |
| looping_arrows | <img src="src/icons/looping_arrows.svg" width="32"/> |
| mail | <img src="src/icons/mail.svg" width="32"/> |
| meeting | <img src="src/icons/meeting.svg" width="32"/> |
| megaphone | <img src="src/icons/megaphone.svg" width="32"/> |
| mind_setting | <img src="src/icons/mind_setting.svg" width="32"/> |
| mobile_phone | <img src="src/icons/mobile_phone.svg" width="32"/> |
| network | <img src="src/icons/network.svg" width="32"/> |
| network_diagram | <img src="src/icons/network_diagram.svg" width="32"/> |
| northwest_arrow | <img src="src/icons/northwest_arrow.svg" width="32"/> |
| notebook_contact | <img src="src/icons/notebook_contact.svg" width="32"/> |
| notepad | <img src="src/icons/notepad.svg" width="32"/> |
| people_arrow | <img src="src/icons/people_arrow.svg" width="32"/> |
| people_connected | <img src="src/icons/people_connected.svg" width="32"/> |
| people_exchange | <img src="src/icons/people_exchange.svg" width="32"/> |
| person_idea | <img src="src/icons/person_idea.svg" width="32"/> |
| power_button | <img src="src/icons/power_button.svg" width="32"/> |
| presentation_chart | <img src="src/icons/presentation_chart.svg" width="32"/> |
| prize | <img src="src/icons/prize.svg" width="32"/> |
| recycling_symbol | <img src="src/icons/recycling_symbol.svg" width="32"/> |
| refresh | <img src="src/icons/refresh.svg" width="32"/> |
| satellite | <img src="src/icons/satellite.svg" width="32"/> |
| satellite_dish | <img src="src/icons/satellite_dish.svg" width="32"/> |
| signal | <img src="src/icons/signal.svg" width="32"/> |
| social_group | <img src="src/icons/social_group.svg" width="32"/> |
| target_bullseye | <img src="src/icons/target_bullseye.svg" width="32"/> |
| teamwork | <img src="src/icons/teamwork.svg" width="32"/> |
| thought_bubble | <img src="src/icons/thought_bubble.svg" width="32"/> |
| thought_bubble_person | <img src="src/icons/thought_bubble_person.svg" width="32"/> |
| thumbs_up | <img src="src/icons/thumbs_up.svg" width="32"/> |
| trophy_on_podium | <img src="src/icons/trophy_on_podium.svg" width="32"/> |
| user | <img src="src/icons/user.svg" width="32"/> |
| user_globe | <img src="src/icons/user_globe.svg" width="32"/> |
| user_profile | <img src="src/icons/user_profile.svg" width="32"/> |
| user_search | <img src="src/icons/user_search.svg" width="32"/> |
| video_play | <img src="src/icons/video_play.svg" width="32"/> |
| wind_turbine | <img src="src/icons/wind_turbine.svg" width="32"/> |

## Package structure

```
eit-icons/
├── src/
│   └── eit-icons.js
├── icons/                 # SVG assets shipped with the package
│   ├── add_user.svg
│   └── ...
├── dist/                  # Build output (generated)
│   ├── eit-icons.esm.js
│   ├── eit-icons.cjs.js
│   ├── eit-icons.umd.js
│   └── icons/            # SVGs copied here on build
└── scripts/
    └── optimize-svgs.cjs # Optional: optimize SVGs (SVGO)
```

## Build and publish

- Build locally:
```bash
npm install
npm run build
```

The build:
- produces ESM, CJS, and UMD bundles into dist/
- copies SVGs into dist/icons so they are available at runtime

Optional optimization before publishing:
```bash
# requires devDependency: svgo
node scripts/optimize-svgs.cjs
```

## Development

### Building the package

```bash
npm run build
```

### Running the example showcase

```bash
cd example
npm install
npm run dev
```

## License

Proprietary. All rights reserved.