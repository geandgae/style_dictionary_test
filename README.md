# Style Dictionary build

피그마 토큰스튜디오 빌드
```bash
npm run build-scss
```

















https://github.com/lukasoppermann/design-tokens/blob/main/examples/build.js
https://github.com/amzn/style-dictionary/tree/main/examples/advanced/auto-rebuild-watcher/tokens/color

# Basic Style Dictionary

This example code is bare-bones to show you what this framework can do. If you have the style-dictionary module installed globally, you can `cd` into this directory and run:
```bash
style-dictionary build
```

You should see something like this output:
```
Copying starter files...

Source style dictionary starter files created!

Running `style-dictionary build` for the first time to generate build artifacts.


scss
✔︎  build/scss/_variables.scss

android
✔︎  build/android/font_dimens.xml
✔︎  build/android/colors.xml

compose
✔︎ build/compose/StyleDictionaryColor.kt
✔︎ build/compose/StyleDictionarySize.kt

ios
✔︎  build/ios/StyleDictionaryColor.h
✔︎  build/ios/StyleDictionaryColor.m
✔︎  build/ios/StyleDictionarySize.h
✔︎  build/ios/StyleDictionarySize.m

ios-swift
✔︎  build/ios-swift/StyleDictionary.swift

ios-swift-separate-enums
✔︎  build/ios-swift/StyleDictionaryColor.swift
✔︎  build/ios-swift/StyleDictionarySize.swift
```

Good for you! You have now built your first style dictionary! Moving on, take a look at what we have built. This should have created a build directory and it should look like this:
```
├── README.md
├── config.json
├── tokens/
│   ├── color/
│       ├── base.json
│       ├── font.json
│   ├── size/
│       ├── font.json
├── build/
│   ├── android/
│      ├── font_dimens.xml
│      ├── colors.xml
│   ├── compose/
│      ├── StyleDictionaryColor.kt
│      ├── StyleDictionarySize.kt
│   ├── scss/
│      ├── _variables.scss
│   ├── ios/
│      ├── StyleDictionaryColor.h
│      ├── StyleDictionaryColor.m
│      ├── StyleDictionarySize.h
│      ├── StyleDictionarySize.m
│   ├── ios-swift/
│      ├── StyleDictionary.swift
│      ├── StyleDictionaryColor.swift
│      ├── StyleDictionarySize.swift
```

If you open `config.json` you will see there are 5 platforms defined: scss, android, compose, ios, and ios-swift. Each platform has a transformGroup, buildPath, and files. The buildPath and files of the platform should match up to the files what were built. The files built should look like these:

**Android**
```xml
<!-- font_dimens.xml -->
<resources>
  <dimen name="size_font_small">12.00sp</dimen>
  <dimen name="size_font_medium">16.00sp</dimen>
  <dimen name="size_font_large">32.00sp</dimen>
  <dimen name="size_font_base">16.00sp</dimen>
</resources>

<!-- colors.xml -->
<resources>
  <color name="color_base_gray_light">#ffcccccc</color>
  <color name="color_base_gray_medium">#ff999999</color>
  <color name="color_base_gray_dark">#ff111111</color>
  <color name="color_base_red">#ffff0000</color>
  <color name="color_base_green">#ff00ff00</color>
  <color name="color_font_base">#ffff0000</color>
  <color name="color_font_secondary">#ff00ff00</color>
  <color name="color_font_tertiary">#ffcccccc</color>
</resources>
```

**Compose**
```kotlin
object StyleDictionaryColor {
  val colorBaseGrayDark = Color(0xff111111)
  val colorBaseGrayLight = Color(0xffcccccc)
  val colorBaseGrayMedium = Color(0xff999999)
  val colorBaseGreen = Color(0xff00ff00)
  val colorBaseRed = Color(0xffff0000)
  val colorFontBase = Color(0xffff0000)
  val colorFontSecondary = Color(0xff00ff00)
  val colorFontTertiary = Color(0xffcccccc)
}

object StyleDictionarySize {
  /** the base size of the font */
  val sizeFontBase = 16.00.sp
  /** the large size of the font */
  val sizeFontLarge = 32.00.sp
  /** the medium size of the font */
  val sizeFontMedium = 16.00.sp
  /** the small size of the font */
  val sizeFontSmall = 12.00.sp
}
```

**SCSS**
```scss
// variables.scss
$color-base-gray-light: #cccccc;
$color-base-gray-medium: #999999;
$color-base-gray-dark: #111111;
$color-base-red: #ff0000;
$color-base-green: #00ff00;
$color-font-base: #ff0000;
$color-font-secondary: #00ff00;
$color-font-tertiary: #cccccc;
$size-font-small: 0.75rem;
$size-font-medium: 1rem;
$size-font-large: 2rem;
$size-font-base: 1rem;
```

**iOS**
```objc
#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f],
[UIColor colorWithRed:0.600f green:0.600f blue:0.600f alpha:1.000f],
[UIColor colorWithRed:0.067f green:0.067f blue:0.067f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:1.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.800f blue:0.800f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
```

Pretty nifty! This shows a few things happening:
1. The build system does a deep merge of all the token JSON files defined in the `source` attribute of `config.json`. This allows you to split up the token JSON files however you want. There are 2 JSON files with `color` as the top level key, but they get merged properly.
1. The build system resolves references to other design tokens. `{size.font.medium.value}` gets resolved properly.
1. The build system handles references to token values in other files as well as you can see in `tokens/color/font.json`.

Now let's make a change and see how that affects things. Open up `tokens/color/base.json` and change `"#111111"` to `"#000000"`. After you make that change, save the file and re-run the build command `style-dictionary build`. Open up the build files and take a look.

**Huzzah!**

Now go forth and create! Take a look at all the built-in [transforms](https://amzn.github.io/style-dictionary/#/transforms?id=pre-defined-transforms) and [formats](https://amzn.github.io/style-dictionary/#/formats?id=pre-defined-formats).









## Component CTI Structure

This example will show you one way to define component tokens in a simple way while still using the CTI attributes for transforming the tokens. The CTI structure for Style Dictionary tokens makes defining component-level tokens cumbersome and not user-friendly. This is because the CTI of tokens is based on the object path of the token. Now, if you wanted to write tokens for a button component it would have to look something like this:

```json
{
  "size": {
    "padding" : {
      "button": { "value": "{size.padding.base.value}" }
    },
    "font": {
      "button": { "value": 2 }
    }
  },

  "color": {
    "font": {
      "button": {
        "primary": { "value": "{color.font.inverse.value}" },
        "secondary": { "value": "{color.font.link.value}" }
      }
    },

    "background": {
      "button": {
        "primary": { "value": "hsl(10, 80, 50)" },
        "secondary": { "value": "{color.background.primary.value}" }
      }
    }
  }
}
```

Instead, when defining component tokens it makes more sense to structure them more like CSS. `component.button.background-color` makes more sense than `color.background.button`. Here is what the component tokens would look like in this new structure:

```json
{
  "component": {
    "button": {
      "padding": { "value": "{size.padding.medium.value}" },
      "font-size": { "value": 2 },
      
      "primary": {
        "background-color": { "value": "hsl(10, 80, 50)" },
        "color": { "value": "{color.font.inverse.value}" }
      },
      
      "secondary": {
        "background-color": { "value": "{color.background.primary.value}" },
        "color": { "value": "{color.font.link.value}" }
      }
    }
  }
}
```

### Running the example

First of all, set up the required dependencies running the command `npm install` in your local CLI environment (if you prefer to use *yarn*, update the commands accordingly).

At this point, if you want to build the tokens run `npm run build`. This command will generate the files in the `build` folder.


### How does it work

All of the built-in transforms target tokens using the CTI attributes. The built-in [`attribute/cti`](https://amzn.github.io/style-dictionary/#/transforms?id=attributecti) transform adds the CTI attributes to each token based on the object path of the token. In this example we override the default behavior of the [`attribute/cti`](https://amzn.github.io/style-dictionary/#/transforms?id=attributecti) transform to apply CTI attributes based on token's key, or last part of the object path to generate the equivalent category and type. This way we can correctly map a token with an object path of `component.button.background-color` to a category of `color` and type of `background`. 

Style Dictionary allows for extensibility through [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch). This allows you to override the default behavior of the Style Dictionary library, and any built-in transforms and formats. You can override built-in transforms and formats by adding ones with the same name. Also, all of the built-in transforms, transformGroups, and formats are available by accessing them in the Style Dictionary library under the attributes `transform`, `transformGroup`, and `format` respectively. For example:

```javascript
const StyleDictionary = require('style-dictionary');

const cti = StyleDictionary.transform['attribute/cti'];
// {
//   type: 'attribute',
//   transformer: f () {}
// }
```

In this example we monkey patch the `attribute/cti` transform to look at the top-level namespace of the token and if it is 'component', instead of running the default `attribute/cti` transform, it instead looks at the last part of the object path to generate the equivalent category and type.

For example, if the key of the token (the last part of the object path) is "background-color", the monkey patched `attribute/cti` transform will return a category of 'color' and type of 'background'. This example uses CSS property names, but you could also change it to use similar React/CSS-in-JS names like 'backgroundColor' instead of 'background-color'.

### What to look at

* `config.js`:
  * `propertiesToCTI`: A plain object where we map the CSS property name to the proper category and type.
  * `CTITransform`: A transform object that defines a transformer method, which will override the default `attribute/cti` transform. This is similar to creating a child class with some custom logic and then calling `super`. In the transformer function it first looks at the top-level namespace, the first item in the object path, and if it is 'component' we run our custom logic using the `propertiesToCTI` map. If it is not 'component', use the built-in `attribute/cti`.
* `tokens/component/button.json`: Take a look at how it defines the component tokens and uses the last part of the object path as the CSS property. Notice how we can define token values in here that are not references, but they still get transformed properly: font-size uses 'rem' and background-color uses hex in the output.
