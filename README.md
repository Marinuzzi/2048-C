# 2048-C
# 🎮 2048-C - Il Gioco Puzzle con Stile

Un bellissimo gioco 2048 sviluppato in React con una palette di colori rossi e gialli che crea un'esperienza visiva accattivante e coinvolgente.

## 🌟 Caratteristiche

- **Design Moderno**: Interface elegante con gradienti fluidi rossi e gialli
- **Responsive**: Funziona perfettamente su desktop, tablet e mobile
- **Animazioni**: Transizioni fluide e effetti hover coinvolgenti
- **Controlli Intuitivi**: Supporto per tastiera e touch
- **Effetti Speciali**: Il leggendario 2048 ha un gradiente oro-rosso con effetto pulse

## 🚀 Demo Live

Visita il gioco: [2048-C su Vercel](https://tu-url-vercel.app)

## 🎯 Come Giocare

1. Usa le **frecce della tastiera** o i **pulsanti touch** per muovere le tessere
2. Le tessere con lo stesso numero si **fondono** quando si toccano
3. L'obiettivo è raggiungere la tessera **2048**!
4. Continua a giocare per ottenere punteggi ancora più alti

## 🛠️ Tecnologie Utilizzate

- **React 18** - Libreria UI moderna
- **Vite** - Build tool velocissimo
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript ES6+** - Linguaggio moderno

## 📦 Installazione e Sviluppo

### Prerequisiti
- Node.js (versione 16 o superiore)
- npm o yarn

### Clona il Repository
```bash
git clone https://github.com/tuo-username/2048-C.git
cd 2048-C
```

### Installa le Dipendenze
```bash
npm install
# oppure
yarn install
```

### Avvia il Server di Sviluppo
```bash
npm run dev
# oppure
yarn dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

### Build per Produzione
```bash
npm run build
# oppure
yarn build
```

## 🚀 Deploy su Vercel

### Metodo 1: Deploy Automatico da GitHub
1. Vai su [vercel.com](https://vercel.com)
2. Collega il tuo account GitHub
3. Importa il repository `2048-C`
4. Vercel rileverà automaticamente che è un progetto Vite
5. Deploy automatico! 🎉

### Metodo 2: Deploy da CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

## 📁 Struttura del Progetto

```
2048-C/
├── src/
│   ├── Game2048.jsx       # Componente principale del gioco
│   ├── main.jsx          # Entry point React
│   └── index.css         # Stili globali con Tailwind
├── public/               # File statici
├── index.html           # Template HTML
├── package.json         # Dipendenze e script
├── vite.config.js       # Configurazione Vite
├── tailwind.config.js   # Configurazione Tailwind
└── README.md           # Questo file
```

## 🎨 Palette Colori

La progressione dei colori è studiata per essere visivamente piacevole:

- **2-4**: Gialli dorati delicati
- **8-16**: Arancioni vivaci
- **32-64**: Rossi caldi
- **128-512**: Rossi intensi con ombre
- **1024**: Rosso scuro con testo oro
- **2048**: Gradiente speciale oro-rosso con effetto pulse! ✨

## 🤝 Contributi

I contributi sono benvenuti! Sentiti libero di:

1. Forkare il progetto
2. Creare un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committare le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pushare al branch (`git push origin feature/AmazingFeature`)
5. Aprire una Pull Request

## 📄 Licenza

Distribuito sotto licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## 👨‍💻 Autore

**Il Tuo Nome**
- GitHub: [@tuo-username](https://github.com/tuo-username)

## 🙏 Ringraziamenti

- Ispirato dal gioco originale 2048 di Gabriele Cirulli
- Costruito con amore e React ❤️

---

**Divertiti a giocare! 🎮**