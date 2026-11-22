/* Estante da Ana — inventory transcribed from the 16 spine photographs.
   Format: title | author/editor | genre | bay (1-4) | shelf (1-4) | spine color.
   One row = one physical volume or boxed course. Unknown editions and ISBNs stay blank.
   To remove a sold item, set status: 'sold' in BOOK_OVERRIDES below. */
const INVENTORY_RAW = `
Complete German|Teach Yourself|Idiomas|1|1|#e3ca2c
Deutsche Sprachlehre für Ausländer|Schulz-Griesbach|Idiomas|1|1|#087c91
Guia de bolso: Guia de Viagens|Mandarim|Idiomas|1|1|#d6bc18
Le Robert de poche plus 2014|Le Robert|Idiomas|1|1|#2490b5
Larousse Dicionário Mini Francês/Português|Larousse|Idiomas|1|1|#a5666a
Larousse|Larousse|Idiomas|1|1|#8061a0
Oxford Mini Dictionary|Oxford|Idiomas|1|1|#ac6748
Alltagswortschatz Italienisch im Handumdrehen|Pons|Idiomas|1|1|#d8d1af
Aprenda inglês brincando: verbo To Be|Editora não identificada|Idiomas|1|1|#ddb02a
Aprenda inglês brincando: Present Continuous|Editora não identificada|Idiomas|1|1|#9c4f7e
Aprenda inglês brincando: Present Perfect|Editora não identificada|Idiomas|1|1|#30996b
English for Life Speaking|Collins|Idiomas|1|1|#206aa0
Teaching Listening Comprehension|Penny Ur|Idiomas|1|1|#252630
Como dizer tudo em francês|Ron Martinez; Lola Sfreddo|Idiomas|1|1|#b88b50
Teach Yourself Improve Your French|Teach Yourself|Idiomas|1|1|#a99043
ABC do MPB|Jorge Fernando dos Santos|Música|1|2|#c4a222
Alimentação sem carne: guia prático|Eric Slywitch|Saúde|1|2|#91a82b
Libertação animal|Peter Singer|Filosofia|1|2|#ded9c7
Autoperfeição com Hatha Yoga|Hermógenes|Bem-estar|1|2|#416c86
O dilema do vegano|Roberto Juliano|Saúde|1|2|#d1cbb8
Elizabeth Costello|J. M. Coetzee|Literatura|1|2|#138a91
Verão|J. M. Coetzee|Literatura|1|2|#dedad0
Humanidade sem raças?|Sérgio D. J. Pena|Ciências humanas|1|2|#d5b530
Conversations with Myself|Nelson Mandela|Biografia|1|2|#171e20
Mandela|Autor não identificado|Biografia|1|2|#a89b6d
Teorias de desenvolvimento da criança|Autor não identificado|Psicologia|1|3|#803049
O primeiro ano de vida|René A. Spitz|Psicologia|1|3|#d79d17
Aceleração mental|Maria Adelaide Amaral|Psicologia|1|3|#45484a
Bagagem|Adélia Prado|Poesia|1|3|#57aca4
O amor bate à porta|Fernando Pessoa|Poesia|1|3|#d88053
The Age of Absurdity|Michael Foley|Filosofia|1|3|#485452
A coragem de ser imperfeito|Brené Brown|Autoconhecimento|1|3|#ded3b8
Casamento blindado|Renato e Cristiane Cardoso|Relacionamentos|1|3|#853d45
Pedagogia espírita|Herculano Pires|Educação|1|3|#d6ca9e
Bebês e suas mães|D. W. Winnicott|Psicologia|1|3|#73a9a0
Piaget, Vygotsky e Wallon|De La Taille; Oliveira; Dantas|Educação|1|3|#dddace
Cala a boca já morreu|Letícia Junqueiro; Paola Carimsini John|Psicologia|1|3|#b31b67
Baralho dos valores e sentidos na vida|Thiago de Aquino; Shirley Simeão; Ludmila Rodrigues|Psicologia|1|3|#5c8588
Psicologia cognitiva|Robert J. Sternberg|Psicologia|1|3|#cf7153
Princípios básicos de análise do comportamento|Márcio Borges Moreira; Carlos Augusto de Medeiros|Psicologia|1|3|#dad8d0
Princípios básicos de análise do comportamento|Márcio Borges Moreira; Carlos Augusto de Medeiros|Psicologia|1|3|#343a3a
Compreender o behaviorismo|William M. Baum|Psicologia|1|3|#282a2b
Guia para compreensão e manejo do TDAH|Ronda Buitelaar; Gerrlach Faraone|Psicologia|1|3|#652c7f
Estimulação da atenção de crianças e adolescentes|Autores diversos|Psicologia|1|3|#b6243d
Inteligente mas disperso|Peg Dawson; Richard Guare|Psicologia|1|3|#492046
Introducing Psychoanalysis|Autor não identificado|Psicologia|1|4|#aa3b35
Perversão|Flávio Carvalho Ferraz|Psicologia|1|4|#6e3850
Reinventando a intimidade|Christian Dunker|Psicologia|1|4|#d6d5d0
Psicofisiologia|Marcus Lira Brandão|Psicologia|1|4|#65517c
Fisiologia humana|Dee Unglaub Silverthorn|Saúde|1|4|#232525
Freud: Primeiras publicações psicanalíticas (1893–1899)|Sigmund Freud|Psicanálise|1|4|#899ca2
Freud: Estudos sobre a histeria (1893–1895)|Sigmund Freud|Psicanálise|1|4|#25272a
Freud: Teoria da sexualidade e outros textos (1901–1905)|Sigmund Freud|Psicanálise|1|4|#303033
Freud: O chiste e sua relação com o inconsciente (1905)|Sigmund Freud|Psicanálise|1|4|#272729
Journey to the Centre of the Earth|Jules Verne|Literatura|2|1|#25272b
The Mummy Returns|Autor não identificado|Literatura|2|1|#e28d2d
Seven Stories of Mystery and Horror|Edgar Allan Poe|Literatura|2|1|#b2526e
Tales of Ten Worlds|Arthur C. Clarke|Literatura|2|1|#bf3b3a
Gulliver's Travels|Jonathan Swift|Literatura|2|1|#5694a0
A Midsummer Night's Dream|William Shakespeare|Teatro|2|1|#d5d0b7
Oliver Twist|Charles Dickens|Literatura|2|1|#ab7467
Romeo and Juliet|William Shakespeare|Teatro|2|1|#caadb9
The Picture of Dorian Gray|Oscar Wilde|Literatura|2|1|#b4aab5
The Boat Race Mystery|Janet e Ruth Swan|Literatura|2|1|#965c82
Stories of Mystery and Suspense|Edgar Allan Poe|Literatura|2|1|#d4cfc5
Mansfield Park|Jane Austen|Literatura|2|1|#604354
The End of Poverty|Jeffrey Sachs|Economia|2|1|#e4dfd1
Animal Farm|George Orwell|Literatura|2|1|#934e40
The Bottom Billion|Paul Collier|Economia|2|1|#c0bcaf
The White Man's Burden|William Easterly|Economia|2|1|#d59417
The Shortest History of Europe|John Hirst|História|2|1|#ded9c8
The Coffee Story|Peter Salmon|História|2|1|#2488ac
Nina na África|Ryszard Kapuściński|Viagem|2|2|#789081
Ébano|Ryszard Kapuściński|Viagem|2|2|#9e9b74
Manson|Jeff Guinn|Biografia|2|2|#bec529
Natural Language Understanding|Allen|Tecnologia|2|2|#202b30
Decifrar Pessoas|Jo-Ellan Dimitrius; Wendy Patrick Mazzarella|Psicologia|2|2|#e57d27
A geração ansiosa|Jonathan Haidt|Psicologia|2|2|#ded4c2
Por que crianças matam: a história real de Mary Bell|Gitta Sereny|História|2|2|#383846
Xenoglossia|Ian Stevenson|Psicologia|2|2|#254977
Longe da árvore|Andrew Solomon|Psicologia|2|2|#9cbdc3
Metodologia de pesquisa em psicologia|Shaughnessy; Zechmeister|Psicologia|2|3|#aa693d
O sentido da vida|Contardo Calligaris|Psicologia|2|3|#bd9065
A história de nós mesmos|Rodrigo Teixeira|Psicologia|2|3|#534245
Cartas a um jovem terapeuta|Contardo Calligaris|Psicologia|2|3|#bdad65
A vontade de sentido|Viktor E. Frankl|Psicologia|2|3|#8fb1ab
Psicofarmacologia para psicólogos|María Fe Bravo Ortiz|Psicologia|2|3|#d4c0b9
Introdução à psicossomática|Maria Rosa Spinelli|Psicologia|2|3|#4964a4
Introdução à psicologia forense|Paula Inez Cunha Gomide; Sérgio Said Staut Júnior|Psicologia|2|3|#596764
Orientação profissional: passo a passo|Maria Elci Spaccaquerche; Ivelise Fortim|Psicologia|2|3|#b2604a
Gestalt-terapia com crianças|Luciana Aguiar|Psicologia|2|3|#bdb9ab
O sintoma da criança e a dinâmica do casal|Isabel Cristina Gomes|Psicologia|2|3|#a36b7d
O caminho do imaginário|Alexandra Duchastel|Psicologia|2|3|#252628
Infância e psicopatologia|Daniel Marcelli; David Cohen|Psicologia|2|3|#dedbd1
Psicodiagnóstico V|Jurema Alcides Cunha|Psicologia|2|3|#803757
Psicopatologia e semiologia dos transtornos mentais|Paulo Dalgalarrondo|Psicologia|2|3|#d2ac34
Freud: A gradiva e outros textos (1906–1909)|Sigmund Freud|Psicanálise|2|4|#29292a
Freud: O homem dos ratos e outros textos (1909–1910)|Sigmund Freud|Psicanálise|2|4|#354148
Freud: O caso Schreber e outros textos (1911–1913)|Sigmund Freud|Psicanálise|2|4|#34383c
Freud: Totem e tabu e outros textos (1912–1914)|Sigmund Freud|Psicanálise|2|4|#323b43
Freud: Ensaios de metapsicologia e outros textos (1914–1916)|Sigmund Freud|Psicanálise|2|4|#283539
Freud: Conferências introdutórias à psicanálise (1916–1917)|Sigmund Freud|Psicanálise|2|4|#394a49
Freud: Psicologia das massas e análise do eu (1920–1923)|Sigmund Freud|Psicanálise|2|4|#464d4f
Freud: O mal-estar na civilização e outros textos (1930–1936)|Sigmund Freud|Psicanálise|2|4|#343f44
Freud: Moisés e o monoteísmo (1937–1939)|Sigmund Freud|Psicanálise|2|4|#3b4547
The Cambridge Advanced Learner's Dictionary|Cambridge|Idiomas|3|1|#20262b
Livro Ilustrado de Língua Brasileira de Sinais|Autor não identificado|Idiomas|3|1|#4768a1
Dicionário Visual SBS: Corpo Humano|SBS|Saúde|3|1|#2f9d9d
Dead Aid|Dambisa Moyo|Economia|3|1|#a77864
O livro da psicologia|DK|Psicologia|3|2|#a5212e
O livro da filosofia|DK|Filosofia|3|2|#d6bb2a
The Politics Book|DK|Política|3|2|#8bb650
Energia ao quadrado|Pam Grout|Bem-estar|3|2|#41484b
O universo elegante|Brian Greene|Ciência|3|2|#d2cabb
Cidadania e cultura digital: apropriações populares da internet|Catarina Tereza de Oliveira; Marisa de Nunes|Tecnologia|3|2|#355575
Máquinas de imagem|Cesar Baio|Arte e design|3|2|#716568
Redes sociais na internet|Raquel Recuero|Tecnologia|3|2|#262629
Teorias da comunicação, hoje|Ciro Marcondes Filho|Comunicação|3|2|#723e66
Mídia radical|John D. H. Downing|Comunicação|3|2|#307a86
O conceito de tecnologia, vol. II|Álvaro Vieira Pinto|Tecnologia|3|2|#303033
A história das línguas|Tore Janson|Idiomas|3|2|#333439
Língua, linguagem, linguística|Marcos Bagno|Idiomas|3|2|#a06325
Posthumanist Applied Linguistics|Alastair Pennycook|Idiomas|3|2|#343f45
Fenomenologia da percepção|Maurice Merleau-Ponty|Filosofia|3|2|#5d8b42
Metafísica da realidade|Tomás Melendo|Filosofia|3|2|#333a3c
Comportamento antissocial|Giovana Veloso Munhoz da Rocha|Psicologia|3|3|#926248
A psique adolescente|Richard Frankel|Psicologia|3|3|#544678
A família em desordem|Elisabeth Roudinesco|Psicologia|3|3|#343738
Compreender e interpretar desenhos infantis|Georges Cognet; Anna Cognet|Psicologia|3|3|#64a2a9
O processo psicodiagnóstico e as técnicas projetivas|Ocampo; Arzeno; Piccolo|Psicologia|3|3|#d5d1c3
Sobre a história do estilo cinematográfico|David Bordwell|Cinema|3|3|#343e40
O livro dos símbolos|The Archive for Research in Archetypal Symbolism|Arte e design|3|4|#303539
Mãos à Obra, vol. 1|Autor não identificado|Arquitetura|3|4|#4e5bb3
Mãos à Obra, vol. 2|Autor não identificado|Arquitetura|3|4|#488a6a
Mãos à Obra, vol. 3|Autor não identificado|Arquitetura|3|4|#c35e43
Mãos à Obra, vol. 4|Autor não identificado|Arquitetura|3|4|#8b5aa9
A construção amorosa do saber|Carlos Amadeu Botelho Byington|Educação|3|4|#d2ac24
Exercícios de pedagogia profunda|Céline Lorthiois|Educação|3|4|#7bb4af
Truques de mágica|Ciranda Cultural|Hobbies|4|1|#bd8e47
Wissenschaftliche Theorien in 30 Sekunden|Paul Parsons|Ciência|4|1|#bda97a
Sueños World Spanish 2|BBC|Idiomas|4|1|#b09b7d
Como falar em encontros científicos|Ítalo de Souza Aquino|Educação|4|1|#ba334b
Ensinar e aprender na contemporaneidade|Autor não identificado|Educação|4|1|#597e9f
O signo desconstruído|Rosemary Arrojo|Idiomas|4|1|#c5b79d
Manual da redação|Folha de S.Paulo|Comunicação|4|1|#253d48
Obras escolhidas, vol. I|Walter Benjamin|Filosofia|4|2|#d4d2c7
A significação no cinema|Christian Metz|Cinema|4|2|#b8b6ac
Culturas do passado-presente|Andreas Huyssen|Ciências humanas|4|2|#706f62
O retorno do real|Hal Foster|Arte e design|4|2|#c9bea3
Política|Nicolau Maquiavel|Política|4|2|#afa58a
O príncipe|Nicolau Maquiavel|Política|4|2|#424747
Jornalismo digital|Pollyana Ferrari|Comunicação|4|2|#b66854
Interfaces em rede|Alex Primo|Comunicação|4|2|#485078
Ensaios sobre o hibridismo|Erick Felinto|Comunicação|4|2|#4b969c
Tecnologias de comunicação e cognição|Autor não identificado|Comunicação|4|2|#343a42
Convergence Culture|Henry Jenkins|Comunicação|4|2|#30303e
Tudo sobre cinema|Philip Kemp|Cinema|4|2|#4565a6
Os ignorantes|Pedro Cardoso|Teatro|4|2|#c18362
Direção de arte em propaganda|Newton Cesar|Arte e design|4|2|#b48d78
Dicionário de símbolos na arte|Autor não identificado|Arte e design|4|2|#c28860
A notícia na TV|Olga Curado|Comunicação|4|2|#2c3734
Teorias da comunicação|Antônio Hohlfeldt; Luiz C. Martino; Vera Veiga França|Comunicação|4|2|#303035
O que é a filosofia?|Gilles Deleuze; Félix Guattari|Filosofia|4|2|#b33247
Eros, sexualidade, política|Michel Foucault|Filosofia|4|2|#ae6d61
A arte da entrevista|Autor não identificado|Comunicação|4|2|#d2c4a6
O sofrimento humano em perspectiva|Autor não identificado|Psicologia|4|3|#d8d7ce
Raízes do Brasil|Sérgio Buarque de Holanda|História|4|3|#b6bbc0
A náusea|Jean-Paul Sartre|Literatura|4|3|#282f38
Todos os contos|Clarice Lispector|Literatura|4|3|#2e2c36
The Science of Interstellar|Kip Thorne|Ciência|4|3|#282f37
Casa, apartamento, jardim|Peter Neufert; Ludwig Neff|Arquitetura|4|3|#4aa398
Psicologia do inconsciente|C. G. Jung|Psicologia|4|4|#a45486
Os últimos anos de Carl G. Jung|Aniela Jaffé|Biografia|4|4|#32345b
Compêndio da Cambridge sobre Jung|Polly Young-Eisendrath; Terence Dawson|Psicologia|4|4|#252527
Transferência e contratransferência|Murray Stein; Nathan Schwartz-Salant|Psicologia|4|4|#354474
Jung e o caminho da individuação|Murray Stein|Psicologia|4|4|#be3549
Introducing Jung|Autor não identificado|Psicologia|4|4|#d5ce8e
Memórias, sonhos, reflexões|C. G. Jung|Biografia|4|4|#4aadb4
MISCELLANEA|Jette e Léon Bonaventure|Psicologia|4|4|#ddd9cf
Psicoterapia|Marie-Louise von Franz|Psicologia|4|4|#b3b4ae
Análise junguiana de crianças|Audrey Punnett|Psicologia|4|4|#d5d2c7
O mundo secreto dos desenhos|Gregg M. Furth|Psicologia|4|4|#c4c3bd
Breve curso sobre sonhos|Robert Bosnak|Psicologia|4|4|#b7b9b5
O gato|Marie-Louise von Franz|Psicologia|4|4|#d1cec6
Sobre sentimentos e a sombra|C. G. Jung|Psicologia|4|4|#444448
Os mistérios da mulher|M. Esther Harding|Psicologia|4|4|#b6bab6
Psicoterapia junguiana e a pesquisa contemporânea com crianças|Mário Jacoby|Psicologia|4|4|#bdc7c6
Presença no corpo|Marcel Gaumond|Psicologia|4|4|#bfbea9
Os sonhos e a cura da alma|John A. Sanford|Psicologia|4|4|#b7bbb6
Os pantanais da alma|James Hollis|Psicologia|4|4|#bec4c2
A psicologia do sonho|Marie-Louise von Franz|Psicologia|4|4|#c4c4bc
Jung|Nise da Silveira|Biografia|4|4|#d87a3a
Imagens do self|Nise da Silveira|Arte e design|4|4|#bd9f4e
O desenvolvimento da personalidade|C. G. Jung|Psicologia|4|4|#86956f
O homem e seus símbolos|C. G. Jung|Psicologia|4|4|#273d57
Alquimia e a imaginação ativa|Marie-Louise von Franz|Psicologia|4|4|#4a4063
Animus e anima|Emma Jung|Psicologia|4|4|#554c80
Mulher em mudança|Autor não identificado|Psicologia|4|4|#873e5f
`;

const BOOK_OVERRIDES = {
  'O primeiro ano de vida': { candidateIsbn: '9788578276508', publicationYear: '2013', firstPublicationYear: '1945', publisher: 'WMF Martins Fontes', pages: 416, coverUrl: 'https://books.google.com/books/content?vid=ISBN9788578276508&printsec=frontcover&img=1&zoom=1&source=gbs_api', editionSource: 'https://orelhadelivro.com.br/o-primeiro-ano-de-vida-4-edicao-rene-a-spitz', synopsisSource: 'https://orelhadelivro.com.br/o-primeiro-ano-de-vida-4-edicao-rene-a-spitz' },
  'A geração ansiosa': { candidateIsbn: '9788535938531', publicationYear: '2024', publisher: 'Companhia das Letras', pages: 440, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535938531/a-geracao-ansiosa', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535938531/a-geracao-ansiosa' },
  'A coragem de ser imperfeito': { candidateIsbn: '9788543104331', publicationYear: '2016', publisher: 'Sextante', pages: 208, editionSource: 'https://sextante.com.br/products/a-coragem-de-ser-imperfeito', synopsisSource: 'https://sextante.com.br/products/a-coragem-de-ser-imperfeito' },
  'Decifrar Pessoas': { candidateIsbn: '9788535233797', publicationYear: '2010', publisher: 'Elsevier', pages: 376, editionSource: 'https://altabooks.com.br/produto/decifrar-pessoas/', synopsisSource: 'https://altabooks.com.br/produto/decifrar-pessoas/' },
  'Inteligente mas disperso': { candidateIsbn: '9786587638300', publicationYear: '2021', publisher: 'nVersos', pages: 320, editionSource: 'https://www.nversoseditora.com/product-page/inteligente-mas-disperso', synopsisSource: 'https://www.nversoseditora.com/product-page/inteligente-mas-disperso' },
  'Psicologia cognitiva': { candidateIsbn: '9788536311159', publicationYear: '2017', publisher: 'Cengage', pages: 680, editionSource: 'https://orelhadelivro.com.br/psicologia-cognitiva-2-edicao-robert-j-sternberg', synopsisSource: 'https://orelhadelivro.com.br/psicologia-cognitiva-2-edicao-robert-j-sternberg' },
  'A psique adolescente': { candidateIsbn: '9786557134726', publicationYear: '2021', publisher: 'Vozes', pages: 352, editionSource: 'https://loja.skeelo.com/ebooks/psicologia-e-comportamento/pais-e-filhos/a-psique-adolescente', synopsisSource: 'https://www.vozes.com.br/blog/a-psique-adolescente' },
  'A família em desordem': { candidateIsbn: '9788571107007', publicationYear: '2003', publisher: 'Jorge Zahar', pages: 199, editionSource: 'https://www.companhiadasletras.com.br/9788571107007-a-familia-em-desordem/p', synopsisSource: 'https://www.companhiadasletras.com.br/9788571107007-a-familia-em-desordem/p' },
  'Compreender e interpretar desenhos infantis': { candidateIsbn: '9788532645968', publicationYear: '2014', publisher: 'Vozes', pages: 240, editionSource: 'https://loja.editora.unb.br/psicologia/compreender-e-interpretar-desenhos-infantis-2165/p', synopsisSource: 'https://loja.editora.unb.br/psicologia/compreender-e-interpretar-desenhos-infantis-2165/p' },
  'O processo psicodiagnóstico e as técnicas projetivas': { candidateIsbn: '9788578271473', publicationYear: '2009', publisher: 'WMF Martins Fontes', pages: 552, editionSource: 'https://www.livrariaunesp.com.br/o-processo-psicodiagnostico-e-as-tecnicas-projetivas-maria-luisa-siquier-de-ocampo-wmf-martins-fontes-9788578271473/p', synopsisSource: 'https://www.livrariaunesp.com.br/o-processo-psicodiagnostico-e-as-tecnicas-projetivas-maria-luisa-siquier-de-ocampo-wmf-martins-fontes-9788578271473/p' },
  'Bebês e suas mães': { candidateIsbn: '9788571260559', publicationYear: '2020', publisher: 'Ubu Editora', pages: 160, editionSource: 'https://www.ubueditora.com.br/livraria/psicanalise/bebes-maes.html', synopsisSource: 'https://www.ubueditora.com.br/livraria/psicanalise/bebes-maes.html' },
  'Elizabeth Costello': { candidateIsbn: '9788535904826', publicationYear: '2004', publisher: 'Companhia das Letras', pages: 256, editionSource: 'https://www.companhiadasletras.com.br/9788535904826-elizabeth-costello-1666/p', synopsisSource: 'https://www.companhiadasletras.com.br/9788535904826-elizabeth-costello-1666/p' },
  'Comportamento antissocial': { candidateIsbn: '9788536239972', publicationYear: '2013', publisher: 'Juruá Editora', pages: 178, editionSource: 'https://www.jurua.com.br/shop_item.asp?id=23212', synopsisSource: 'https://www.jurua.com.br/shop_item.asp?id=23212' },
  'A vontade de sentido': { candidateIsbn: '9788534932684', publicationYear: '2011', publisher: 'Paulus', pages: 224, editionSource: 'https://www.loja.paulus.com.br/a-vontade-de-sentido-fundamentos-e-aplicacoes-da-logoterapia/p', synopsisSource: 'https://www.loja.paulus.com.br/a-vontade-de-sentido-fundamentos-e-aplicacoes-da-logoterapia/p' },
  'Psicopatologia e semiologia dos transtornos mentais': { candidateIsbn: '9788582715055', publicationYear: '2019', publisher: 'Artmed', pages: 520, editionSource: 'https://loja.grupoa.com.br/psicopatologia-e-semiologia-dos-transtmentais-3ed-9788582715055-p1003753', synopsisSource: 'https://loja.grupoa.com.br/psicopatologia-e-semiologia-dos-transtmentais-3ed-9788582715055-p1003753' },
  'Libertação animal': { candidateIsbn: '9788578273125', publicationYear: '2010', publisher: 'WMF Martins Fontes', pages: 461, editionSource: 'https://acervo.bn.gov.br/sophia_web/acervo/detalhe/273765?i=1', synopsisSource: 'https://www.estantevirtual.com.br/livro/libertacao-animal-061-8766-000-BK?page=1' },
  'Baralho dos valores e sentidos na vida': { candidateIsbn: '9788595010215', publisher: 'Sinopsys Editora', pages: 64, editionSource: 'https://sinopsyseditora.com.br/baralhos/baralho-dos-valores-e-dos-sentidos-na-vida-821', synopsisSource: 'https://sinopsyseditora.com.br/baralhos/baralho-dos-valores-e-dos-sentidos-na-vida-821' },
  'Cartas a um jovem terapeuta': { candidateIsbn: '9788535228083', publicationYear: '2007', publisher: 'Campus', pages: 155, editionSource: 'https://www.bertrand.pt/livro/cartas-a-um-jovem-terapeuta-contardo-calligaris/51616', synopsisSource: 'https://www.bertrand.pt/livro/cartas-a-um-jovem-terapeuta-contardo-calligaris/51616' },
  'O sintoma da criança e a dinâmica do casal': { candidateIsbn: '9788564250079', publicationYear: '2011', publisher: 'Zagodoni', pages: 144, editionSource: 'https://livrariadopsicanalista.com.br/o-sintoma-da-crianca-e-a-dinamica-do-casal', synopsisSource: 'https://livrariadopsicanalista.com.br/o-sintoma-da-crianca-e-a-dinamica-do-casal' },
  'Guia para compreensão e manejo do TDAH': { candidateIsbn: '9788582715604', publisher: 'Artmed', editionSource: 'https://www.booktoy.com.br/guia-para-compreensao-e-manejo-do-tdah-11069', synopsisSource: 'https://www.booktoy.com.br/guia-para-compreensao-e-manejo-do-tdah-11069' },
  'Perversão': { suggestedPrice: 40, priceSource: 'https://www.estantevirtual.com.br/busca/perversao-flavio-carvalho-ferraz', publisher: 'Casa do Psicólogo', synopsisSource: 'https://www.touchelivros.com.br/perversao-colecao-clinica-psicanalitica/' },
  'Freud: Primeiras publicações psicanalíticas (1893–1899)': { candidateIsbn: '9786559214006', publicationYear: '2023', publisher: 'Companhia das Letras', pages: 328, editionSource: 'https://www.companhiadasletras.com.br/livro/9786559214006/', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9786559214006/' },
  'Freud: Estudos sobre a histeria (1893–1895)': { candidateIsbn: '9788535926804', publicationYear: '2016', publisher: 'Companhia das Letras', pages: 392, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535926804/freud-1893-1895-estudos-sobre-a-histeria', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535926804/freud-1893-1895-estudos-sobre-a-histeria' },
  'Freud: Teoria da sexualidade e outros textos (1901–1905)': { candidateIsbn: '9788535927832', publicationYear: '2016', publisher: 'Companhia das Letras', pages: 408, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535927832/freud-1901-1905-tres-ensaios-sobre-a-teoria-da-sexualidade-e-outros-textos', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535927832/freud-1901-1905-tres-ensaios-sobre-a-teoria-da-sexualidade-e-outros-textos' },
  'Freud: O chiste e sua relação com o inconsciente (1905)': { candidateIsbn: '9788535927924', publicationYear: '2017', publisher: 'Companhia das Letras', pages: 320, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535927924/freud-1905-o-chiste-e-sua-relacao-com-o-inconsciente', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535927924/freud-1905-o-chiste-e-sua-relacao-com-o-inconsciente' },
  'Freud: A gradiva e outros textos (1906–1909)': { candidateIsbn: '9788535925869', publicationYear: '2015', publisher: 'Companhia das Letras', pages: 456, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535925869/freud-1906-1909-o-delirio-e-os-sonhos-na-gradiva-e-outros-textos', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535925869/freud-1906-1909-o-delirio-e-os-sonhos-na-gradiva-e-outros-textos' },
  'Freud: O homem dos ratos e outros textos (1909–1910)': { candidateIsbn: '9788535922394', publicationYear: '2013', publisher: 'Companhia das Letras', pages: 256, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535922394/freud-1909-1910-obras-completas-volume-9', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535922394/freud-1909-1910-obras-completas-volume-9' },
  'Freud: O caso Schreber e outros textos (1911–1913)': { candidateIsbn: '9788535916140', publicationYear: '2010', publisher: 'Companhia das Letras', editionSource: 'https://www.companhiadasletras.com.br/livro/9788535916140/freud-1911-1913-obras-completas-volume-10', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535916140/freud-1911-1913-obras-completas-volume-10' },
  'Freud: Totem e tabu e outros textos (1912–1914)': { candidateIsbn: '9788535921748', publicationYear: '2012', publisher: 'Companhia das Letras', pages: 448, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535921748/', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535921748/' },
  'Freud: Conferências introdutórias à psicanálise (1916–1917)': { candidateIsbn: '9788535924190', publicationYear: '2013', publisher: 'Companhia das Letras', editionSource: 'https://www.companhiadasletras.com.br/livro/9788535924190/freud-1916-1917-obras-completas-volume-13', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535924190/freud-1916-1917-obras-completas-volume-13' },
  'Freud: Psicologia das massas e análise do eu (1920–1923)': { candidateIsbn: '9788535918717', publicationYear: '2011', publisher: 'Companhia das Letras', pages: 352, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535918717/freud-1920-1923-obras-completas-volume-15', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535918717/freud-1920-1923-obras-completas-volume-15' },
  'Freud: O mal-estar na civilização e outros textos (1930–1936)': { candidateIsbn: '9788535917437', publicationYear: '2010', publisher: 'Companhia das Letras', pages: 496, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535917437/freud-1930-1936-obras-completas-volume-18', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535917437/freud-1930-1936-obras-completas-volume-18' },
  'Freud: Moisés e o monoteísmo (1937–1939)': { candidateIsbn: '9788535930504', publicationYear: '2018', publisher: 'Companhia das Letras', pages: 384, editionSource: 'https://www.companhiadasletras.com.br/livro/9788535930504/', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535930504/' },
  'Os mistérios da mulher': { firstPublicationYear: '1935', firstPublicationSource: 'https://books.google.com/books/about/Woman_s_Mysteries_Ancient_and_Modern.html?id=IqcKAQAAIAAJ', candidateIsbn: '9788534911863', publicationYear: '1998', publisher: 'Paulus', pages: 312, coverUrl: 'covers/misterios-da-mulher-paulus.png', coverCrop: [.095,0,.81,1], editionSource: 'https://www.loja.paulus.com.br/os-misterios-da-mulher-antiga-e-contemporanea/p', synopsisSource: 'https://www.loja.paulus.com.br/os-misterios-da-mulher-antiga-e-contemporanea/p' },
  'Complete German': { author: 'Paul Coggle; Heiner Schenke', suggestedPrice: 127, priceSource: 'https://www.estantevirtual.com.br/busca/teach-yourself', candidateIsbn: '9781444177367', coverUrl: 'covers/complete-german.jpg', synopsisSource: 'https://academy.hachettelearning.com/titles/paul-coggle/complete-german-learn-german-with-teach-yourself/9781444177367/', publicationYear: '2012', publisher: 'Teach Yourself' },
  'O conceito de tecnologia, vol. II': { suggestedPrice: 55, priceSource: 'https://www.estantevirtual.com.br/livro/conceito-de-tecnologia-o-v-2-FV8-8598-000-BK', candidateIsbn: '9788585910686', coverUrl: 'covers/conceito-tecnologia-v2.jpg', synopsisSource: 'https://www.contrapontoeditora.com.br/produto.php?id=50', publicationYear: '2005', publisher: 'Contraponto', pages: 808 },
  'A geração ansiosa': { suggestedPrice: 50, priceSource: 'https://www.estantevirtual.com.br/livro/a-geracao-ansiosa-COY-2934-000-BK?condition=usado&page=1', candidateIsbn: '9788535938531', coverUrl: 'covers/geracao-ansiosa.jpg' },
  'A coragem de ser imperfeito': { suggestedPrice: 29.90, priceSource: 'https://www.estantevirtual.com.br/livro/a-coragem-de-ser-imperfeito-0A6-9000-000-BK?condition=usado&page=1', candidateIsbn: '9788543104331', coverUrl: 'https://sextante.com.br/cdn/shop/files/Capa_1_9788543104331.jpg?v=1739211573', editionSource: 'https://sextante.com.br/products/a-coragem-de-ser-imperfeito', synopsisSource: 'https://sextante.com.br/products/a-coragem-de-ser-imperfeito', publicationYear: '2016', publisher: 'Sextante', pages: 208 },
  'O homem e seus símbolos': { suggestedPrice: 47.80, priceSource: 'https://www.estantevirtual.com.br/livro/o-homem-e-seus-simbolos-08M-7428-000-BK?page=1', candidateIsbn: '9788569809630', coverUrl: 'covers/homem-simbolos.jpg', editionSource: 'https://www.estantevirtual.com.br/livro/o-homem-e-seus-simbolos-08M-7428-000-BK?page=1', synopsisSource: 'https://www.estantevirtual.com.br/livro/o-homem-e-seus-simbolos-08M-7428-000-BK?page=1', publicationYear: '2016', publisher: 'HarperCollins' },
  'O livro dos símbolos': { suggestedPrice: 230, priceSource: 'https://www.estantevirtual.com.br/livro/o-livro-dos-simbolos-0IL-5988-000-BK?condition=usado&page=1' },
  'Tudo sobre cinema': { suggestedPrice: 49.90, priceSource: 'https://www.estantevirtual.com.br/livro/tudo-sobre-cinema-0V4-7608-000-BK', candidateIsbn: '9788575426685', coverUrl: 'covers/tudo-sobre-cinema.jpg', editionSource: 'https://www.estantevirtual.com.br/livro/tudo-sobre-cinema-0V4-7608-000-BK', synopsisSource: 'https://www.estantevirtual.com.br/livro/tudo-sobre-cinema-0V4-7608-000-BK', publicationYear: '2011', publisher: 'Sextante', pages: 576 },
  'Psicologia cognitiva': { suggestedPrice: 130, priceSource: 'https://www.estantevirtual.com.br/livro/psicologia-cognitiva-4ed-0V4-6990-000-BK', candidateIsbn: '9788536311159' },
  'Fisiologia humana': { suggestedPrice: 180, priceSource: 'https://www.estantevirtual.com.br/livro/fisiologia-humana-uma-abordagem-integrada-5ed-0QW-6362-000-BK?condition=usado&page=1', candidateIsbn: '9788536322841' },
  'Longe da árvore': { suggestedPrice: 40, priceSource: 'https://www.estantevirtual.com.br/livro/longe-da-arvore-05X-2665-000-BK', candidateIsbn: '9788535923209', coverUrl: 'covers/longe-da-arvore-amazon.jpg', synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535923209/longe-da-arvore', publisher: 'Companhia das Letras' },
  'Freud: Ensaios de metapsicologia e outros textos (1914–1916)': { candidateIsbn: '9788535916065', coverUrl: 'covers/freud-metapsicologia-publisher.jpg', coverCrop: [.25,.12,.51,.77], synopsisSource: 'https://www.companhiadasletras.com.br/livro/9788535916065/freud-1914-1916-obras-completas-volume-12', publicationYear: '2010', publisher: 'Companhia das Letras', pages: 312 },
  'Todos os contos': { suggestedPrice: 80, priceSource: 'https://www.estantevirtual.com.br/livro/todos-os-contos-08G-1900-000-BK?page=1', candidateIsbn: '9788532530240' },
  'Memórias, sonhos, reflexões': { suggestedPrice: 86, priceSource: 'https://www.estantevirtual.com.br/livro/memorias-sonhos-reflexoes-0WF-6457-000-BK', candidateIsbn: '9788520944196' },
  'A náusea': { suggestedPrice: 30, priceSource: 'https://www.estantevirtual.com.br/busca/a-nausea' },
  'Psicodiagnóstico V': { suggestedPrice: 100, priceSource: 'https://www.estantevirtual.com.br/livro/psicodiagnosticov-07R-1353-000-BK?page=4', candidateIsbn: '9788573077223' },
  'A família em desordem': { suggestedPrice: 20, priceSource: 'https://www.estantevirtual.com.br/livro/a-familia-em-desordem-099-5329-000-BK', candidateIsbn: '9788571107007' },
  'O livro da filosofia': { suggestedPrice: 23, priceSource: 'https://www.estantevirtual.com.br/livro/o-livro-da-filosofia-0D9-8084-000-BK?page=2', candidateIsbn: '9788525063090' }
};

// Researched edition records are visual references, not identifications of the
// physical copies. The ISBN must still be checked on each book before sale.
const REFERENCE_EDITIONS = {
  'Teaching Listening Comprehension': { candidateIsbn: '9780521287814', editionSource: 'https://shop.cambridge.org/english/product/2700030585', synopsisSource: 'https://shop.cambridge.org/english/product/2700030585', publicationYear: '1984', publisher: 'Cambridge University Press' },
  'O universo elegante': { suggestedPrice: 36.90, priceSource: 'https://www.estantevirtual.com.br/livro/o-universo-elegante-079-1225-000-BK', candidateIsbn: '9788535900989', editionSource: 'https://www.companhiadasletras.com.br/9788535900989-o-universo-elegante-6036/p', synopsisSource: 'https://www.companhiadasletras.com.br/9788535900989-o-universo-elegante-6036/p', publicationYear: '2001', publisher: 'Companhia das Letras', pages: 480 },
  'Dead Aid': { candidateIsbn: '9780374532123', editionSource: 'https://us.macmillan.com/books/9780374532123/deadaid/', synopsisSource: 'https://us.macmillan.com/books/9780374532123/deadaid/', publisher: 'Farrar, Straus and Giroux' },
  'O livro da psicologia': { suggestedPrice: 34, priceSource: 'https://www.estantevirtual.com.br/livro/o-livro-da-psicologia-0BJ-9676-000-BK?condition=usado&page=1', candidateIsbn: '9788525062499', coverUrl: 'https://static.estantevirtual.com.br/book/00/0BJ-9676-000/0BJ-9676-000_detail1.jpg?ts=1738271820455&ims=fit-in/600x800/filters:fill(fff):quality(100)', editionSource: 'https://www.estantevirtual.com.br/livro/o-livro-da-psicologia-0BJ-9676-000-BK', synopsisSource: 'https://www.estantevirtual.com.br/livro/o-livro-da-psicologia-0BJ-9676-000-BK', publicationYear: '2016', publisher: 'Globo Livros', pages: 354 },
  'O livro dos símbolos': { suggestedPrice: 230, priceSource: 'https://www.estantevirtual.com.br/livro/o-livro-dos-simbolos-0IL-5988-000-BK?condition=usado&page=1', candidateIsbn: '9783836533096', coverUrl: 'https://static.estantevirtual.com.br/book/00/0IL-5988-000/0IL-5988-000_detail1.jpg?ts=1712773327184&ims=fit-in/600x800/filters:fill(fff):quality(100)', editionSource: 'https://www.estantevirtual.com.br/livro/o-livro-dos-simbolos-0IL-5988-000-BK?condition=usado&page=1', synopsisSource: 'https://www.estantevirtual.com.br/livro/o-livro-dos-simbolos-0IL-5988-000-BK?condition=usado&page=1', publicationYear: '2012', publisher: 'Taschen', pages: 808 },
  'Elizabeth Costello': { candidateIsbn: '9780670031306', coverUrl: 'covers/elizabeth-costello-ol.jpg', editionSource: 'https://openlibrary.org/books/OL24764263M', synopsisSource: 'https://www.penguinrandomhouse.com/books/291921/elizabeth-costello-by-j-m-coetzee/9780142004814/', publicationYear: '2003', publisher: 'Viking' },
  'Conversations with Myself': { candidateIsbn: '9780374128951', coverUrl: 'covers/conversations-with-myself-ol.jpg', editionSource: 'https://openlibrary.org/books/OL24374736M', synopsisSource: 'https://us.macmillan.com/books/9780312611682/conversationswithmyself/', publicationYear: '2010', publisher: 'Farrar, Straus and Giroux' },
  'Princípios básicos de análise do comportamento': { suggestedPrice: 118, priceSource: 'https://www.estantevirtual.com.br/busca/principio-do-comportamento', candidateIsbn: '9788582715154', coverUrl: 'covers/principios-analise-comportamento-ol.jpg', editionSource: 'https://loja.grupoa.com.br/novo/eb-principios-basicos-de-anal-do-comportamento9788582715161-p1004118', synopsisSource: 'https://loja.grupoa.com.br/novo/eb-principios-basicos-de-analise-do-comportamento-07S-0931-000-BK', publicationYear: '2019', publisher: 'Artmed', pages: 320, featuredFact: { pt: 'A editora descreve esta obra como um dos principais livros-texto brasileiros da área. A 2ª edição foi totalmente atualizada e apresenta uma visão ampla do comportamento humano.', en: 'The publisher describes this as a leading Brazilian textbook in the field. The fully updated second edition offers a broad view of human behavior.' }, featuredFactSource: 'https://loja.grupoa.com.br/novo/eb-principios-basicos-de-anal-do-comportamento9788582715161-p1004118' },
  'Compreender o behaviorismo': { suggestedPrice: 84, priceSource: 'https://www.estantevirtual.com.br/livro/compreender-o-behaviorismo-087-6797-000-BK', candidateIsbn: '9788582715239', coverUrl: 'https://dl4326nmjp5rc.cloudfront.net/Custom/Content/Products/10/04/1004107_compreender-o-behaviorismo-3ed-9788582715239_l52_639159689149459123.webp', editionSource: 'https://loja.grupoa.com.br/compreender-o-behaviorismo-3ed9788582715239-p1004107', synopsisSource: 'https://loja.grupoa.com.br/compreender-o-behaviorismo-3ed9788582715239-p1004107', publicationYear: '2019', publisher: 'Artmed', pages: 300 },
  'Bebês e suas mães': { suggestedPrice: 40, priceSource: 'https://www.estantevirtual.com.br/livro/bebes-e-suas-maes-07J-3452-000-BK?condition=usado&page=1', candidateIsbn: '9788571260559', coverUrl: 'https://www.ubueditora.com.br/pub/media/catalog/product/cache/23ace5a67f8fffaa1ceb5cc9180b26d7/u/3/u3375.jpg', editionSource: 'https://www.ubueditora.com.br/livraria/psicanalise/bebes-maes.html', synopsisSource: 'https://www.ubueditora.com.br/livraria/psicanalise/bebes-maes.html', publicationYear: '2020', publisher: 'Ubu Editora', pages: 160 },
  'Journey to the Centre of the Earth': { candidateIsbn: '9780141441979', coverUrl: 'covers/journey-centre-earth-ol.jpg', editionSource: 'https://openlibrary.org/books/OL28437668M', publicationYear: '2009', publisher: 'Penguin' },
  'Seven Stories of Mystery and Horror': { candidateIsbn: '9781405075350', coverUrl: 'covers/seven-stories-mystery-ol.jpg', editionSource: 'https://openlibrary.org/books/OL27281976M', publicationYear: '2006', publisher: 'Macmillan Readers' },
  'Stories of Mystery and Suspense': { candidateIsbn: '9783125147607', coverUrl: 'covers/stories-mystery-suspense-ol.jpg', editionSource: 'https://openlibrary.org/books/OL27483185M', publicationYear: '2013', publisher: 'Klett Sprachen' },
  'The End of Poverty': { candidateIsbn: '9780713998009', coverUrl: 'covers/end-poverty-ol.jpg', editionSource: 'https://openlibrary.org/books/OL7798449M', publicationYear: '2005', publisher: 'Allen Lane' },
  'The Bottom Billion': { candidateIsbn: '9780195311457', coverUrl: 'covers/bottom-billion-ol.jpg', editionSource: 'https://openlibrary.org/books/OL7392884M', publicationYear: '2007', publisher: 'Oxford University Press' },
  "The White Man's Burden": { candidateIsbn: '9780143038825', coverUrl: 'covers/white-mans-burden-ol.jpg', editionSource: 'https://www.penguinrandomhouse.com/books/292753/the-white-mans-burden-by-william-easterly/', synopsisSource: 'https://www.penguinrandomhouse.com/books/292753/the-white-mans-burden-by-william-easterly/', publicationYear: '2007', publisher: 'Penguin', pages: 448 },
  'Psicopatologia e semiologia dos transtornos mentais': { candidateIsbn: '9788536313320', coverUrl: 'covers/psicopatologia-semiologia-ol.jpg', editionSource: 'https://openlibrary.org/books/OL46541935M', publicationYear: '2008', publisher: 'Artmed' },
  'O signo desconstruído': { suggestedPrice: 11.90, priceSource: 'https://www.estantevirtual.com.br/busca/rosemary-arrojo-o-signo-desconstruido', candidateIsbn: '9788571130623', coverUrl: 'covers/signo-desconstruido-ol.jpg', coverCrop: [.14,.015,.72,.91], editionSource: 'https://openlibrary.org/books/OL27079395M', publicationYear: '1992', publisher: 'Pontes' },
  'Convergence Culture': { candidateIsbn: '9780814742815', coverUrl: 'covers/convergence-culture-ol.jpg', editionSource: 'https://nyupress.org/9780814742952/convergence-culture/', synopsisSource: 'https://nyupress.org/9780814742952/convergence-culture/', publicationYear: '2006', publisher: 'NYU Press', pages: 368 },
  'Raízes do Brasil': { candidateIsbn: '9788535925487', coverUrl: 'covers/raizes-brasil-ol.jpg', editionSource: 'https://www.companhiadasletras.com.br/9788535925487-raizes-do-brasil-3146/p', synopsisSource: 'https://www.companhiadasletras.com.br/9788535925487-raizes-do-brasil-3146/p', publicationYear: '2015', publisher: 'Companhia das Letras', pages: 256, firstPublicationYear: '1936', firstPublicationSource: 'https://www.companhiadasletras.com.br/9788563560445-o-homem-cordial---do-mesmo-autor-de-raizes-do-brasil/p' },
  'Todos os contos': { coverUrl: 'covers/todos-contos-ol.jpg', editionSource: 'https://rocco.com.br/produto/todos-os-contos/', synopsisSource: 'https://rocco.com.br/produto/todos-os-contos/', publicationYear: '2016', publisher: 'Rocco', pages: 656, firstPublicationYear: '2015', firstPublicationSource: 'https://rocco.com.br/produto/todos-os-contos/' },
  'The Science of Interstellar': { candidateIsbn: '9780393351378', coverUrl: 'covers/science-interstellar-ol.jpg', editionSource: 'https://openlibrary.org/books/OL27173588M', publicationYear: '2014', publisher: 'W. W. Norton & Company' }
};

const SYNOPSIS_SOURCES = {
  'Teaching Listening Comprehension':'https://openlibrary.org/works/OL467424W',
  'Elizabeth Costello':'https://www.companhiadasletras.com.br/9788535904826-elizabeth-costello-1666/p',
  'Conversations with Myself':'https://us.macmillan.com/books/9780312611682/conversationswithmyself/',
  'Tales of Ten Worlds':'https://openlibrary.org/works/OL17385W',
  "Gulliver's Travels":'https://openlibrary.org/works/OL20600W',
  "A Midsummer Night's Dream":'https://openlibrary.org/works/OL259010W',
  'Oliver Twist':'https://openlibrary.org/works/OL8193478W',
  'Romeo and Juliet':'https://openlibrary.org/works/OL362427W',
  'The Picture of Dorian Gray':'https://openlibrary.org/works/OL8193416W',
  'Mansfield Park':'https://openlibrary.org/works/OL66530W',
  'The End of Poverty':'https://openlibrary.org/works/OL3849705W',
  'Animal Farm':'https://openlibrary.org/works/OL1168007W',
  'The Bottom Billion':'https://openlibrary.org/works/OL3478148W',
  "The White Man's Burden":'https://www.penguinrandomhouse.com/books/292753/the-white-mans-burden-by-william-easterly/',
  'Dead Aid':'https://us.macmillan.com/books/9780374532123/deadaid/',
  'Convergence Culture':'https://nyupress.org/9780814742952/convergence-culture/',
  'A geração ansiosa':'https://www.companhiadasletras.com.br/livro/9788535938531/a-geracao-ansiosa',
  'Bebês e suas mães':'https://www.ubueditora.com.br/livraria/psicanalise/bebes-maes.html',
  'Comportamento antissocial':'https://www.jurua.com.br/shop_item.asp?id=23212',
  'A vontade de sentido':'https://www.loja.paulus.com.br/a-vontade-de-sentido-fundamentos-e-aplicacoes-da-logoterapia/p',
  'Psicopatologia e semiologia dos transtornos mentais':'https://loja.grupoa.com.br/psicopatologia-e-semiologia-dos-transtmentais-3ed-9788582715055-p1003753',
  'Libertação animal':'https://www.estantevirtual.com.br/livro/libertacao-animal-061-8766-000-BK?page=1'
};

// A broad starting range where no title-specific Brazilian listing has been checked.
// It is intentionally not presented as an individually researched market value.
const PRICE_BANDS = {
  'Literatura':[20,45], 'Poesia':[20,45], 'Teatro':[18,40],
  'Psicologia':[35,75], 'Psicanálise':[45,90], 'Saúde':[45,95],
  'Idiomas':[20,55], 'Educação':[30,65], 'Filosofia':[25,60],
  'Arte e design':[40,95], 'Cinema':[35,80], 'Arquitetura':[55,120],
  'Tecnologia':[25,60], 'Ciência':[30,75], 'Comunicação':[25,60],
  'História':[25,60], 'Economia':[25,60], 'Biografia':[25,60],
  'Ciências humanas':[25,60], 'Política':[20,50], 'Bem-estar':[20,45],
  'Relacionamentos':[20,45], 'Autoconhecimento':[20,45], 'Viagem':[20,50],
  'Música':[20,50], 'Hobbies':[15,40]
};

const BOOKS = INVENTORY_RAW.trim().split('\n').filter(Boolean).map((line, index) => {
  const [title, author, genre, bay, shelf, color] = line.split('|');
  return {
    id: `ana-${String(index + 1).padStart(3, '0')}`,
    title, author, genre, bay: Number(bay), shelf: Number(shelf), color,
    status: 'available', condition: ['Freud: O caso Schreber e outros textos (1911–1913)', 'Freud: Totem e tabu e outros textos (1912–1914)', 'Freud: Psicologia das massas e análise do eu (1920–1923)'].includes(title) ? 'sealed' : 'used', isbn: null,
    priceRange: PRICE_BANDS[genre] || [20, 50],
    priceBasis: (BOOK_OVERRIDES[title]?.priceSource || REFERENCE_EDITIONS[title]?.priceSource) ? 'listing' : 'category',
    ...BOOK_OVERRIDES[title], ...REFERENCE_EDITIONS[title],
    synopsisSource: BOOK_OVERRIDES[title]?.synopsisSource || REFERENCE_EDITIONS[title]?.synopsisSource || SYNOPSIS_SOURCES[title] || null
  };
});
