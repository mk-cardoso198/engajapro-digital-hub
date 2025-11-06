-- Inserir serviços existentes na tabela services
INSERT INTO public.services (title, description, back_image, front_image, display_order, active) VALUES
('Gestão de Redes Sociais', 'Transformamos suas redes sociais em canais de engajamento e vendas. Criamos estratégias personalizadas, gerenciamos publicações diárias, respondemos sua audiência e construímos uma comunidade leal ao redor da sua marca. Nossa equipe está sempre atenta às tendências para manter seu perfil relevante e atrativo.', '/src/assets/services/social-media-back.png', '/src/assets/services/social-media-front.png', 1, true),
('Tráfego Pago', 'Campanhas de anúncios otimizadas no Google Ads, Facebook Ads, Instagram Ads e TikTok Ads. Focamos em maximizar seu ROI através de segmentação inteligente, criativos impactantes e análise constante de métricas. Cada real investido é estrategicamente direcionado para gerar resultados mensuráveis.', '/src/assets/services/paid-traffic-back.png', '/src/assets/services/paid-traffic-front.png', 2, true),
('Marketing de Influência', 'Conectamos sua marca com influenciadores relevantes para seu nicho. Gerenciamos todo o processo: desde a seleção e negociação até a execução e mensuração de resultados. Criamos campanhas autênticas que geram engajamento real e expandem o alcance da sua marca exponencialmente.', '/src/assets/services/influencer-back.png', '/src/assets/services/influencer-front.png', 3, true),
('Produção de Conteúdo', 'Criamos conteúdo visual de alta qualidade: fotos profissionais, vídeos envolventes, motion graphics e animações. Nossa equipe criativa transforma sua mensagem em conteúdo que captura atenção, conta histórias e converte espectadores em clientes. Do conceito à produção final.', '/src/assets/services/content-back.png', '/src/assets/services/content-front.png', 4, true),
('Consultoria Estratégica', 'Desenvolvemos estratégias de marketing digital personalizadas para seu negócio. Analisamos seu mercado, concorrência e audiência para criar um plano de ação claro e efetivo. Oferecemos orientação contínua para garantir que sua marca esteja sempre à frente da competição.', '/src/assets/services/consulting-back.png', '/src/assets/services/consulting-front.png', 5, true),
('Analytics & Insights', 'Transformamos dados em decisões estratégicas. Monitoramos e analisamos todas as métricas importantes do seu negócio digital, gerando relatórios detalhados e insights acionáveis. Você entende exatamente o que está funcionando e onde investir para crescer ainda mais.', '/src/assets/services/analytics-back.png', '/src/assets/services/analytics-front.png', 6, true),
('Criação de Sites', 'Desenvolvemos sites modernos, responsivos e otimizados para conversão. Do landing page ao site institucional completo, criamos experiências digitais que representam sua marca com excelência. Cada projeto é pensado para gerar resultados, seja captar leads ou vender produtos.', '/src/assets/services/websites-back.png', '/src/assets/services/websites-front.png', 7, true),
('Criação de Sistemas', 'Criamos sistemas web personalizados para automatizar processos e otimizar sua operação. Dashboards, CRMs, ERPs e plataformas sob medida que resolvem os desafios específicos do seu negócio. Tecnologia que simplifica e potencializa seus resultados.', '/src/assets/services/systems-back.png', '/src/assets/services/systems-front.png', 8, true),
('Lojas Online', 'Desenvolvemos e-commerces completos e otimizados para vendas. Integramos com os principais meios de pagamento, sistemas de gestão de estoque e ferramentas de marketing. Sua loja online com design atrativo, navegação intuitiva e todo suporte técnico para vender mais.', '/src/assets/services/ecommerce-back.png', '/src/assets/services/ecommerce-front.png', 9, true);

-- Inserir projetos existentes na tabela projects
INSERT INTO public.projects (title, description, category, results, archived) VALUES
('Avenida F.C.', 'Gestão completa de redes sociais e criação de conteúdo estratégico para time de futebol.', 'Gestão de Redes Sociais', '+450% Engajamento', false),
('Copa Arena Futsal', 'Campanha de tráfego pago e produção de conteúdo para torneios de futsal.', 'Tráfego Pago', '8x ROAS', false),
('Bigodes FC', 'Branding completo e estratégia de marketing de influência.', 'Marketing de Influência', '+2.5M Alcance', false),
('Nalaje', 'Produção de conteúdo audiovisual e gestão de campanhas digitais.', 'Produção de Conteúdo', '+300 Projetos', false),
('Super Copa Itanhaém', 'Consultoria estratégica e analytics para evento esportivo regional.', 'Consultoria', '+180 Inscritos', false),
('CRIA', 'Estratégia digital completa e automação de marketing.', 'Analytics & Automation', '+220% Conversões', false);

-- Habilitar realtime updates para as tabelas
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.services REPLICA IDENTITY FULL;

-- Adicionar tabelas à publicação realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.services;