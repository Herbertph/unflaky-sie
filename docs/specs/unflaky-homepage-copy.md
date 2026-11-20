# Unflaky homepage: literal copy (PT / EN)

Companion to [`unflaky-homepage.md`](unflaky-homepage.md). Source: Herbert's delivery document
`especificacao-site-unflaky-qa.pdf` (Google Drive), Section 4 (I18N dictionary of prototype v5) and Section 5 (fixed texts).

**Copy every value exactly**: punctuation, accents, typographic quotes (“ ”), em dashes (—), `·`, `⇄`, `…`.
Do not paraphrase, do not fix, do not add texts that are not in this file.

Markup inside values: `<em>` = Newsreader italic in `--gold-2`. The PDF extraction lost the original markup, so the
`<em>` placements below marked **(A)** are assumptions to be confirmed by Herbert (see spec, Assumptions).

## 1. Dictionary keys

### Top, brand and navigation

| Key | PT | EN |
|---|---|---|
| `title` | Unflaky — Quality Lab · QA para SaaS | Unflaky — Quality Lab · QA for SaaS |
| `strip.left` | Lançamento — 2 de janeiro de 2027 | Launching — January 2, 2027 |
| `strip.right` | Agenda aberta · Primeiros diagnósticos | Now booking · First diagnostics |
| `brand.role` | Quality Lab | Quality Lab |
| `nav.services` | Serviços | Services |
| `nav.standard` | Padrão | Standard |
| `nav.focus` | Foco | Focus |
| `nav.method` | Método | Method |
| `nav.cta` | Agendar diagnóstico | Book a diagnostic |

### Hero

| Key | PT | EN |
|---|---|---|
| `hero.kicker` | Consultoria de quality engineering | Quality engineering consultancy |
| `hero.h1` | Seu software `<em>`aprovado`</em>` antes de ir pro ar. **(A)** | Your software `<em>`cleared`</em>` before it ships. **(A)** |
| `hero.lede` | Testamos SaaS com o padrão de um laboratório regulado — sobretudo produtos construídos com IA, que nascem rápido e quebram em silêncio. Cada fluxo crítico é testado, cada falha sai com evidência, e cada release recebe um veredito claro: aprova ou não aprova. | We test SaaS to the standard of a regulated laboratory — especially AI-built products, which are born fast and break quietly. Every critical flow is tested, every failure ships with evidence, and every release gets a clear verdict: cleared or not cleared. |
| `hero.cta1` | Agendar um diagnóstico | Book a diagnostic |
| `hero.cta2` | Ver o padrão de teste | See the testing standard |
| `hero.note` | Remoto · Português e inglês · Clientes em qualquer lugar do mundo | Remote · English and Portuguese · Clients anywhere in the world |

### Approval protocol panel

| Key | PT | EN |
|---|---|---|
| `verdict.t` | Protocolo de aprovação | Approval protocol |
| `verdict.m` | Toda release · Sem exceção | Every release · No exceptions |
| `verdict.1` | Fluxos de receita | Revenue flows |
| `verdict.1s` | Checkout, cobrança, planos e limites | Checkout, billing, plans and limits |
| `verdict.2` | Acesso e permissões | Access & permissions |
| `verdict.2s` | Quem vê o quê — testado perfil a perfil | Who sees what — tested role by role |
| `verdict.3` | Dados e sessões | Data & sessions |
| `verdict.3s` | Login, expiração e integridade dos dados | Login, expiry and data integrity |
| `verdict.4` | Regressão automatizada | Automated regression |
| `verdict.4s` | O bug corrigido nunca volta em silêncio | A fixed bug never returns quietly |
| `verdict.foot` | Se um portão falha, a release não passa — e você sabe exatamente por quê. | If a gate fails, the release doesn't pass — and you know exactly why. |
| `verdict.stamp` | Padrão de laboratório | Laboratory standard |

### Stats and positioning

Fixed numbers in this order: **95%**, **98%**, **10**, **11** (10 and 11 are pending Herbert's confirmation, see spec FR-14).

| Key | PT | EN |
|---|---|---|
| `stat.1` | de aprovação na primeira submissão, em ambiente regulado | first-pass compliance rate in a regulated environment |
| `stat.2` | das entregas dentro do prazo, nos últimos 6 meses | on-time delivery over the last 6 months |
| `stat.3` | jurisdições no padrão de evidência que aplicamos | jurisdictions in the evidence standard we apply |
| `stat.4` | testadores sob a liderança técnica da casa, na BMM Test Labs | testers under the firm's technical lead, at BMM Test Labs |
| `stats.note` | \* Credenciais do trabalho atual da liderança técnica em testes regulados (BMM Test Labs). | \* Credentials from our technical lead's current regulated-testing work (BMM Test Labs). |
| `pos.big` | IA escreve código em minutos. Quase ninguém confere esse código como um regulador conferiria. `<em>`Nós conferimos.`</em>` **(A)** | AI writes code in minutes. Almost nobody checks that code the way a regulator would. `<em>`We do.`</em>` **(A)** |
| `pos.body` | Toda semana, SaaS novos chegam ao mercado com pagamento, login e permissões testados só pelo “caminho feliz”. O prejuízo aparece depois: na cobrança duplicada, no dado exposto, no cliente que cancela sem avisar. Nosso trabalho é encontrar isso antes — com método de laboratório, evidência reproduzível e um relatório sobre o qual o seu time consegue agir no mesmo dia. | Every week, new SaaS products ship with payments, login and permissions tested only along the “happy path”. The cost shows up later: in the double charge, the exposed data, the customer who cancels without a word. Our job is to find it first — with laboratory method, reproducible evidence, and a report your team can act on the same day. |

### Services

| Key | PT | EN |
|---|---|---|
| `svc.h` | Serviços | Services |
| `svc.side` | O que a casa entrega | What the firm delivers |
| `deliv` | Entrega | Deliverable |
| `svc.1t` | Diagnóstico de qualidade | Quality diagnostic |
| `svc.1d` | Um raio-X de duas semanas do seu produto: mapeamos os fluxos que mais custam dinheiro se quebrarem, testamos os caminhos críticos e entregamos as falhas priorizadas, cada uma com evidência. É por onde quase todo cliente começa. | A two-week X-ray of your product: we map the flows that cost the most money when they break, test the critical paths, and deliver prioritized failures, each with evidence. It's where almost every client starts. |
| `svc.1c1` | Relatório com evidências | Evidence-backed report |
| `svc.1c2` | Mapa de riscos | Risk map |
| `svc.1c3` | Plano de correção | Fix plan |
| `svc.2t` | Teste manual & exploratório | Manual & exploratory testing |
| `svc.2d` | Testes guiados por risco nos fluxos reais dos seus usuários — inclusive os casos que nenhum roteiro prevê. É onde moram os bugs que a automação não vê: a regra de negócio contraditória, o botão que some, o desconto que acumula. | Risk-guided testing of your users' real flows — including the cases no script anticipates. That's where the bugs automation can't see live: the contradictory business rule, the vanishing button, the stacking discount. |
| `svc.2c1` | Fluxos críticos | Critical flows |
| `svc.2c2` | Casos de borda | Edge cases |
| `svc.2c3` | Regressão | Regression |
| `svc.3t` | Automação com Playwright | Playwright automation |
| `svc.3d` | Suíte automatizada em Playwright + TypeScript rodando no seu CI a cada mudança, para o bug corrigido nunca voltar. O código fica no seu repositório — seu, sem dependência da consultoria para manter. | An automated suite in Playwright + TypeScript running in your CI on every change, so a fixed bug never comes back. The code lives in your repository — yours, with no dependency on us to maintain it. |
| `svc.3c3` | O código é seu | The code is yours |
| `svc.4t` | Agentes de IA, análise humana | AI agents, human judgment |
| `svc.4d` | Agentes de IA executam o ciclo de teste em escala — varredura, regressão, geração de casos. Cada achado é revisado por um especialista antes de virar relatório. Velocidade de máquina, critério de laboratório. | AI agents run the test cycle at scale — sweeps, regression, case generation. Every finding is reviewed by a specialist before it becomes a report. Machine speed, laboratory judgment. |
| `svc.4c1` | Ciclo contínuo | Continuous cycle |
| `svc.4c2` | Revisão humana | Human review |
| `svc.4c3` | Achados verificados | Verified findings |

Card 3 chips 1 and 2 are fixed (not translated): `Playwright · TypeScript` and `CI/CD`; chip 3 is `svc.3c3`.

### The house standard

| Key | PT | EN |
|---|---|---|
| `std.h` | O padrão da casa | The house standard |
| `std.side` | Como trabalhamos | How we work |
| `std.1t` | Evidência, não opinião | Evidence, not opinions |
| `std.1d` | Toda falha sai com passos para reproduzir, prints e logs. Seu time não discute se o bug existe — ele corrige. | Every failure ships with steps to reproduce, screenshots and logs. Your team doesn't debate whether the bug exists — it fixes it. |
| `std.2t` | Risco antes de roteiro | Risk before scripts |
| `std.2d` | Testamos primeiro o que custa dinheiro, dado ou reputação se quebrar. Checklist genérico vem depois — se sobrar tempo. | We test first whatever costs money, data or reputation when it breaks. Generic checklists come later — if there's time left. |
| `std.3t` | Veredito claro | A clear verdict |
| `std.3d` | Cada ciclo termina em uma de três palavras: aprovado, aprovado com ressalvas ou reprovado — com o porquê documentado. | Every cycle ends in one of three words: cleared, cleared with reservations, or not cleared — with the reasoning documented. |
| `std.bt` | Independência, por princípio | Independent, on principle |
| `std.bd` | Em 2027, não testamos jogos nem iGaming. Nossa liderança técnica segue ativa na BMM Test Labs, e testar jogos seria conflito de interesse. Essa experiência é o background que sustenta o padrão da casa — não um serviço à venda. | In 2027, we do not test games or iGaming. Our technical lead remains active at BMM Test Labs, and testing games would be a conflict of interest. That experience is the background behind the house standard — not a service for sale. |

### The focus

| Key | PT | EN |
|---|---|---|
| `focus.h` | O foco | The focus |
| `focus.lead` | Feito para SaaS — `<em>`principalmente o SaaS feito com IA.`</em>` **(A)** | Built for SaaS — `<em>`especially AI-built SaaS.`</em>` **(A)** |
| `focus.p1` | Ferramentas de IA geram um produto inteiro em dias. O que elas não geram é certeza: a regra de negócio se contradiz, a permissão fica aberta, a cobrança falha no caso que ninguém imaginou. | AI tools generate an entire product in days. What they don't generate is certainty: the business rule contradicts itself, the permission stays open, billing fails in the case nobody imagined. |
| `focus.p2` | Quanto mais rápido o código nasce, mais ele precisa de uma equipe cuja profissão é desconfiar dele — e provar onde ele quebra, antes dos seus usuários. | The faster code is born, the more it needs a team whose profession is to distrust it — and prove where it breaks, before your users do. |
| `focus.r1` | Pagamento que cobra duas vezes — ou não cobra | Billing that charges twice — or not at all |
| `focus.r2` | Usuário comum acessando área de administrador | Regular users reaching the admin area |
| `focus.r3` | Sessão que expira no meio do fluxo crítico | Sessions expiring in the middle of a critical flow |
| `focus.r4` | Regra de desconto, plano ou limite aplicada errado | Discount, plan or limit rules applied wrong |

### Sample report

| Key | PT | EN |
|---|---|---|
| `report.t` | Relatório de exemplo | Sample report |
| `report.m` | Produto fictício · 42 verificações | Fictional product · 42 checks |
| `report.1` | Checkout — clique duplo cobra duas vezes | Checkout — double click charges twice |
| `report.2` | Permissões — usuário comum abre a área admin | Permissions — regular user opens the admin area |
| `report.3` | Sessão — expira no meio do pagamento | Session — expires mid-payment |
| `report.4` | Recuperação de senha — e-mail chega em segundos | Password reset — email arrives in seconds |
| `report.5` | Upload — arquivo grande sem travar a tela | Upload — large file without freezing the UI |
| `report.sum` | Veredito: NÃO LIBERAR · 3 falhas críticas achadas antes dos usuários. | Verdict: DO NOT SHIP · 3 critical failures found before users did. |
| `report.run` | Rodar a suíte | Run the suite |
| `report.rerun` | Rodar de novo | Run it again |
| `report.running` | Rodando… | Running… |

### Method

| Key | PT | EN |
|---|---|---|
| `method.h` | Da especificação à evidência | From spec to evidence |
| `method.side` | Método | Method |
| `method.steps` (label prefix, followed by 1–4) | ETAPA | STEP |
| `method.1t` | Entender | Understand |
| `method.1d` | Lemos a especificação e usamos o produto como um usuário avançado: onde o dinheiro entra, onde o dado mora, o que não pode quebrar de jeito nenhum. | We read the spec and use the product like a power user: where the money comes in, where the data lives, what must never break. |
| `method.2t` | Planejar | Plan |
| `method.2d` | Transformamos risco em plano de teste: fluxos críticos primeiro, casos de borda mapeados, critérios de aceite claros antes de executar qualquer coisa. | We turn risk into a test plan: critical flows first, edge cases mapped, clear acceptance criteria before anything gets executed. |
| `method.3t` | Executar | Execute |
| `method.3d` | Testamos manualmente o que exige julgamento, automatizamos o que se repete e registramos cada falha com evidência reproduzível: passos, prints e logs. | We test manually what takes judgment, automate what repeats, and record every failure with reproducible evidence: steps, screenshots and logs. |
| `method.4t` | Evidenciar | Report |
| `method.4d` | Você recebe um relatório que qualquer pessoa do time entende e consegue corrigir — priorizado por impacto, sem jargão e sem achismo, com o veredito da release. | You get a report anyone on your team can understand and fix from — prioritized by impact, no jargon, no guesswork, with the release verdict. |

### Technical leadership

| Key | PT | EN |
|---|---|---|
| `lead.h` | Liderança técnica | Technical leadership |
| `lead.side` | Quem assina os relatórios | Who signs the reports |
| `lead.who` | Fundador · Líder de QA | Founder · QA Lead |
| `lead.role` | SQA Team Lead — BMM Test Labs, Dieppe, Canadá | SQA Team Lead — BMM Test Labs, Dieppe, Canada |
| `lead.alt` | Retrato de Herbert Parasio | Portrait of Herbert Parasio |
| `lead.desc` | Todo diagnóstico da casa é revisado e assinado por Herbert, que lidera hoje um time de 11 testadores em um dos maiores laboratórios de testes regulados do mundo — depois de quase 10 anos de TI em desenvolvimento e dados. É esse padrão, e não um checklist genérico, que a consultoria aplica ao seu SaaS. | Every diagnostic is reviewed and signed by Herbert, who currently leads a team of 11 testers at one of the world's largest regulated testing laboratories — after nearly 10 years in IT across development and data. That standard, not a generic checklist, is what the firm applies to your SaaS. |
| `lead.c2` | aprovação de primeira | first-pass compliance |
| `lead.c3` | jurisdições reguladas | regulated jurisdictions |

Credential chips, in order: `CTFL · ISTQB 2026` (fixed) · `95%` + `lead.c2` · `10` + `lead.c3` · `Playwright · TypeScript` (fixed).

### FAQ

| Key | PT | EN |
|---|---|---|
| `faq.h` | Perguntas frequentes | Frequently asked questions |
| `faq.1q` | Vocês testam jogos de cassino? | Do you test casino games? |
| `faq.1a` | Não. Nossa liderança técnica segue na BMM, e testar jogos seria conflito de interesse. O foco da consultoria é SaaS — especialmente produtos construídos com IA. | No. Our technical lead remains at BMM, and testing games would be a conflict of interest. The firm's focus is SaaS — especially AI-built products. |
| `faq.2q` | Vocês atendem clientes fora do Brasil? | Do you work with clients outside Brazil? |
| `faq.2a` | Sim. O trabalho é remoto, em português e inglês, com clientes em qualquer lugar do mundo — relatórios e reuniões nos dois idiomas. | Yes. The work is remote, in English and Portuguese, with clients anywhere in the world — reports and meetings in both languages. |
| `faq.3q` | Preciso já ter um time de QA? | Do I need a QA team already? |
| `faq.3a` | Não. A maioria dos clientes chega sem nenhum teste organizado. Começamos pelo diagnóstico de duas semanas, e o plano nasce dele. | No. Most clients arrive with no organized testing at all. We start with the two-week diagnostic, and the plan grows from it. |
| `faq.4q` | A automação fica comigo? | Do I keep the automation? |
| `faq.4a` | Sim. A suíte Playwright roda no seu repositório e no seu CI. Se um dia você trocar de fornecedor, o código continua seu. | Yes. The Playwright suite runs in your repository and your CI. If you ever switch providers, the code stays yours. |
| `faq.5q` | Quando vocês começam a atender? | When do you start taking clients? |
| `faq.5a` | A consultoria lança em 2 de janeiro de 2027. A agenda dos primeiros diagnósticos já está aberta — quem entra agora garante lugar na primeira turma de clientes. | The firm launches on January 2, 2027. Booking for the first diagnostics is already open — joining now secures a spot in the first client cohort. |

### Contact and footer

| Key | PT | EN |
|---|---|---|
| `contact.kicker` | Diagnóstico | Diagnostic |
| `contact.h` | Seu próximo release merece um `<em>`veredito`</em>` antes dos usuários. | Your next release deserves a `<em>`verdict`</em>` before your users. **(A, EN only)** |
| `contact.p` | Conte em que pé está o seu SaaS — o que ele faz, como foi construído, o que mais preocupa. Respondemos com uma leitura inicial do risco e os próximos passos do diagnóstico. | Tell us where your SaaS stands — what it does, how it was built, what worries you most. We'll reply with an initial read on the risk and the next steps for a diagnostic. |
| `contact.b1` | Conversar no LinkedIn | Chat on LinkedIn |
| `contact.note` | Lançamento: 2 de janeiro de 2027 · Remoto · Brasil ⇄ Canadá · PT / EN | Launching January 2, 2027 · Remote · Brazil ⇄ Canada · EN / PT |
| `footer.meta` | Quality Lab · QA para SaaS · Lançamento em 2 de janeiro de 2027 | Quality Lab · QA for SaaS · Launching January 2, 2027 |

## 2. Fixed texts (same in both languages, never translated)

| Text | Where |
|---|---|
| `UNFLAKY` | Brand name in header and footer |
| `FAQ` | Nav item and side label of section 06 |
| `SaaS · IA` | Side label of section 03 (The focus) |
| `Playwright · TypeScript`, `CI/CD` | Service card 3 chips; `Playwright · TypeScript` also as a leadership chip |
| `CTFL · ISTQB 2026` | Leadership credential chip |
| `CHK-014 · PAGAMENTOS` | Report row 1 code |
| `SEC-003 · ACESSO` | Report row 2 code |
| `AUT-021 · LOGIN` | Report row 3 code |
| `AUT-007 · LOGIN` | Report row 4 code |
| `UPL-009 · ARQUIVOS` | Report row 5 code |
| `FAIL`, `FAIL`, `FAIL`, `PASS`, `PASS` | Report row badges, in this order |
| `95%`, `98%`, `10`, `11` | Stat numbers |
| `01`–`04`, `/01`–`/04` | Gate numbers and service card indexes |
| `01`–`06` | Section header numbers |
| `Herbert Parasio` | Name on the leadership card |
| `LinkedIn`, `GitHub`, `herbertph.com` | Contact buttons (2 and 3) and footer links |

## 3. Fixed meta

- Meta description (always PT, never switches): `Unflaky — Quality Lab: consultoria de QA para SaaS, com foco em produtos construídos com IA. Diagnóstico, teste manual, automação Playwright e agentes de IA com revisão humana.`

## 4. External links (exact)

| Label | URL |
|---|---|
| LinkedIn | https://www.linkedin.com/in/herbert-cunha |
| herbertph.com | https://herbertph.com |
| GitHub | https://github.com/Herbertph |
