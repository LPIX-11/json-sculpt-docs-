# 🎨 JSON Sculptor — Mapping Made Declarative
![npm](https://img.shields.io/npm/v/@sonatel-os/json-sculpt) ![npm downloads](https://img.shields.io/npm/dm/@sonatel-os/json-sculpt) ![license](https://img.shields.io/npm/l/@sonatel-os/json-sculpt)


Your API responses deserve better than res.data?.items?.[0]?.name.
Let’s sculpt them into shape — predictably, declaratively, and with joy."

## 🚀 What Is It?

@sonatel-os/json-sculpt is a minimalist mapping engine that reshapes any JSON into any structure you define — with support for:

- 📌 Declarative templates
- 🧠 Nested paths
- 🧰 Array transformations
- 🧪 Inline type casting (::type)
- ⚙️ Default/fallback values — NEW!
- 🧱 Dynamic keys — NEW!
- 🔁 Recursive mappings — NEW!
- 🧩 Flattened output via $spread — NEW!
- ⚡ Combined transformation modes

## 📦 Installation

Install via npm:

```bash
npm install @sonatel-os/json-sculpt
# or
yarn add @sonatel-os/json-sculpt
```

---

## 📖 Basics

### 🛠 Basic Usage

```javascript
import { sculpt } from '@sonatel-os/json-sculpt';

const template = {
  name: '@link.user.name',
  email: '@link.user.email',
  city: '@link.address.city',
};

const input = {
  user: { name: 'Alice', email: 'alice@wonderland.sn' },
  address: { city: 'Wonderland' },
};

const result = sculpt.data({ data: input, to: template });

console.log(result);
// { name: 'Alice', email: 'alice@wonderland.sn', city: 'Wonderland' }
```

### 🧪 Type Casting with ::type

```javascript
const template = {
  age: '@link.profile.age::number',
  isActive: '@link.flags.subscribed::boolean',
  registeredAt: '@link.meta.createdAt::date',
};
```

✅ Supported types: `string`, `number`, `boolean`, `date`, `array`, `object`

### 📚 Array Mapping

```javascript
const template = {
  product: '@link.name',
  variants: {
    $map: '@link.variants',
    $transform: {
      color: '@link.color',
      inStock: '@link.stock::boolean',
    }
  },
  flatColors: {
    $map: '@link.variants',
    $extract: '@link.color'
  }
};
```

---

## 🧠 Advanced Features

### 🧱 Dynamic Keys — NEW!

```javascript
const template = {
  product: '@link.name',
  ['@link.sku']: '@link.name',
  variants: {
    $map: '@link.variants',
    $transform: {
      ['@link.color']: '@link.stock::boolean',
    }
  }
};
```

- ✅ Works anywhere — top-level or nested
- ✅ No special syntax needed

### 🧩 Flattened Mapped Output ($spread) — NEW!

```javascript
const template = {
  product: '@link.name',
  variantsInStock: {
    $map: '@link.variants',
    $spread: {
      ['@link.color']: '@link.stock::boolean'
    }
  }
};
```

### 🔁 Recursive Mapping — NEW!

```javascript
const template = {
  components: {
    $map: '@link.content',
    $transform: {
      name: '@link.type',
      props: '@link.props',
      children: {
        $recursive: {
          $track: '#content',
          $rename: 'children',
          name: '@link.type',
          props: '@link.props'
        }
      }
    }
  }
};
```

### 🌀 Dynamic Path Resolution (Fallbacks) — NEW!

```javascript
const template = {
  username: ['@link.user.username', '@link.user.email', 'default@email.com'],
};
```

### 🧪 Pro Tip: Function-Based $op

Extend Sculptor with custom operators for ultra-specific transforms.

```javascript
sculpt.registry('toCamelCase', (carriers, args, parent, ctx) => {})

const template = {
  airlineNames: {
    $op: 'toCamelCase',
    $from: '@link.carriers'
  }
};
```

---

## 🤝 Contribute

Have an idea or feature request?
Open a GitHub issue or submit a PR!

## 🏷 License

Licensed under the MIT License.

## 👨‍🎨 Author

**Mohamed Johnson (LPIX-11)**  
Crafting clean, smart tools for devs who care.
