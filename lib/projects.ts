export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  category: string;
  color: string;
  hoverColor?: string;
}

export const projects: Project[] = [
  {
    id: 'pitstop-jhovy',
    title: 'Pit-stop / Jhovy',
    description: 'Sistema completo de delivery para restaurantes. Cardápio digital, gestão de pedidos e rastreamento em tempo real — tudo na palma da mão.',
    image: '/images/jhovy-pitstop.png',
    url: 'https://jhovy.vercel.app/pit-stop',
    category: 'Sistema SaaS',
    color: '#f59e0b',
  },
  {
    id: 'lumen-tasks',
    title: 'Lumen Tasks',
    description: 'Gerenciador de rotinas e atividades com tracking de tempo. Visualize exatamente onde suas horas vão em dashboards dinâmicos.',
    image: '/images/lumen-tasks.png',
    url: 'https://taskscontrol.vercel.app/',
    category: 'Produtividade',
    color: '#22d3ee',
    hoverColor: 'rgb(26, 92, 132)',
  },
  {
    id: 'ese-rastreamento',
    title: 'ESE Segurança',
    description: 'Landing page de conversão para empresa de rastreamento de frotas. Segurança, controle e tecnologia que protegem o que mais importa.',
    image: '/images/ese-rastreamento.png',
    url: 'https://ese-seguranca.vercel.app/',
    category: 'Landing Page',
    color: '#3b82f6',
    hoverColor: 'rgb(48, 104, 198)',
  },
  {
    id: 'jhovy-delivery',
    title: 'Jhovy Delivery',
    description: 'Landing page de vendas para o sistema Jhovy. Converte restaurantes em máquinas de venda com copy persuasivo e UX focado.',
    image: '/images/jhovy-delivery.png',
    url: 'https://jhovy-delivery.vercel.app/',
    category: 'Landing Page',
    color: '#f97316',
    hoverColor: 'rgb(95, 89, 84)',
  },
  {
    id: 'financas',
    title: 'Finanças',
    description: 'App de educação financeira para jovens e microempreendedores. Controle gastos, defina limites e acompanhe relatórios por período.',
    image: '/images/financas.png',
    url: 'https://financial-control-sandy.vercel.app/',
    category: 'Fintech',
    color: '#fb923c',
    hoverColor: 'rgb(196, 86, 18)',
  },
];
