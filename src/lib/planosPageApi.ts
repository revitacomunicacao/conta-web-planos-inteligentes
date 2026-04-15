export type PlanosApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type PlanosApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: PlanosApiCampo[];
};

export type PlanosApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: PlanosApiCampo[];
    secoes: PlanosApiSecao[];
  };
  message: string;
};

export type PlanosContent = {
  banner: { titulo: string; descricao: string };
  areas: { titulo: string; items: { titulo: string; iconKey: string | null }[] };
  plans: {
    name: string;
    desc: string;
    price: string;
    included: string[];
    notIncluded: string[];
    button: { texto: string; link: string } | null;
  }[];
  cta: { titulo: string; descricao: string; botao: { texto: string; link: string } | null };
};

function getSecao(secoes: PlanosApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: PlanosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<PlanosApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: PlanosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<PlanosApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

function getCampoRepetidor(campos: PlanosApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "repetidor") as
    | Extract<PlanosApiCampo, { tipo: "repetidor" }>
    | undefined;
  return c?.valor ?? [];
}

function linesToList(s: string) {
  return (s ?? "")
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function normalizePlanosContent(api: PlanosApiResponse): PlanosContent {
  const secoes = api.data.secoes ?? [];
  const banner = getSecao(secoes, "Banner");
  const areas = getSecao(secoes, "Áreas de atuações");
  const mei = secoes.find((s) => s.nome.toLowerCase().includes("planos mei")) ?? null;
  const simples = secoes.find((s) => s.nome.toLowerCase().includes("simples nacional")) ?? null;
  const presumido = secoes.find((s) => s.nome.toLowerCase().includes("lucro presumido")) ?? null;
  const cta = getSecao(secoes, "CTA");

  const areasItems = getCampoRepetidor(areas?.campos ?? [], "areas").map((x) => ({
    titulo: String(x.titulo ?? ""),
    iconKey: (x.icone?.iconKey ?? null) as string | null,
  }));

  const plans = [
    {
      name: getCampoTexto(mei?.campos ?? [], "titulo-2"),
      desc: getCampoTexto(mei?.campos ?? [], "descricao-1"),
      price: getCampoTexto(mei?.campos ?? [], "preco"),
      included: linesToList(getCampoTexto(mei?.campos ?? [], "itens-que-possui-um-por-linha")),
      notIncluded: linesToList(getCampoTexto(mei?.campos ?? [], "itens-que-nao-possui-um-por-linha")),
      button: getCampoBotao(mei?.campos ?? [], "botao"),
    },
    {
      name: getCampoTexto(simples?.campos ?? [], "titulo-3"),
      desc: getCampoTexto(simples?.campos ?? [], "descricao-2"),
      price: getCampoTexto(simples?.campos ?? [], "preco-1"),
      included: linesToList(getCampoTexto(simples?.campos ?? [], "itens-que-possui-um-por-linha-1")),
      notIncluded: linesToList(getCampoTexto(simples?.campos ?? [], "itens-que-nao-possui-um-por-linha-1")),
      button: getCampoBotao(simples?.campos ?? [], "botao-1"),
    },
    {
      name: getCampoTexto(presumido?.campos ?? [], "titulo-4"),
      desc: getCampoTexto(presumido?.campos ?? [], "descricao-3"),
      price: getCampoTexto(presumido?.campos ?? [], "preco-2"),
      included: linesToList(getCampoTexto(presumido?.campos ?? [], "itens-que-possui")),
      notIncluded: linesToList(getCampoTexto(presumido?.campos ?? [], "itens-que-nao-possui")),
      button: getCampoBotao(presumido?.campos ?? [], "botao-2"),
    },
  ].filter((p) => p.name);

  return {
    banner: {
      titulo: getCampoTexto(banner?.campos ?? [], "titulo"),
      descricao: getCampoTexto(banner?.campos ?? [], "descricao"),
    },
    areas: {
      titulo: getCampoTexto(areas?.campos ?? [], "titulo-1"),
      items: areasItems,
    },
    plans,
    cta: {
      titulo: getCampoTexto(cta?.campos ?? [], "titulo-5"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao-4"),
      botao: getCampoBotao(cta?.campos ?? [], "botao-3"),
    },
  };
}

export async function fetchPlanosPage(): Promise<PlanosApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/planos`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Erro ao carregar Planos: ${res.status}`);
  return (await res.json()) as PlanosApiResponse;
}

