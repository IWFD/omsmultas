const express = require('express');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(bodyParser.json());

app.post('/gerar-pdf', (req, res) => {
  const respostas = req.body;

  const doc = new PDFDocument();

  doc.fontSize(16).font('Helvetica-Bold').text('EXCELENTÍSSIMO(A) SR.(A) AUTORIDADE COMPETENTE JULGADORA DAS INFRAÇÕES DE TRÂNSITO', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('AUTO DE INFRAÇÃO DE TRÂNSITO:', { continued: true }).fontSize(13).font('Helvetica').text(` ${respostas.autoinfracao}`, { align: 'left' });
  doc.fontSize(14).font('Helvetica-Bold').text('AUTUADO(A):', { continued: true }).fontSize(13).font('Helvetica').text(` ${respostas.nome}`, { align: 'left' });
  doc.moveDown(); 

  doc.fontSize(15).font('Helvetica-Bold').text('I – DA QUALIFICAÇÃO', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Eu,', { continued: true }).text(` ${respostas.nome},`, { continued: true })
  .text(' do CPF:', { continued: true }).text(` ${respostas.cpf}`, { continued: true })
  .text(', CNH:', { continued: true }).text(` ${respostas.cnh}`, { continued: true })
  .text(', E-mail:', { continued: true }).text(` ${respostas.email}`, { continued: true })
  .text(', telefone:', { continued: true }).text(` ${respostas.telefone}`, { continued: true })
  doc.fontSize(14).font('Helvetica').text('venho através deste apresentar defesa-prévia escrita, conforme disciplina o art. 281-A do Código de Trânsito Brasileiro:', { align: 'left' });
  doc.moveDown();
  
  doc.fontSize(15).font('Helvetica-Bold').text('II – DOS FATOS E DA SUPOSTA INFRAÇÃO', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('No dia', { continued: true }).text(` ${respostas.datamulta}`, { continued: true })
  .text(',', { continued: true }).text(' o(a) autuado(a) conduzia seu veículo', { continued: true })
  .text(', placa:', { continued: true }).text(` ${respostas.placa}`, { continued: true })
  doc.fontSize(14).font('Helvetica').text('oportunidade que foi abordado por esta autoridade de trânsito.', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Na ocasião da abordagem, pela autoridade de trânsito, foi lavrado auto de infração de trânsito de codificação', { continued: true })
  doc.fontSize(14).font('Helvetica-Bold').text(` ${respostas.autoinfracao}`, { continued: true })
  doc.fontSize(14).font('Helvetica').text(' ocorre que a referida lavratura do auto de infração se deu fora da legalidade, bem como das regulamentações que tratam sobre o assunto.',
  { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Durante a lavratura do auto de infração, ato administrativo que ocorreu de forma extremamente rápida, foi possível observar claramente a displicência do agente de trânsito em preencher os campos obrigatórios constantes no auto de infração, campo estes que vinculam o agente/Estado no momento do preenchimento.'),
  doc.moveDown();
  
  doc.fontSize(14).font('Helvetica').text('Diante disso, e exercendo seu direito de contraditório e ampla defesa, pelos fundamentos que fundamentam esse pedido, o(a) autuado(a) vem requer o que segue, por ser medida de justiça:'),
  doc.moveDown();

  doc.fontSize(15).font('Helvetica-Bold').text('III – DA NECESSIDADE DA JUNTADA DO AUTO DE INFRAÇÃO NESTE PROCESSO', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('É cediço na legislação que o auto de infração será arquivado e seu registro julgado insubsistente, caso seja considerado inconsistente ou irregular (art. 281, § 1°, inciso I do Código de Trânsito Brasileiro).'),
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Conforme anteriormente relatado, o agente de trânsito não tomou os cuidados necessários no momento do preenchimento do auto de infração, situação que viciou o respectivo documento, senão vejamos.'),
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('É sabido que as informações referentes à caracterização da infração devem constar em todas as vias do auto de infração de trânsito (AIT), além disso, é pacífico o entendimento de que quando o auto de infração for lavrado em suporte físico, não poderá conter rasuras, emendas, uso de corretivos, ou qualquer tipo de adulteração (MBFT).', { align: 'left' });
  doc.moveDown();
  
  doc.fontSize(14).font('Helvetica-Bold').text('Neste exato sentido caminha a jurisprudência:', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('“Nesse sentido, em que pese a presunção de legitimidade dos atos administrativos, no caso não restou demonstrada a regularidade da autuação, pois o auto não apresenta os requisitos mínimos de identificação previstos na legislação, devendo ser anulado o auto de infração. TJDF; RInom 0715615-13.2016.8.07.0016; Segunda Turma Recursal dos juizados Especiais; Rel. Juiz João Luis Fischer Dias; Julg.08/02/2017; DJDFTE 14/02/2017; Pág. 763”', { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('“REEXAME NECESSÁRIO. MANDADO DE SEGURANÇA. INFRAÇÃO DE TRÂNSITO. EXCESSO DE VELOCIDADE. NULIDADE DO AUTO DE INFRAÇÃO DE TRÂNSITO E DAMULTA IMPOSTA POR AUSÊNCIA DE PROVA MATERIAL.POSSIBILIDADE. Auto de infração de trânsito que não observou os critérios básicos previstos no art. 280 do CTB. Fotografia do radar eletrônico ilegível. ATO administrativo ilegal. Segurança concedida em primeira instância. Sentença mantida. Reexame necessário improvido. (TJSP; RN 0003275-61.2014.8.26.0035; Ac.8813478; Águas de Lindóia; Décima Segunda Câmara de Direito Público; Rel. Des. Venicio Salles; Julg. 17/09/2015; DJESP07/10/2015)”', { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('No presente caso, o auto de infração lavrado sob o código', { continued: true })
  doc.fontSize(14).font('Helvetica-Bold').text(` ${respostas.autoinfracao}`, { continued: true })
  doc.fontSize(14).font('Helvetica').text(' se deu por talão físico, onde foi possível observar a imprudência no preenchimento do respectivo documento.',
  { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('A autoridade, que lavrou o respectivo auto de infração no dia', { continued: true })
  doc.fontSize(14).font('Helvetica-Bold').text(` ${respostas.datamulta}`, { continued: true })
  doc.fontSize(14).font('Helvetica').text(',  não disponibilizou cópia do respectivo documento, a fim de que este autuado pudesse analisa-lo e impugná-lo, situação que configura severa afronta ao direito de defesa do administrado.',
  { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Conforme determina o art. 280 do Código de Trânsito Brasileiro, o auto de infração de trânsito é documento essencial para início do processo administrativo para aplicação da penalidade de multa.', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Assim sendo, necessário que a administração pública, detentora do respectivo documento, faça a juntada do auto de infração lavrado neste procedimento de aplicação de multa. O Tribunal de Justiça do Estado Mato Grosso do Sul tem entendimento consolidado a respeito da necessidade de o auto de infração integrar o andamento processual administrativo, posto que ensejou a abertura do referido procedimento:', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('“Afigura-se razoável o direito perseguido pelo autor, pois, de fato, não consta do processo administrativo instaurado pelo Departamento Estadual de Trânsito de Mato Grosso do Sul - DETRAN/MS cópia do auto de infração nº A011787960,', { align: 'right' }), doc.fontSize(14).font('Helvetica').text('que, diga-se de passagem, relata o autor que sequer fora notificado da autuação. (TJMS. Apelação Cível n. 0801106-15.2020.8.12.0046, Chapadão do Sul, 4ª Câmara Cível, Relator (a): Des. Vladimir Abreu da Silva, j: 03/11/2021, p: 08/11/2021)”', { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('O referido pedido se faz necessário, haja vista que o enquadramento legal utilizado pela autoridade de trânsito, qual seja art. 230, inciso IX do Código de Trânsito Brasileiro, não deixou claro qual infração o administrado incorreu. A norma sancionadora diz:', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Art. 230. Conduzir o veículo:  IX - sem equipamento obrigatório ou estando este ineficiente ou inoperante;', { align: 'right' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Com essa fundamentação genérica, fica impossível que o administrado possa utilizar do contraditório e ampla defesa de forma plena, posto que não se sabe exatamente qual equipamento obrigatório, supostamente, deixou-se de utilizar no momento do flagrante.', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Da mesma forma, aplica-se caso tenha a', { continued: true })
  doc.fontSize(14).font('Helvetica-Bold').text('autoridade de trânsito entendido a respeito do equipamento ineficiente ou inoperante.', { continued: true })
  doc.fontSize(14).font('Helvetica').text(' O administrado precisa ter ciência qual equipamento estava ineficiente ou inoperante, para a partir disso apresentar argumentação específica.', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica').text('Tais informações deveriam constar no auto de infração, porém não constaram. O Manual Brasileiro de Fiscalização de Trânsito determina que o campo “observações” é de preenchimento obrigatório em determinador casos, como este:', { align: 'left' });
  doc.moveDown();

  doc.fontSize(14).font('Helvetica-Bold').text('“deverá ser preenchido, de forma obrigatória, nas infrações cuja ficha de fiscalização preveja de forma expressa, que é necessária alguma informação para caracterizar a infração, a exemplo do art. 169 do CTB (dirigir sem atenção e sem os cuidados indispensáveis à segurança).', { align: 'right' });
  doc.moveDown();

// Inserção de Imagem no doc
doc.fontSize(14).font('Helvetica').text('Neste diapasão, a ficha de fiscalização divulgada pelo Conselho Nacional de Trânsito informa mais de 15 modalidades diferentes de possivelmente infringir a o art. 230, inciso IX do Código de Trânsito Brasileiro, além disso a respectiva ficha de fiscalização cita exemplos para se constar no campo observações:', { align: 'left' });
doc.moveDown();

const imgPath = path.join(__dirname, 'imagens-doc', 'foto1.png');
doc.image(imgPath, {
  fit: [500, 500],
  align: 'center',
});
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('Ante o exposto, necessário se faz a juntada do auto de infração de trânsito lavrado no dia', { continued: true }).text(` ${respostas.datamulta}`, { continued: true })
  .text(' ', { continued: true }).text(` (${respostas.autoinfracao})`, { continued: true })
  doc.fontSize(14).font('Helvetica').text(', para se confirmar a ausência de informação imprescindível que deveria constar no respectivo documento.', { align: 'left' });
doc.moveDown();


doc.fontSize(15).font('Helvetica-Bold').text('IV – DO RECONHECIMENTO DO OFÍCIO', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('Conforme anteriormente informado, sabe-se a legislação de trânsito brasileira prevê julgamento prévio da consistência do auto de infração de trânsito:', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('Art. 281. A autoridade de trânsito, na esfera da competência estabelecida neste Código e dentro de sua circunscrição, julgará a consistência do auto de infração e aplicará a penalidade cabível. § 1º O auto de infração será arquivado e seu registro julgado insubsistente: I - se considerado inconsistente ou irregular;', { align: 'right' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('Desta forma, partindo da premissa maior de que o auto de infração foi lavrado sem informações indispensáveis e imprescindíveis, as quais influem diretamente em sua consistência, bem como no direito de defesa do administrado, necessário se faz o reconhecimento do seu arquivamento.', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('A atuação de ofício da Administração Pública advém do princípio da autotutela administrativa, o qual prevê que quando o administrador público está diante de uma irregularidade ou ilegalidade, este tem o poder-dever de revogar ou anular o respectivo ato, tendo em vista a busca pelo interesse público.', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('A atuação de ofício da Administração Pública advém do princípio da autotutela administrativa, o qual prevê que quando o administrador público está diante de uma irregularidade ou ilegalidade, este tem o poder-dever de revogar ou anular o respectivo ato, tendo em vista a busca pelo interesse público.', { align: 'center' });
doc.moveDown();

doc.fontSize(14).font('Helvetica-Bold').text('Súmula 473: A administração pode anular seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou revogá-los, por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada, em todos os casos, a apreciação judicial.', { align: 'right' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('Desta forma, tendo como premissa de que o documento, que se impugna nesta defesa, está em total dissonância da legislação de trânsito, por medida de justiça, merece o auto de infração de trânsito',  { continued: true })
doc.fontSize(14).font('Helvetica-Bold').text(` ${respostas.autoinfracao}`, { continued: true })
doc.fontSize(14).font('Helvetica-Bold').text(' ser arquivado de ofício, excluindo-se eventual pontuação do prontuário do autuado.',
{ align: 'left' });
doc.moveDown(2);

doc.fontSize(15).font('Helvetica-Bold').text('V – OS PEDIDOS', { align: 'left' });
doc.moveDown();

doc.fontSize(15).font('Helvetica').text('O autuado, através da respectiva peça, vem requer:', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica');
const conteudo = [
  'O recebimento desta defesa e dos documentos que a acompanham;',
  'A juntada da cópia do auto de infração de trânsito de lavrado sob código ND00007852;',
  'O arquivamento do auto de infração de código ND00007852, haja vista reconhecimento de ofício.',
  'A notificação do autuado no endereço que acompanha essa defesa, em caso de eventual imposição de penalidade.'
];

conteudo.forEach((item, index) => {
  doc.text(`${String.fromCharCode(65 + index)}) ${item}`, {
    lineGap: 10,
    align: 'right'
  });
  doc.moveDown(2);
});

doc.fontSize(14).font('Helvetica').text('DATA: ', { align: 'center', continued: true }).text('             ' +  respostas.datamulta, { align: 'center' });
doc.moveDown(4);

doc.fontSize(14).font('Helvetica').text('AUTUADO(A) - ', { continued: true }).fontSize(14).font('Helvetica').text(` ${respostas.nome}`, { align: 'left' });
doc.moveDown(2);

doc.fontSize(14).font('Helvetica').text('Assinatura:________________________________________________', { align: 'left' });
doc.moveDown(3);

doc.fontSize(14).font('Helvetica').text('(Documentos em Anexo)', { align: 'left' });
doc.moveDown();

doc.fontSize(14).font('Helvetica').text('- Carteira Nacional de Habilitação (CNH) do proprietário do veículo', { align: 'left' });
doc.moveDown(); 

doc.fontSize(14).font('Helvetica').text('- Documento do veículo', { align: 'left' });
doc.moveDown(); 

 
//--------------------------------------------------------------------------------------------
/*
  doc.fontSize(12).text('Pergunta: Qual é o seu nome completo?');
  doc.fontSize(12).text(`Resposta: ${respostas.nome}`);
  doc.moveDown();

  doc.fontSize(12).text('Pergunta: Informe o código do auto de infração de trânsito');
  doc.fontSize(12).text(`Resposta: ${respostas.autoinfracao}`);
  doc.moveDown();

  doc.fontSize(12).text('Pergunta: Qual é o seu CPF?');
  doc.fontSize(12).text(`Resposta: ${respostas.cpf}`);
*/
//-------------------------------------------------------------------------------------------
  const pdfFilename = 'Petição Modelo Art.230 IX CTB.pdf';
  const pdfPath = path.join(__dirname, 'backup', 'Petição Modelo Art.230 IX CTB.pdf');
  const pdfStream = fs.createWriteStream(pdfPath);
  doc.pipe(pdfStream);
  doc.end();

  pdfStream.on('finish', () => {
    res.download(pdfPath, (err) => {
      if (err) {
        console.error('Erro ao realizar o download do arquivo PDF:', err);
        res.sendStatus(500);
      }

      // Criar uma cópia do arquivo na pasta 'cofre' com a data e hora do arquivo
      const now = new Date();
      const formattedDate = format(now, 'dd-MM-yyyy_HH-mm-ss');
      const copyFilename = `${formattedDate}_${pdfFilename}`;
      const copyPath = path.join(__dirname, 'cofre', copyFilename);
      fs.copyFileSync(pdfPath, copyPath);

      fs.unlinkSync(pdfPath); // Remover o arquivo PDF da pasta 'backup' após o download
    });
  });

  pdfStream.on('error', (err) => {
    console.error('Erro ao gerar o arquivo PDF:', err);
    res.sendStatus(500);
  });
});

app.listen(3000, () => {
  console.log('\x1b[34m%s\x1b[0m', 'Mestre Israel Wilson seu servidor foi iniciado na porta 3000');
});
