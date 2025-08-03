# Sistema de Tradução de Língua Gestual Angolana para Fala 

Descrição do Projeto

Este projeto é uma solução tecnológica voltada para a tradução de gestos da Língua Gestual Angolana (LGA) em fala, visando facilitar a comunicação de pessoas com deficiência de fala (mudos). Ele combina tecnologias de software e hardware para oferecer uma aplicação acessível e funcional.

O sistema é composto por duas partes principais: Aplicação Web e Hardware.

- O utilizador aciona a webcam e realiza um gesto.
- A imagem é capturada e processada por um modelo de reconhecimento de gestos via Flask.
- O gesto é interpretado e a palavra correspondente é enviada para o ESP32.
- O ESP32 recebe o dado e aciona o DFPlayer Mini, que reproduz a palavra em áudio.

O desenvolvimento envolve tecnologias como Angular, Node.js e Flask no lado do software, e ESP32 e DFPlayer Mini no hardware.

## Development server 

Para iniciar o projecto, rode:

```bash
npm run dev
```
```bash
python main.py
```

Assim que o servidor estiver rodando, abra o navegador e e vá para `http://localhost:4200/`. A aplicação será automaticamente recarregada sempre que modificar o código fonte.

## Imagem Ilustrativa

<img src="https://drive.google.com/uc?export=view&id=1phUmPRptO8gJrHBEdvDUvbpSXtReE7bp" alt="demo" >

## Vantagens 

1. Tecnologias Acessíveis: Uso de Hardware de baixo custo ( ESP32 ) e Software Open-source;
2. Extensibilidade: Possibilidade de extensão para mais vocábulos.

## Contributo
Requisições Pull são bem-vindas. Para mudanças em grande escala, entre em contacto primeiro para discutirmos quais mudanças gostaria de fazer.

## Licensa
[MIT](https://choosealicense.com/licenses/mit)
