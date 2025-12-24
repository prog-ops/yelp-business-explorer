Full Stack MERN & Mediator Backend for ReactJS

## Apps

1. Backend: Handles both Yelp Proxy and Product CRUD operations.
2. Frontend: ReactJS with Vite.

## Features

1. **Backend**
   - Single entry point (`index.js`).
   - Yelp API Proxy (avoids CORS issues).
   - MySQL Product Management (CRUD).
   - Tech: Express, Axios, Sequelize, CORS.
2. **Frontend**
   - Vite + React + Tailwind CSS.
   - Features: Pagination, Search, Filtering, Debouncing.

## Cara Menjalankan (Project Fix)

Berikut adalah cara menjalankan aplikasi setelah perbaikan struktur monorepo.

### Prasyarat

- Node.js terinstall.
- Database **MySQL** berjalan.
- File `.env` di folder `backend` berisi konfigurasi Database dan Yelp API Key.

### Langkah-langkah

1. **Install Dependencies**
   Jalankan perintah ini di **root folder** (folder paling luar) untuk menginstall dependency backend dan frontend sekaligus:

   ```bash
   npm install
   ```

2. **Jalankan Aplikasi**
   Cukup dengan satu perintah di root folder untuk menyalakan Backend dan Frontend secara bersamaan:

   ```bash
   npm run dev
   ```

   - Backend akan berjalan di `http://localhost:3001`
   - Frontend akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).

### Troubleshooting

- Jika port 3001 terpakai, ubah port di `.env` backend atau matikan process yang menggunakannya.
- Pastikan MySQL running sebelum menjalankan `npm run dev`.
