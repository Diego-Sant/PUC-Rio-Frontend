# Front-end Puc-Rio MVP

O objetivo desse README é mostrar a inicialização do front e instalação de algumas dependências/bibliotecas.

---
## Como inicializar

Primeiramente usar o comando `npm install` no terminal para instalar quaisquer dependências que estarão no `package.json`

```
npm install
```

---
Em seguida fazer o download do "Live Server" nas extensões, clicar com o botão direto do mouse em "index.html"
e clicar em "Open with Live Server" como mostrado nas seguintes imagens.

![Extensão_live_server](img/liveserver.png)

![Abrir_com_live_server](img/openwith.png)

---
## Usar o tailwindcss

Caso tenha o interesse de fazer alguma mudança no código usando o tailwind será necessário usar o seguinte código no terminal do frontend:

```
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```
 
Essa linha de código adiciona automaticamente todas as classes que serão utilizadas no `output.css`. Por exemplo: o `flex` dentro do class no index.html automaticamente virará `.flex {display: flex;}` no css.