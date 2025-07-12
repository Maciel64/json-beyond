type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
interface JsonObject {
  [key: string]: JsonValue;
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function generateInterfaces(obj: JsonObject, rootName = "Root"): string {
  const interfaces: Record<string, string> = {};

  function parse(obj: JsonObject, name: string) {
    let fields = "";

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          fields += `  ${key}: any[];\n`;
        } else {
          const arrayItem = value[0];
          if (typeof arrayItem === "object" && arrayItem !== null) {
            const typeName = capitalize(key.slice(0, -1)) || "Item";
            parse(arrayItem as JsonObject, typeName);
            fields += `  ${key}: ${typeName}[];\n`;
          } else {
            fields += `  ${key}: ${typeof arrayItem}[];\n`;
          }
        }
      } else if (typeof value === "object" && value !== null) {
        const typeName = capitalize(key);
        parse(value as JsonObject, typeName);
        fields += `  ${key}: ${typeName};\n`;
      } else {
        fields += `  ${key}: ${typeof value};\n`;
      }
    }

    interfaces[name] = `interface ${name} {\n${fields}}`;
  }

  parse(obj, rootName);

  return Object.values(interfaces).reverse().join("\n\n");
}
