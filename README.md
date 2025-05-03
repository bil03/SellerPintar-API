# 🛍️ Sellerpintar API

Backend API untuk sistem manajemen pengguna, merchant, produk, dan variasi produk menggunakan **Node.js**, **Express.js**, **Prisma ORM**, dan **PostgreSQL**.

## 🚀 Fitur Utama

- 👤 Register & Login User (dengan Merchant)
- 🏪 Manajemen Merchant
- 📦 CRUD Produk
- 🎨 Variasi Produk (warna & ukuran)
- 📦 SKU unik + stok untuk setiap kombinasi

---

## 📂 Struktur Folder

```
src/
│
├── controller/       
├── routes/           
├── services/         
├── utils/            
├── middlewares/      
├── prismaClient.js   
```

---

## 🔧 Instalasi

```bash
git clone https://github.com/username/sellerpintar-api.git
cd sellerpintar-api
npm install
```

### Konfigurasi .env

Buat file `.env` dan isi:

```
DATABASE_URL=postgresql://user:password@localhost:5432/sellerpintar?schema=public
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Menjalankan Server

```bash
npx prisma migrate dev --name init
npm run dev
```

---

## 🧾 Dokumentasi API

### 1. 🔐 Register (User)

**POST** `/auth/register`

```json
{
  "name": "Budi",
  "email": "budi@example.com",
  "password": "password123",
}
```

**Response:**
```json
{
    "message": "Register success",
    "user": {
        "id": "3d4c8e42-e58d-4ca9-a6af-89d67ace618c",
        "name": "Jono",
        "email": "jono@example.com",
        "password": "$2b$10$KjwzxtBdv/UOoqP.l2i6yOA4gFTuzWPOtbMYIBK7gQ4qBACWTb8d."
    }
}
```

---


### 2. 🔐 Login

**POST** `/auth/login`

```json
{
  "email": "budi@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
    "message": "Login success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWRmOTEyMS03ZTI5LTRjZDgtOGFjOC04OGFmMTFkYWI4ZDIiLCJlbWFpbCI6Ik5hYmlsZmVyZGFuYUBtYWlsLmNvbSIsImlhdCI6MTc0NjI0NzE5OSwiZXhwIjoxNzQ2ODUxOTk5fQ.vgIwjgKbhc1uScHA0OZDhLhlW9-ITDhw3w2eik-S0jU",
    "user": {
        "id": "badf9121-7e29-4cd8-8ac8-88af11dab8d2",
        "name": "Budi",
        "email": "budi@example.com",
        "password": "$2b$10$Hd0J.UFYEK4LmrYBvFR98OxeLzrHckk9mVHBPNUbUI5NdGP32luM."
    }
}
```

---

### 3. 📦 Tambah Merchant

**POST** `/merchant/create`

```json
{
  "name": "Toko Kemeja",
}
```

**Response:**
```json
{
    "message": "Merchant created",
    "merchant": {
        "id": "abb24962-7b98-4d58-9d24-51225aab6e3b",
        "name": "Toko Kemeja",
        "userId": "badf9121-7e29-4cd8-8ac8-88af11dab8d2"
    }
}
```

---

### 3. 📦 List Merchant

**GET** `/merchant/`

**Response:**
```json
{
   "merchants": [
        {
            "id": "0a94d68e-8361-4fbe-8423-1831da9d41fa",
            "name": "Baju Distro",
            "userId": "badf9121-7e29-4cd8-8ac8-88af11dab8d2"
        },
        {
            "id": "94193964-057d-4c84-ae0b-eae8650b3321",
            "name": "Baju Skena",
            "userId": "badf9121-7e29-4cd8-8ac8-88af11dab8d2"
        },
        {
            "id": "75baf630-6a94-4302-9983-0983643a971b",
            "name": "Alat Olahraga",
            "userId": "badf9121-7e29-4cd8-8ac8-88af11dab8d2"
        }
    ]
}
```
---

### 4. 📋 Tambah Produk Dengan Variasi

**POST** `/api/products/:merchantId/products`

```json
{
  "name": "Kaos Polos",
  "colors": ["Merah", "Biru"],
  "sizes": ["S", "M", "L"]
}
```

**Response:**
```json
{
    "message": "Product created",
    "data": {
        "id": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
        "name": "Kaos Polos",
        "merchantId": "0a94d68e-8361-4fbe-8423-1831da9d41fa",
        "variants": [
            {
                "id": "3e175306-c639-47c6-9a5f-7ab1aca59792",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-MERAH-S-081B",
                "color": "Merah",
                "size": "S",
                "stock": 1
            },
            {
                "id": "6edbf3ae-7358-4c2f-88c1-180e9622d5bd",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-MERAH-M-0431",
                "color": "Merah",
                "size": "M",
                "stock": 1
            },
            {
                "id": "40ab532b-42f3-487f-9eda-26e145ac9fbe",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-MERAH-L-DC67",
                "color": "Merah",
                "size": "L",
                "stock": 1
            },
            {
                "id": "35765109-64d2-4e1d-aba8-b9903951df12",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-BIRU-S-4CE9",
                "color": "Biru",
                "size": "S",
                "stock": 1
            },
            {
                "id": "9111a281-88bf-4711-9a36-3d83cbda542e",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-BIRU-M-DCC3",
                "color": "Biru",
                "size": "M",
                "stock": 1
            },
            {
                "id": "fdcc7f08-7774-45ab-b120-18c8f55d06d3",
                "productId": "123ce822-0900-4de9-8eb6-e4502b5fb9ce",
                "sku": "KAOSPOLOS-BIRU-L-F519",
                "color": "Biru",
                "size": "L",
                "stock": 1
            }
        ]
    }
}
```

---

### 4. 📋 Tambah Produk Tanpa Variasi

**POST** `/api/products/:merchantId/products`

```json
{
  "name": "Bola Premium",
}
```

**Response:**
```json
{
    "message": "Product created",
    "data": {
        "id": "ab7cb6cb-8408-4475-b3d5-8fd48bb275fc",
        "name": "Bola Premium",
        "merchantId": "0a94d68e-8361-4fbe-8423-1831da9d41fa",
        "variants": [
            {
                "id": "4f2081bd-2986-42ea-b416-2d1dd13b202c",
                "productId": "ab7cb6cb-8408-4475-b3d5-8fd48bb275fc",
                "sku": "BOLAPREMIUM-52D5",
                "color": null,
                "size": null,
                "stock": 1
            }
        ]
    }
}
```
---

### 5. ✏️ Update Produk

**PUT** `/api/products/:merchantId/products/:productId`

```json
{
  "name": "Kaos Polos Premium",
  "colors": ["Merah", "Hitam"],
  "sizes": ["M", "L", "XL"]
}
```

**Response:**
```json
{
    "message": "Product updated",
    "data": {
        "id": "defdc51a-e124-48c5-abb3-275d082bc3b7",
        "name": "Kaos Polos Premium",
        "merchantId": "0a94d68e-8361-4fbe-8423-1831da9d41fa",
        "variants": [
            {
                "id": "050f8d16-a019-4c63-bcdc-6d36b18df560",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-MERAH-S-6527",
                "color": "Merah",
                "size": "S",
                "stock": 1
            },
            {
                "id": "3bb030f2-a3e4-4d1e-88d4-027299142eae",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-MERAH-M-BB90",
                "color": "Merah",
                "size": "M",
                "stock": 1
            },
            {
                "id": "0df8fe55-80ca-4887-a35b-773c6706b43c",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-MERAH-L-57FE",
                "color": "Merah",
                "size": "L",
                "stock": 1
            },
            {
                "id": "30d4c9c4-11d4-4eb5-ac4b-685c762d7f38",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-BIRU-S-F8E6",
                "color": "Biru",
                "size": "S",
                "stock": 1
            },
            {
                "id": "f18641a8-4a11-4b40-a991-4e5de7f7624c",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-BIRU-M-FC8B",
                "color": "Biru",
                "size": "M",
                "stock": 1
            },
            {
                "id": "bf08f16d-7b66-45a4-bf8d-63729026350d",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLO-BIRU-L-CD35",
                "color": "Biru",
                "size": "L",
                "stock": 1
            },
            {
                "id": "97d8ce7c-b4da-4c07-af5f-265127e25a8b",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-MERAH-M-E723",
                "color": "Merah",
                "size": "M",
                "stock": 1
            },
            {
                "id": "db18fdbf-f4cc-4850-b33a-1ac024406eec",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-MERAH-L-0190",
                "color": "Merah",
                "size": "L",
                "stock": 1
            },
            {
                "id": "38b780a8-f28a-4eec-a671-16621dc3c47f",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-MERAH-XL-0519",
                "color": "Merah",
                "size": "XL",
                "stock": 1
            },
            {
                "id": "889f95eb-7af7-43b7-bf3b-ae19ab6925fa",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-HITAM-M-2184",
                "color": "Hitam",
                "size": "M",
                "stock": 1
            },
            {
                "id": "5cd1dab6-8f61-4713-92a7-09ff8843f536",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-HITAM-L-AB18",
                "color": "Hitam",
                "size": "L",
                "stock": 1
            },
            {
                "id": "c0ce0856-28a5-4159-9496-babdbc9ebbbd",
                "productId": "defdc51a-e124-48c5-abb3-275d082bc3b7",
                "sku": "KAOSPOLOSPREMIUM-HITAM-XL-5B4A",
                "color": "Hitam",
                "size": "XL",
                "stock": 1
            }
        ]
    }
}
```

---

## 🧠 Catatan Teknis

- Setiap kombinasi warna dan ukuran menghasilkan SKU unik.
- Produk tanpa variasi tetap bisa dibuat dengan `colors` dan `sizes` kosong.

---