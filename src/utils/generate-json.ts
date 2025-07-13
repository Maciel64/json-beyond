type BaseType = "object" | "array";
type Complexity = "simple" | "medium" | "complex";

const firstNames = [
  "Ana",
  "João",
  "Maria",
  "Pedro",
  "Carla",
  "Lucas",
  "Fernanda",
  "Rafael",
  "Juliana",
  "Gabriel",
];
const lastNames = [
  "Silva",
  "Santos",
  "Oliveira",
  "Souza",
  "Rodrigues",
  "Ferreira",
  "Alves",
  "Pereira",
  "Lima",
  "Gomes",
];
const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Salvador",
  "Fortaleza",
  "Brasília",
  "Curitiba",
  "Recife",
  "Porto Alegre",
  "Manaus",
];
const companies = [
  "TechCorp",
  "InnovaSoft",
  "DataSystems",
  "CloudTech",
  "DevSolutions",
  "CodeLab",
  "DigitalWorks",
  "SmartApps",
  "WebForce",
  "TechFlow",
];
const departments = [
  "Desenvolvimento",
  "Marketing",
  "Vendas",
  "RH",
  "Financeiro",
  "Suporte",
  "Design",
  "Produto",
  "Operações",
  "Qualidade",
];

// Helper random functions
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomBoolean(): boolean {
  return Math.random() > 0.5;
}
function getRandomDate(): string {
  const start = new Date(2020, 0, 1).getTime();
  const end = Date.now();
  const date = new Date(start + Math.random() * (end - start));
  return date.toISOString();
}
function getRandomEmail(): string {
  const name = getRandomItem(firstNames).toLowerCase();
  const domain = getRandomItem([
    "gmail.com",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
    "empresa.com",
  ]);
  return `${name}.${getRandomNumber(1, 999)}@${domain}`;
}

// Mapa de geradores fixos por propriedade
const propertyGenerators: Record<string, () => unknown> = {
  id: () => Date.now().toString(),
  nome: () => {
    return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
  },
  email: () => getRandomEmail(),
  idade: () => getRandomNumber(18, 80),
  ativo: () => getRandomBoolean(),
  data: () => getRandomDate(),
  cidade: () => getRandomItem(cities),
  empresa: () => getRandomItem(companies),
  departamento: () => getRandomItem(departments),
  salario: () => Number((Math.random() * 10000).toFixed(2)),
  telefone: () => `+55${getRandomNumber(100000000, 999999999)}`,
  endereco: () => ({
    rua: getRandomItem(["Avenida Brasil", "Rua das Flores", "Praça Sete"]),
    numero: getRandomNumber(1, 1000),
    cep: `${getRandomNumber(10000, 99999)}-${getRandomNumber(100, 999)}`,
  }),
  status: () => getRandomItem(["ativo", "inativo", "pendente"]),
  tipo: () => getRandomItem(["admin", "user", "guest"]),
  descricao: () =>
    getRandomItem([
      "Lorem ipsum dolor sit amet.",
      "Descrição de exemplo.",
      "Texto gerado aleatoriamente.",
    ]),
  categoria: () => getRandomItem(["A", "B", "C", "D"]),
  preco: () => Number((Math.random() * 500).toFixed(2)),
  quantidade: () => getRandomNumber(1, 100),
  codigo: () => `#${getRandomNumber(1000, 9999)}`,
  observacoes: () =>
    getRandomItem(["Sem observações.", "Verificar detalhes.", "N/A."]),
};

// Gera valor simples genérico
function generateSimpleValue(): unknown {
  const types = ["string", "number", "boolean"] as const;
  const type = getRandomItem(types as unknown as string[]);
  switch (type) {
    case "string":
      return getRandomItem([...firstNames, ...lastNames, ...cities]);
    case "number":
      return getRandomNumber(1, 1000);
    case "boolean":
      return getRandomBoolean();
  }
}

// Gera objeto alinhado à propriedade e complexidade
function generateObject(
  complexity: Complexity,
  depth = 0,
  maxProperties: number
): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  const keys = Object.keys(propertyGenerators);

  // Seleciona propriedades com base em maxProperties
  const selectedKeys = keys
    .sort(() => 0.5 - Math.random())
    .slice(0, maxProperties);

  selectedKeys.forEach((key) => {
    const generator = propertyGenerators[key];
    obj[key] = generator ? generator() : generateSimpleValue();
  });

  // Se complexidade maior e ainda não atingiu profundidade, adiciona aninhamentos
  if (complexity !== "simple" && depth < (complexity === "medium" ? 1 : 2)) {
    const nestedKey = getRandomItem(selectedKeys);
    obj[`${nestedKey}_detalhes`] = generateObject(
      complexity,
      depth + 1,
      Math.max(1, maxProperties - 1)
    );
  }
  return obj;
}

// Gera array de objetos com complexidade
function generateArray(
  complexity: Complexity,
  itemCount: number,
  maxProperties: number
): unknown[] {
  return Array.from({ length: itemCount }, () =>
    generateObject(complexity, 0, maxProperties)
  );
}

/**
 * Gera JSON randomizado com base no tipo, complexidade e itemCount
 * @param baseType - 'object' ou 'array'
 * @param complexity - 'simple' | 'medium' | 'complex'
 * @param itemCount - número de propriedades (object) ou itens (array)
 */
export function generateRandomJson(
  baseType: BaseType,
  complexity: Complexity,
  itemCount: number
): unknown {
  const maxProps =
    baseType === "object"
      ? itemCount
      : getRandomNumber(1, Math.max(1, itemCount));

  return baseType === "array"
    ? generateArray(complexity, itemCount, Math.min(maxProps, 10))
    : generateObject(complexity, 0, Math.min(maxProps, 10));
}
