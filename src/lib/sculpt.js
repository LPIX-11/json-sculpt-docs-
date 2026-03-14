/**
 * Embedded copy of @sonatel-os/json-sculpt v1.3.0
 * Bundled into the docs site so live examples work standalone.
 */

const getSafeValue = (path, data, defaultValue = void 0) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid data provided. Expected an object or array.");
  }
  return path.split(".").reduce((acc, part) => {
    if (acc && typeof acc === "object") return acc[part];
    return defaultValue;
  }, data);
};

const operators = {
  toLowerCase: (value) => String(value ?? "").toLowerCase(),
  toUpperCase: (value) => String(value ?? "").toUpperCase(),
  toCamelCase: (value) => String(value ?? "").replace(/[-_](\w)/g, (_, letter) => letter.toUpperCase()).replace(/^\w/, (c) => c.toLowerCase()),
  toTitleCase: (value) => String(value ?? "").replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()),
  toFixed: (value, args) => Number(value ?? 0).toFixed(args?.decimals ?? 2),
  formatNumber: (value, args) => Number(value ?? 0).toLocaleString(args?.locale || "en-US"),
  formatCurrency: (value, args) => Number(value ?? 0).toLocaleString(args?.locale || "en-US", { style: "currency", currency: args?.currency || "USD" }),
  add: (value, args) => Number(value ?? 0) + (args?.amount ?? 0),
  multiply: (value, args) => Number(value ?? 0) * (args?.factor ?? 1),
  formatDate: (value, args) => { const d = new Date(value); if (isNaN(d)) return null; return d.toLocaleDateString(args?.locale || "en-US", { day: "2-digit", month: "2-digit", year: "numeric", ...args?.options || {} }); },
  formatTime: (value, args) => { const d = new Date(value); if (isNaN(d)) return null; return d.toLocaleTimeString(args?.locale || "en-US", args?.options || {}); },
  timeAgo: (value) => { const d = new Date(value); const diff = Date.now() - d.getTime(); const m = Math.floor(diff / 6e4); if (m < 1) return "just now"; if (m < 60) return `${m} min ago`; const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`; return `${Math.floor(h / 24)}d ago`; },
  join: (value, args) => Array.isArray(value) ? value.join(args?.separator || ", ") : value,
  length: (value) => Array.isArray(value) ? value.length : 0,
  unique: (value) => Array.isArray(value) ? [...new Set(value)] : value,
  first: (value) => Array.isArray(value) ? value[0] : value,
  last: (value) => Array.isArray(value) ? value[value.length - 1] : value,
};

const mapData = ({ data, to }) => {
  const castToType = (value, type) => {
    try {
      switch (type) {
        case "number": { const n = Number(value); if (isNaN(n)) throw new Error(`Cannot cast '${value}' to number`); return n; }
        case "string": return String(value);
        case "boolean": return value === "yes" || value === 1 || value === "true" || value === true;
        case "date": { const d = new Date(value); if (isNaN(d.getTime())) throw new Error(`Cannot cast '${value}' to date`); return d; }
        default: return value;
      }
    } catch (e) { console.warn(`Type cast failed: ${e.message}`); return null; }
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
      if (typeof raw === "function") throw new Error(`Function values are not allowed in templates. Use "$op" instead for key "${key}".`);
      const resolvedKey = key.startsWith("@link.") ? getTransformedValue(key, data2) : key;
      if (Array.isArray(raw)) {
        result[resolvedKey] = resolveFallback(raw, data2);
      } else if (typeof raw === "object" && raw !== null && raw.$map) {
        const arr = getTransformedValue(raw.$map, data2);
        if (!Array.isArray(arr)) { result[resolvedKey] = raw.$spread ? {} : []; }
        else if (raw.$spread) { result[resolvedKey] = arr.reduce((acc, item, index) => ({ ...acc, ...mapTemplate(raw.$spread, item, { index, parent: arr, path: `${context.path ?? ""}.${resolvedKey}[${index}]` }) }), {}); }
        else if (raw.$transform) { result[resolvedKey] = arr.map((item, index) => mapTemplate(raw.$transform, item, { index, parent: arr, path: `${context.path ?? ""}.${resolvedKey}[${index}]` })); }
        else if (raw.$extract) { result[resolvedKey] = Array.isArray(arr) ? arr.map((item) => getTransformedValue(raw.$extract, item)) : []; }
        else { result[resolvedKey] = arr; }
      } else if (typeof raw === "object" && raw !== null && raw.$recursive) {
        const { $track: keyToUse, $rename: rename, $transform: recursiveTransform } = raw.$recursive;
        const children = getSafeValue(keyToUse.replace("#", ""), data2) || [];
        result[resolvedKey] = processRecursive(children, recursiveTransform, keyToUse, rename ?? keyToUse.replace("#", ""), `${context.path ?? ""}.${resolvedKey}`);
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

const registerOperator = (name, fn) => { operators[name] = fn; };
export const sculpt = { data: mapData, registery: registerOperator };
