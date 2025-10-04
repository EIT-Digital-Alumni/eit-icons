# EIT Icons Web Component

Custom HTML element for rendering EIT icons with simple, composable styling.

If you want to quickly try the icons, clone the repo and run the example (see “Run the example” below).

## Installation

Using GitHub Packages, you can authenticate either by logging in or by configuring an `.npmrc` file.

### Option 1: Login
1. Create a Personal Access Token with `read:packages`.
2. Authenticate for the `@EIT-Digital-Alumni` scope:
    ```bash
    npm login --registry=https://npm.pkg.github.com --scope=@EIT-Digital-Alumni
    ```
3. Install the package:
    ```bash
    npm install @EIT-Digital-Alumni/eit-icons
    ```

### Option 2: Configure `.npmrc`
1. Create a Personal Access Token with `read:packages`.
2. Add the following to your `.npmrc` file:
    ```
    @EIT-Digital-Alumni:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
    ```
3. Install the package:
    ```bash
    npm install @EIT-Digital-Alumni/eit-icons
    ```

Choose the method that best fits your workflow.

## Getting started

The package defines a custom element `<eit-icons>` when imported. Use it anywhere in your HTML once the module is loaded.

ES Modules (recommended):
```js
import '@EIT-Digital-Alumni/eit-icons';

// If you need direct access to the class (usually not necessary)
import { EitIcons } from '@EIT-Digital-Alumni/eit-icons';
```

## Using the custom element

Basic usage (stroke-only):
```html
<eit-icons name="add_user"></eit-icons>
```

With a circle background (badge style):
```html
<eit-icons name="book" with-circle background="#034EA2"></eit-icons>
```

### Coloring

- Icon stroke color follows CSS `color` (currentColor):
```html
<eit-icons name="gear" style="color: #031241;"></eit-icons>
```

- When `with-circle` is present, the circle is filled with the `background` attribute value and the icon is rendered for contrast (white icon on colored circle):
```html
<eit-icons name="user" with-circle background="#0065B2"></eit-icons>
```

Tip: You can toggle between “stroke color” and “circle fill” strategies depending on your UI (e.g., keep stroke-only on light backgrounds; switch to circle badges in dense lists or to ensure brand color usage).


## Attributes

| Attribute     | Type     | Description                                                     |
| ------------- | -------- | --------------------------------------------------------------- |
| `name`        | string   | Icon name to render (required)                                  |
| `with-circle` | boolean  | Adds a circular background behind the icon                      |
| `background`  | string   | Circle fill color when `with-circle` is present (e.g., `#034EA2`) |

Behavioral notes:
- Without `with-circle`, only the icon strokes are shown and follow CSS `color`.
- With `with-circle`, the circle uses `background`, and the icon is rendered in white for contrast.

## Available icons

Browse the icon names directly:
- Source folder: `src/icons` (SVG filenames are the icon names)
- Quick preview and testing: run the example app (below), which lists all available icons with search and styling controls


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

## License

Proprietary. All rights reserved.
