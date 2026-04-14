export type HomeApiIcon = {
  source: string | null;
  iconKey: string | null;
  iconSet: string | null;
  iconStyle: string | null;
};

export type HomeApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type HomeApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: HomeApiCampo[];
};

export type HomeApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: HomeApiCampo[];
    secoes: HomeApiSecao[];
  };
  message: string;
};

export type HomeContent = {
  hero: {
    card: string;
    texto1: string;
    tituloEmBranco: string;
    tituloEmAzul: string;
    texto2: string;
    botao: { texto: string; link: string } | null;
  };
  metrics: { value: string; label: string }[];
  paraQuem: {
    title: string;
    items: { label: string; iconKey: string | null }[];
    button: { texto: string; link: string } | null;
  };
  conhecaOsPlanos: {
    title: string;
    aberturas: { iconKey: string | null; titulo: string; descricao: string }[];
    botao1: { texto: string; link: string } | null;
    botao2: { texto: string; link: string } | null;
  };
  faq: {
    title: string;
    items: { pergunta: string; resposta: string }[];
  };
  cta: {
    title: string;
    descricao: string;
    botao: { texto: string; link: string } | null;
  };
};

function getSecao(secoes: HomeApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: HomeApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<HomeApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: HomeApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<HomeApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

function getCampoRepetidor(campos: HomeApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "repetidor") as
    | Extract<HomeApiCampo, { tipo: "repetidor" }>
    | undefined;
  return c?.valor ?? [];
}

export function normalizeHomeContent(api: HomeApiResponse): HomeContent {
  const secoes = api.data.secoes ?? [];

  const numeros = getSecao(secoes, "Números");
  const paraQuem = getSecao(secoes, "Para quem é");
  const conheca = getSecao(secoes, "Conheça os planos");
  const faq = getSecao(secoes, "Perguntas Frequentes");
  const cta = getSecao(secoes, "CTA");
  const banner = getSecao(secoes, "Banner");

  const heroCampos = banner?.campos?.length ? banner.campos : (api.data.campos ?? []);

  const metrics = getCampoRepetidor(numeros?.campos ?? [], "dados").map((x) => ({
    value: String(x.numeros ?? ""),
    label: String(x.textos ?? ""),
  }));

  const paraQuemItems = getCampoRepetidor(paraQuem?.campos ?? [], "servicos").map((x) => ({
    label: String(x.nome ?? ""),
    iconKey: (x.icones?.iconKey ?? null) as string | null,
  }));

  const aberturas = getCampoRepetidor(conheca?.campos ?? [], "aberturas").map((x) => ({
    iconKey: (x.icone?.iconKey ?? null) as string | null,
    titulo: String(x.titulo ?? ""),
    descricao: String(x.descricao ?? ""),
  }));

  const faqItems = getCampoRepetidor(faq?.campos ?? [], "perguntas-e-respostas").map((x) => ({
    pergunta: String(x.pergunta ?? ""),
    resposta: String(x.resposta ?? ""),
  }));

  return {
    hero: {
      card: getCampoTexto(heroCampos, "card"),
      texto1: getCampoTexto(heroCampos, "texto-1"),
      tituloEmBranco: getCampoTexto(heroCampos, "titulo-em-branco"),
      tituloEmAzul: getCampoTexto(heroCampos, "titulo-em-azul"),
      texto2: getCampoTexto(heroCampos, "texto-2"),
      botao: getCampoBotao(heroCampos, "botao-4"),
    },
    metrics,
    paraQuem: {
      title: getCampoTexto(paraQuem?.campos ?? [], "titulo"),
      items: paraQuemItems,
      button: getCampoBotao(paraQuem?.campos ?? [], "botao"),
    },
    conhecaOsPlanos: {
      title: "Conheça os planos para abrir sua empresa",
      aberturas,
      botao1: getCampoBotao(conheca?.campos ?? [], "botao-1"),
      botao2: getCampoBotao(conheca?.campos ?? [], "botao-2"),
    },
    faq: {
      title: getCampoTexto(faq?.campos ?? [], "titulo-1"),
      items: faqItems,
    },
    cta: {
      title: getCampoTexto(cta?.campos ?? [], "titulo-2"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao"),
      botao: getCampoBotao(cta?.campos ?? [], "botao-3"),
    },
  };
}

export async function fetchHomePage(): Promise<HomeApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/home`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Erro ao carregar Home: ${res.status}`);
  }
  return (await res.json()) as HomeApiResponse;
}

