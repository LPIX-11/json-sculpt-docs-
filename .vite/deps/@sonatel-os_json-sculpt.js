import "./chunk-G3PMV62Z.js";

// node_modules/@sonatel-os/json-sculpt/dist/index.esm.js
var getSafeValue = (path, data, defaultValue = void 0) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid data provided. Expected an object or array.");
  }
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") return acc[part];
    return defaultValue;
  }, data);
};
var operators = {
  /** String operators */
  toLowerCase: (value) => String(value ?? "").toLowerCase(),
  toUpperCase: (value) => String(value ?? "").toUpperCase(),
  toCamelCase: (value) => String(value ?? "").replace(/[-_](\w)/g, (_, letter) => letter.toUpperCase()).replace(/^\w/, (c) => c.toLowerCase()),
  toTitleCase: (value) => String(value ?? "").replace(
    /\w\S*/g,
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ),
  /** Number & currency operators */
  toFixed: (value, args) => Number(value ?? 0).toFixed((args == null ? void 0 : args.decimals) ?? 2),
  formatNumber: (value, args) => Number(value ?? 0).toLocaleString((args == null ? void 0 : args.locale) || "en-US"),
  formatCurrency: (value, args) => Number(value ?? 0).toLocaleString((args == null ? void 0 : args.locale) || "en-US", {
    style: "currency",
    currency: (args == null ? void 0 : args.currency) || "USD"
  }),
  add: (value, args) => Number(value ?? 0) + ((args == null ? void 0 : args.amount) ?? 0),
  multiply: (value, args) => Number(value ?? 0) * ((args == null ? void 0 : args.factor) ?? 1),
  /** Date operators */
  formatDate: (value, args) => {
    const date = new Date(value);
    if (isNaN(date)) return null;
    return date.toLocaleDateString((args == null ? void 0 : args.locale) || "en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      ...(args == null ? void 0 : args.options) || {}
    });
  },
  formatTime: (value, args) => {
    const date = new Date(value);
    if (isNaN(date)) return null;
    return date.toLocaleTimeString((args == null ? void 0 : args.locale) || "en-US", (args == null ? void 0 : args.options) || {});
  },
  timeAgo: (value) => {
    const date = new Date(value);
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 6e4);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  },
  /** Array operators */
  join: (value, args) => Array.isArray(value) ? value.join((args == null ? void 0 : args.separator) || ", ") : value,
  length: (value) => Array.isArray(value) ? value.length : 0,
  unique: (value) => Array.isArray(value) ? [...new Set(value)] : value,
  first: (value) => Array.isArray(value) ? value[0] : value,
  last: (value) => Array.isArray(value) ? value[value.length - 1] : value
};
var mapData = ({ data, to }) => {
  const castToType = (value, type) => {
    try {
      switch (type) {
        case "number": {
          const num = Number(value);
          if (isNaN(num)) throw new Error(`Cannot cast '${value}' to number`);
          return num;
        }
        case "string":
          return String(value);
        case "boolean":
          return value === "yes" || value === 1 || value === "true" || value === true;
        case "date": {
          const date = new Date(value);
          if (isNaN(date.getTime())) throw new Error(`Cannot cast '${value}' to date`);
          return date;
        }
        default:
          return value;
      }
    } catch (e) {
      console.warn(`Type cast failed: ${e.message}`);
      return null;
    }
  };
  const getTransformedValue = (path, data2) => {
    const [cleanPath, type] = path.split("::");
    const raw = getSafeValue(cleanPath.replace("@link.", ""), data2);
    return type ? castToType(raw, type) : raw;
  };
  const processOperator = (opConfig, data2, context) => {
    const { $op, $from, $args } = opConfig || {};
    const value = typeof $from === "string" && $from.startsWith("@link.") ? getTransformedValue($from, data2) : $from;
    if (!operators[$op]) throw new Error(`Operator "${$op}" not registered.`);
    return operators[$op](value, $args, data2, context);
  };
  const resolveFallback = (paths, data2) => {
    for (const path of paths) {
      const val = typeof path === "string" && path.startsWith("@link.") ? getTransformedValue(path, data2) : path;
      if (val !== void 0 && val !== null) return val;
    }
    return null;
  };
  const processRecursive = (children, template, key, rename, path) => {
    if (!Array.isArray(children)) return [];
    return children.map((child, index) => {
      const mapped = mapTemplate(template, child, { index, parent: children, path: `${path}.${index}` });
      const childKey = key.replace("#", "");
      const childArray = getSafeValue(childKey, child) || [];
      const recursed = processRecursive(childArray, template, key, rename, `${path}.${index}.${childKey}`);
      return { ...mapped, [rename || childKey]: recursed.length > 0 ? recursed : void 0 };
    });
  };
  const mapTemplate = (template, data2, context = {}) => {
    if (!data2) return null;
    if (Array.isArray(data2)) {
      return data2.map((item, index) => mapTemplate(template, item, { index, parent: data2, path: `${context.path ?? ""}[${index}]` }));
    }
    return Object.keys(template).reduce((result, key) => {
      const raw = template[key];
      if (typeof raw === "function") {
        throw new Error(`Function values are not allowed in templates. Use "$op" instead for key "${key}".`);
      }
      const resolvedKey = key.startsWith("@link.") ? getTransformedValue(key, data2) : key;
      if (Array.isArray(raw)) {
        result[resolvedKey] = resolveFallback(raw, data2);
      } else if (typeof raw === "object" && raw !== null && raw.$map) {
        const arr = getTransformedValue(raw.$map, data2);
        if (!Array.isArray(arr)) {
          result[resolvedKey] = raw.$spread ? {} : [];
        } else if (raw.$spread) {
          result[resolvedKey] = arr.reduce((acc, item, index) => {
            const partial = mapTemplate(raw.$spread, item, { index, parent: arr, path: `${context.path ?? ""}.${resolvedKey}[${index}]` });
            return { ...acc, ...partial };
          }, {});
        } else if (raw.$transform) {
          result[resolvedKey] = arr.map((item, index) => mapTemplate(raw.$transform, item, { index, parent: arr, path: `${context.path ?? ""}.${resolvedKey}[${index}]` }));
        } else if (raw.$extract) {
          result[resolvedKey] = Array.isArray(arr) ? arr.map((item) => getTransformedValue(raw.$extract, item)) : [];
        } else {
          result[resolvedKey] = arr;
        }
      } else if (typeof raw === "object" && raw !== null && raw.$recursive) {
        const { $track: keyToUse, $rename: rename, $transform: recursiveTransform } = raw.$recursive;
        const children = getSafeValue(keyToUse.replace("#", ""), data2) || [];
        const processed = processRecursive(
          children,
          recursiveTransform,
          keyToUse,
          rename ?? keyToUse.replace("#", ""),
          `${context.path ?? ""}.${resolvedKey}`
        );
        result[resolvedKey] = processed;
      } else if (typeof raw === "object" && raw !== null && raw.$op) {
        result[resolvedKey] = processOperator(raw, data2, context);
      } else if (typeof raw === "object" && raw !== null) {
        result[resolvedKey] = mapTemplate(raw, data2, context);
      } else if (typeof raw === "string") {
        result[resolvedKey] = getTransformedValue(raw, data2);
      } else {
        result[resolvedKey] = raw;
      }
      return result;
    }, {});
  };
  return mapTemplate(to, data);
};
var registerOperator = (name, fn) => {
  operators[name] = fn;
};
var sculpt = {
  /**
   * Maps and transforms data based on a provided template structure. 
   * This function is designed to process nested objects and arrays, 
   * applying transformations and extractions according to the specified template.
   *
   * @function data
   * @param {Object} options - An object containing the input data and transformation template.
   * @param {Object|Array} options.data - The input data to be transformed.
   * @param {Object} options.to - The transformation template that defines how the input data should be mapped.
   * @returns {Object|Array|null} - The transformed data, either as an object or array, based on the template.
   * If the transformation fails or invalid data is provided, the function returns `null`.
   * @throws {Error} If the template or data structure is invalid or missing.
   *
   * @example
   * // Simple object transformation
   * const template = {
   *   name: '@link.person.fullName',
   *   age: '@link.person.age',
   *   location: '@link.address.city'
   * };
   * const data = {
   *   person: { fullName: 'John Doe', age: 30 },
   *   address: { city: 'New York', country: 'USA' }
   * };
   * const result = sculpt.data({ data: data, to: template });
   * // result: { name: 'John Doe', age: 30, location: 'New York' }
   *
   * @example
   * // Array transformation
   * const template = {
   *   playerName: '@link.person.name',
   *   score: '@link.game.score'
   * };
   * const data = [
   *   { person: { name: 'Alice' }, game: { score: 100 } },
   *   { person: { name: 'Bob' }, game: { score: 200 } }
   * ];
   * const result = sculpt.data({ data: data, to: template });
   * // result: [ { playerName: 'Alice', score: 100 }, { playerName: 'Bob', score: 200 } ]
   */
  data: mapData,
  registery: registerOperator
};
export {
  sculpt
};
//# sourceMappingURL=@sonatel-os_json-sculpt.js.map
