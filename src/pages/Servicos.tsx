import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionWrapper from "@/components/SectionWrapper";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const categories = [
  {
    title: "Abertura e Gestão Empresarial",
    desc: "",
    items: [
      {
        title: "Abertura, alteração, reativação e encerramento de empresas",
        desc: "Realizamos todos os processos junto à Receita Federal e Junta Comercial do Estado de Minas Gerais – JUCEMG para a abertura, alteração, reativação e encerramento de empresas.",
      },
      {
        title: "Consultoria Empresarial",
        desc: "Nossa Consultoria Empresarial é um serviço de diagnóstico de problemas e análise de dados da empresa, tem como objetivo auxiliar o empreendedor a melhorar a sua gestão. Com a consultoria, é possível reduzir custos, tornar processos mais eficientes, otimizar as finanças, planejar expansões do negócio e aprimorar o trabalho do setor de recursos humanos, entre outras abordagens.",
      },
      {
        title: "Declaração de Imposto de Renda Pessoa Física",
        desc: "Realizamos a declaração de imposto de renda pessoa física, analisando toda a movimentação e estudo para que o declarante pague menos imposto e fique em dia com a Receita Federal. Acompanhamos todo o processamento da declaração na base da Receita Federal, até que esteja processada e aceita.",
      },
    ],
  },
  {
    title: "Contabilidade",
    desc: "",
    items: [
      {
        title: "Lucro Real",
        desc: "O Lucro Real permite que uma empresa pague seus impostos de acordo com seus lucros reais. Isso significa que os impostos são calculados subtraindo-se os custos e despesas da receita, e as alíquotas são aplicadas sobre o lucro líquido obtido. Todas as empresas podem aderir ao Lucro Real, mas aquelas que faturam acima de R$ 78 milhões por ano são obrigadas a adotar esse regime tributário. Este regime é mais indicado para empresas com margens de lucro reduzidas, especialmente grandes indústrias ou empresas com muitas despesas.",
      },
      {
        title: "Lucro Presumido",
        desc: "O Lucro Presumido é um regime tributário em que a empresa faz a apuração simplificada do Imposto de Renda de Pessoa Jurídica (IRPJ) e da Contribuição Social sobre o Lucro Líquido (CSLL). Nele, a Receita Federal presume que uma determinada porcentagem do faturamento da empresa é o lucro. De forma geral, o Lucro Presumido pode ser usado por grande parte das empresas brasileiras, apenas seguindo alguns requisitos: a empresa deve faturar abaixo de R$ 78 milhões anuais e não deve operar em ramos específicos, como bancos e empresas públicas.",
      },
      {
        title: "Simples Nacional",
        desc: "O Simples Nacional é um regime tributário simplificado criado pelo governo brasileiro com o objetivo de unificar diversos impostos e contribuições em uma única guia de pagamento. Ele foi implementado pela Lei Complementar 123/2006 e oferece uma forma simplificada de cumprir obrigações fiscais para empresas com faturamento anual de até R$ 4,8 milhões. Uma das principais vantagens é a unificação de impostos como IRPJ, CSLL, ICMS e ISS em uma única guia de pagamento.",
      },
    ],
  },
  {
    title: "Fiscal e Tributário",
    desc: "",
    items: [
      {
        title: "Recuperação Fiscal",
        desc: "A recuperação tributária é um processo no qual o governo restitui impostos ou taxas que foram pagos pelo contribuinte de forma indevida ou a maior. Todas empresas e pessoas físicas têm direito a solicitar caso erros sejam identificados. Realizamos todos os processos necessários para a recuperação desses valores, gerando crédito no valor recolhido indevidamente ou a maior. Existem duas modalidades: por compensação (utilizar o crédito para compensar débitos existentes) ou por restituição (receber os valores através de depósito em conta bancária).",
      },
      {
        title: "Apuração dos Impostos (Federais / Estaduais / Municipais)",
        desc: "A apuração dos impostos é o processo de cálculo dos tributos devidos por uma empresa ou pessoa física com base em suas atividades econômicas. Esse procedimento é realizado periodicamente, sendo mensalmente, trimestralmente ou anualmente, apurando os impostos: ICMS, ISS, IRPJ, CSLL, PIS, COFINS, entre outros. A apuração é um processo complexo de grande relevância para garantir que a sua empresa esteja em conformidade com as leis fiscais, evitando multas e penalidades.",
      },
      {
        title: "Obrigações Acessórias Federais, Estaduais e Municipais",
        desc: "As obrigações acessórias funcionam como compromissos que as empresas têm perante o fisco, relacionados, principalmente, à prestação de informações. Ainda que não envolvam o pagamento de tributos, são essenciais para que o Estado possa fiscalizar e assegurar-se de que as obrigações principais estão sendo cumpridas corretamente.",
      },
      {
        title: "Planejamento Tributário",
        desc: "O planejamento tributário é um conjunto de medidas administrativas e executivas que uma empresa coloca em ação para prever a sua tributação, com o objetivo de recolher impostos da forma mais leve possível e até tirar vantagem do regime tributário. Ele surge da necessidade de mitigar o peso dos impostos, tratando-o como um custo intrínseco ao negócio.",
      },
    ],
  },
  {
    title: "Departamento Pessoal",
    desc: "",
    items: [
      {
        title: "Registro de Empregados",
        desc: "O registro de empregados a que se refere o artigo 41 da CLT, pertence ao empregador e deverá conter obrigatoriamente nome do empregado, data de nascimento, filiação, nacionalidade, naturalidade, número e série da CTPS, número de identificação no PIS/PASEP, data de admissão, cargo e função, remuneração, jornada de trabalho, férias, acidente do trabalho ou doenças profissionais quando houver.",
      },
      {
        title: "Folha de Pagamento",
        desc: "O processo de folha de pagamento envolve várias etapas: registro de horas trabalhadas, cálculo do INSS, salários e benefícios, aplicação de descontos e deduções, e a preparação de documentos legais como recibos de pagamentos e guias de recolhimento de tributos. Esse processo é repetido mensalmente pelo Departamento Pessoal e requer precisão para garantir que todos os pagamentos sejam feitos corretamente e dentro do prazo. A folha de pagamento desempenha um papel fundamental na gestão financeira, no cumprimento das obrigações trabalhistas e na manutenção de um ambiente de trabalho saudável e motivador.",
      },
      {
        title: "Décimo Terceiro Salário",
        desc: "O décimo terceiro salário é um direito trabalhista que corresponde a uma gratificação anual paga a todos os funcionários que trabalham no regime CLT. O cálculo do valor do décimo terceiro é feito com base na remuneração mensal do trabalhador: divide-se o salário bruto por 12 e multiplica-se pelo número de meses trabalhados. Quem trabalha o ano inteiro recebe um valor igual ao salário integral.",
      },
      {
        title: "Controle de Férias",
        desc: "O controle de férias é um processo que monitora e administra as férias dos funcionários da empresa, de forma a garantir que elas sejam de acordo com a lei e não prejudiquem o funcionamento da organização.",
      },
      {
        title: "Rescisão Contratual",
        desc: "A rescisão de contrato de trabalho é o processo de encerramento da relação entre o empregador e o empregado. Ela pode acontecer por demissão sem justa causa, demissão por justa causa, pedido de demissão, término de contrato por prazo determinado ou acordo mútuo entre as partes. A rescisão é oficializada por meio do Termo de Rescisão de Contrato de Trabalho (TRCT), que deve ser assinado por ambas as partes.",
      },
      {
        title: "Obrigações Acessórias do DP",
        desc: "As obrigações acessórias do departamento pessoal são declarações que a empresa deve apresentar em relação a suas atividades, direitos trabalhistas e tributos. Incluem: eSocial, EFD-REINF, DCTFWEB, GRFGTS e DARF. Para cumprimento, o departamento pessoal deve levantar todos os dados com antecedência, atender os prazos definidos em lei e acompanhar as publicações oficiais da Receita Federal, Ministério da Economia e da Caixa Econômica Federal.",
      },
    ],
  },
];

export default function Servicos() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 py-20 md:py-28">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="heading-display text-4xl md:text-5xl mb-4">Nossos Serviços</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A Conta Web realiza atendimento a empresas comerciais, industriais, serviços, construção civil e entidades do terceiro setor. Formando e profissionalizando a equipe de apoio ao cumprimento das obrigações acessórias em geral e seus reflexos, visando as soluções contábeis e gerenciais.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, ci) => (
        <SectionWrapper key={cat.title} className={ci % 2 === 1 ? "bg-secondary/30" : ""}>
          <div className="mb-10">
            <h2 className="heading-display text-2xl md:text-3xl">{cat.title}</h2>
            {cat.desc && <p className="text-muted-foreground mt-2">{cat.desc}</p>}
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {cat.items.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Card className="h-full rounded-2xl hover:shadow-lg transition-shadow border-border/50">
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-display font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </SectionWrapper>
      ))}

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center bg-gradient-to-br from-primary to-sky-light rounded-3xl p-10 md:p-16 text-primary-foreground">
          <h2 className="heading-display text-3xl md:text-4xl mb-4">Precisa de algo específico?</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
            Fale com nossos contadores e encontraremos a solução ideal para a sua empresa.
          </p>
          <Button asChild size="lg" className="rounded-full bg-background text-foreground hover:bg-background/90">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" /> Falar com Contador
            </a>
          </Button>
        </div>
      </SectionWrapper>
    </main>
  );
}
