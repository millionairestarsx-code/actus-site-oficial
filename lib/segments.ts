import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export type Segment = {
  id: string;
  name: string;
  summary: string;
  icon: string;
  desafio: string;
  solucao: string;
  recursos: string;
  whatsappHref: string;
};

function segmentWhatsappUrl(message: string) {
  const phone = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export const segments: Segment[] = [
  {
    id: "restaurantes",
    name: "Restaurantes",
    summary:
      "Pedidos, pagamentos e retirada com menos espera e mais organização.",
    icon: "M4 18h16M7 18V9h10v9M9 9V7c0-1.7 1.3-3 3-3s3 1.3 3 3v2",
    desafio:
      "Reduzir filas no balcão, agilizar pedidos e pagamentos e organizar melhor os momentos de maior movimento.",
    solucao:
      "Autoatendimento para escolha de produtos, personalização de pedidos, pagamento e integração com o fluxo de produção e retirada.",
    recursos:
      "Cardápio digital, adicionais, combos, pagamento integrado, impressão de pedidos e cupons, retirada por senha e integração com sistemas de gestão.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para restaurantes.",
    ),
  },
  {
    id: "fast-food",
    name: "Fast-food",
    summary: "Atendimento rápido para operações de alto volume e grande giro.",
    icon: "M13 4L7 13h5l-1 7 7-10h-5z",
    desafio:
      "Atender grande volume de clientes com rapidez, reduzir filas e manter o fluxo de pedidos organizado nos horários de pico.",
    solucao:
      "Totens e software de autoatendimento preparados para operações de alta demanda, com pedidos rápidos, personalização, pagamento e direcionamento para produção.",
    recursos:
      "Combos, adicionais, sugestão de produtos, pagamento integrado, impressão, senha de retirada, integração com cozinha e sistemas de gestão.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para operações de fast-food.",
    ),
  },
  {
    id: "pizzarias",
    name: "Pizzarias",
    summary:
      "Mais autonomia para montar pedidos, adicionais e formas de pagamento.",
    icon: "M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14M12 12l4.2-2.4M12 12l.4 4.8M12 12 7.6 13",
    desafio:
      "Facilitar pedidos com diferentes tamanhos, sabores, bordas, adicionais e observações sem sobrecarregar o atendimento.",
    solucao:
      "Jornada de autoatendimento que permite ao cliente montar a pizza, personalizar o pedido, escolher complementos e realizar o pagamento de forma simples.",
    recursos:
      "Escolha de sabores, tamanhos, bordas, adicionais, bebidas, combos, pagamento integrado, impressão e integração com produção e gestão.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para pizzarias.",
    ),
  },
  {
    id: "hamburguerias",
    name: "Hamburguerias",
    summary:
      "Personalização de combos, adicionais e pedidos com uma jornada simples.",
    icon: "M6 10h12M6 14h12M8 8h8M8 16h8",
    desafio:
      "Agilizar pedidos personalizados, reduzir erros de atendimento e aumentar a capacidade da operação nos horários de maior movimento.",
    solucao:
      "Autoatendimento com montagem de hambúrgueres, escolha de combos, adicionais e pagamento em uma jornada rápida e intuitiva.",
    recursos:
      "Combos, adicionais, retirada de ingredientes, bebidas, sobremesas, pagamento integrado, impressão, senha e integração com cozinha.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para hamburguerias.",
    ),
  },
  {
    id: "varejo",
    name: "Varejo",
    summary:
      "Consulta, seleção, pagamento e atendimento complementar no ponto de venda.",
    icon: "M8 9V7a4 4 0 0 1 8 0v2M7 9h10v11H7z",
    desafio:
      "Ampliar os pontos de atendimento, reduzir filas e permitir que o cliente consulte produtos e conclua etapas da compra com mais autonomia.",
    solucao:
      "Totens configurados para consulta, seleção, orientação, pagamento ou apoio ao processo de venda dentro da operação.",
    recursos:
      "Consulta de produtos, preços e estoque, leitura de código, pagamento, impressão, retirada de senha, fidelidade e integração com ERP ou PDV.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para varejo.",
    ),
  },
  {
    id: "clinicas",
    name: "Clínicas",
    summary:
      "Check-in, organização do atendimento e jornadas digitais para pacientes.",
    icon: "M12 7v10M7 12h10M8 5h8v14H8z",
    desafio:
      "Organizar recepção, diminuir tempo de espera e simplificar check-in, confirmação e direcionamento de pacientes.",
    solucao:
      "Autoatendimento para recepção e triagem inicial, permitindo que o paciente realize etapas administrativas antes do atendimento.",
    recursos:
      "Check-in, confirmação de cadastro, emissão de senha, pagamentos, impressão, leitura de documentos e integração com sistemas da clínica.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para clínicas.",
    ),
  },
  {
    id: "hospitais",
    name: "Hospitais",
    summary:
      "Fluxos de recepção e atendimento com mais organização e direcionamento.",
    icon: "M6 20V6h12v14M10 20v-5h4v5M9 9h1.5M13.5 9H15M9 13h1.5M13.5 13H15",
    desafio:
      "Distribuir melhor a demanda da recepção, orientar pacientes e acompanhantes e tornar os fluxos administrativos mais organizados.",
    solucao:
      "Totens de autoatendimento para recepção, identificação, direcionamento e execução de etapas administrativas conforme o fluxo da instituição.",
    recursos:
      "Identificação, emissão de senha, direcionamento, check-in, impressão, pagamentos quando aplicável e integração com sistemas hospitalares.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para hospitais.",
    ),
  },
  {
    id: "hoteis",
    name: "Hotéis",
    summary: "Check-in, serviços, informações e apoio à jornada do hóspede.",
    icon: "M4 18V12h16v6M4 12V9h8v3M4 18h16",
    desafio:
      "Reduzir espera na recepção e oferecer mais autonomia ao hóspede em etapas recorrentes da jornada.",
    solucao:
      "Autoatendimento para check-in, informações, solicitações e outros serviços, integrado às necessidades da operação hoteleira.",
    recursos:
      "Check-in, consulta de reserva, identificação, pagamentos, emissão de comprovantes, informações e integração com sistemas do hotel.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para hotéis.",
    ),
  },
  {
    id: "estacionamentos",
    name: "Estacionamentos",
    summary:
      "Entrada, pagamento, validação e saída com mais autonomia e agilidade.",
    icon: "M8 5h6a4 4 0 0 1 0 8H8zM8 5v14",
    desafio:
      "Agilizar pagamento e validação, reduzir filas nos caixas e melhorar o fluxo de entrada e saída de veículos.",
    solucao:
      "Totens de autoatendimento para pagamento, validação e suporte à jornada do estacionamento, integrados ao sistema da operação.",
    recursos:
      "Leitura de ticket ou QR Code, pagamento, validação, impressão de comprovante, integração com cancelas, sistemas e controle de acesso.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para estacionamentos.",
    ),
  },
  {
    id: "eventos",
    name: "Eventos",
    summary:
      "Credenciamento, consulta, pagamento e orientação de público em grande escala.",
    icon: "M5 8h14v10H5zM5 13h2M17 13h2",
    desafio:
      "Receber grande volume de público em pouco tempo, acelerar credenciamento e organizar melhor os pontos de atendimento.",
    solucao:
      "Totens preparados para credenciamento, consulta, orientação, pagamento e outras jornadas necessárias ao evento.",
    recursos:
      "Check-in, leitura de QR Code, impressão de credenciais, consulta, pagamentos, retirada de senha e integração com plataformas de eventos.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para eventos.",
    ),
  },
  {
    id: "condominios",
    name: "Condomínios",
    summary:
      "Atendimento, identificação, acesso e serviços para moradores e visitantes.",
    icon: "M4 20V9h8v11M12 20V5h8v15M7 13h2M16 9h2M16 13h2",
    desafio:
      "Organizar atendimento, identificação e acesso de moradores, visitantes e prestadores com mais autonomia e controle.",
    solucao:
      "Autoatendimento para identificação, orientação, registro e integração com os fluxos de acesso e serviços do condomínio.",
    recursos:
      "Identificação, cadastro de visitantes, leitura de QR Code, impressão, autorização, comunicação e integração com sistemas de controle de acesso.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para condomínios.",
    ),
  },
  {
    id: "servicos",
    name: "Serviços",
    summary:
      "Autoatendimento adaptado a operações que precisam organizar demanda e reduzir espera.",
    icon: "M12 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M8 18h8M12 12v6",
    desafio:
      "Organizar a demanda, reduzir espera e permitir que tarefas simples sejam realizadas sem depender totalmente de atendimento humano.",
    solucao:
      "Jornadas de autoatendimento configuradas conforme o serviço, o perfil do público e os processos da operação.",
    recursos:
      "Triagem, retirada de senha, pagamentos, consulta, cadastro, impressão, leitura, identificação e integração com sistemas.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para operações de serviços.",
    ),
  },
  {
    id: "atendimento-corporativo",
    name: "Atendimento corporativo",
    summary:
      "Recepção, triagem, identificação e jornadas digitais para ambientes empresariais.",
    icon: "M8 20V8h8v12M4 20h16M10 12h4M10 15h4",
    desafio:
      "Modernizar recepção, identificação e triagem de visitantes, fornecedores e colaboradores em ambientes empresariais.",
    solucao:
      "Totens e software próprio para recepção digital, registro, orientação e integração com os processos internos da empresa.",
    recursos:
      "Cadastro, identificação, impressão de etiqueta ou credencial, QR Code, direcionamento, notificações e integração com sistemas corporativos.",
    whatsappHref: segmentWhatsappUrl(
      "Olá, gostaria de conhecer a solução ACTUS para atendimento corporativo.",
    ),
  },
];
