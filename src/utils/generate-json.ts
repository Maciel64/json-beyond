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
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
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
  return `${name}${getRandomNumber(1, 999)}@${domain}`;
}

function generateSimpleValue(): unknown {
  const types = ["string", "number", "boolean", "date", "email"];
  const type = getRandomItem(types);

  switch (type) {
    case "string":
      return getRandomItem([
        ...firstNames,
        ...lastNames,
        ...cities,
        ...companies,
        ...departments,
      ]);
    case "number":
      return getRandomNumber(1, 1000);
    case "boolean":
      return getRandomBoolean();
    case "date":
      return getRandomDate();
    case "email":
      return getRandomEmail();
    default:
      return "valor";
  }
}

function generateObject(complexity: Complexity, depth = 0): unknown {
  const maxDepth =
    complexity === "simple" ? 1 : complexity === "medium" ? 2 : 3;

  if (depth >= maxDepth) {
    return generateSimpleValue();
  }

  const obj: Record<string, unknown> = {};
  const keys = [
    "id",
    "nome",
    "email",
    "idade",
    "ativo",
    "data",
    "cidade",
    "empresa",
    "departamento",
    "salario",
    "telefone",
    "endereco",
    "status",
    "tipo",
    "descricao",
    "categoria",
    "preco",
    "quantidade",
    "codigo",
    "observacoes",
  ];

  const numKeys = getRandomNumber(
    2,
    complexity === "simple" ? 4 : complexity === "medium" ? 6 : 8
  );
  const selectedKeys = keys.sort(() => 0.5 - Math.random()).slice(0, numKeys);

  selectedKeys.forEach((key) => {
    if (
      complexity !== "simple" &&
      depth < maxDepth - 1 &&
      Math.random() > 0.7
    ) {
      // Adicionar objeto aninhado
      obj[key] = generateObject(complexity, depth + 1);
    } else if (complexity === "complex" && Math.random() > 0.8) {
      // Adicionar array
      obj[key] = generateArray(complexity, depth + 1, getRandomNumber(1, 3));
    } else {
      // Valor simples
      obj[key] = generateSimpleValue();
    }
  });

  return obj;
}

function generateArray(
  complexity: Complexity,
  depth = 0,
  length?: number
): unknown[] {
  const arrayLength = length || getRandomNumber(1, 5);
  const arr: unknown[] = [];

  for (let i = 0; i < arrayLength; i++) {
    if (complexity === "simple") {
      arr.push(generateSimpleValue());
    } else {
      arr.push(generateObject(complexity, depth));
    }
  }

  return arr;
}

export function generateRandomJson(
  baseType: BaseType,
  complexity: Complexity,
  itemCount: number
): unknown {
  if (baseType === "array") {
    return generateArray(complexity, 0, itemCount);
  } else {
    return generateObject(complexity, 0);
  }
}
