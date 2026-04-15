export type ContatoApiCampo =
  | { nome: string; identificador: string; tipo: "texto"; valor: string }
  | { nome: string; identificador: string; tipo: "botao"; valor: { texto: string; link: string } }
  | {
      nome: string;
      identificador: string;
      tipo: "repetidor";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valor: any[];
    };

export type ContatoApiSecao = {
  id: number;
  nome: string;
  ordem: number;
  campos: ContatoApiCampo[];
};

export type ContatoApiResponse = {
  success: boolean;
  data: {
    id: number;
    titulo: string;
    slug: string;
    status: string;
    campos: ContatoApiCampo[];
    secoes: ContatoApiSecao[];
  };
  message: string;
};

export type ContatoContent = {
  banner: { titulo: string; descricao: string };
  cta: { titulo: string; descricao: string; botao: { texto: string; link: string } | null };
};

function getSecao(secoes: ContatoApiSecao[], nome: string) {
  return secoes.find((s) => s.nome.toLowerCase() === nome.toLowerCase()) ?? null;
}

function getCampoTexto(campos: ContatoApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "texto") as
    | Extract<ContatoApiCampo, { tipo: "texto" }>
    | undefined;
  return c?.valor ?? "";
}

function getCampoBotao(campos: ContatoApiCampo[], identificador: string) {
  const c = campos.find((x) => x.identificador === identificador && x.tipo === "botao") as
    | Extract<ContatoApiCampo, { tipo: "botao" }>
    | undefined;
  return c?.valor ?? null;
}

export function normalizeContatoContent(api: ContatoApiResponse): ContatoContent {
  const secoes = api.data.secoes ?? [];
  const banner = getSecao(secoes, "Banner");
  const cta = getSecao(secoes, "CTA");

  return {
    banner: {
      titulo: getCampoTexto(banner?.campos ?? [], "titulo"),
      descricao: getCampoTexto(banner?.campos ?? [], "descricao"),
    },
    cta: {
      titulo: getCampoTexto(cta?.campos ?? [], "titulo-1"),
      descricao: getCampoTexto(cta?.campos ?? [], "descricao-1"),
      botao: getCampoBotao(cta?.campos ?? [], "botao"),
    },
  };
}

export async function fetchContatoPage(): Promise<ContatoApiResponse> {
  const base = (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_CMS_BASE_URL ?? "";
  const url = `${base}/admin/api/pages/contato`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Erro ao carregar Contato: ${res.status}`);
  return (await res.json()) as ContatoApiResponse;
}

