[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15565483&assignment_repo_type=AssignmentRepo)

# Individual Project

- _untuk kamu si pecinta dessert wkwkkwk_

# Dessert Bite - Server Side

### Endpoints

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /api/dessert`

Routes below need authentication:

- `GET /recipe`
- `POST /recipe`
- `DELETE /recipe/:id`
- `PUT /recipe/yes/:id`

### 1. POST /login

Request body:

```json
{
  "email": "zahrahfatimah@mail.com",
  "password": "zahrah123"
}
```

Response (200 - OK)

```json
{
  "accessToken": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Please input email or password"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email or password"
}
```

### 2. POST /register

Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Request body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (201 - Succes create new user)

```json
{
  "message": "success create new user",
  "user": {
    "id": 5,
    "username": "zaroooooo",
    "email": "yes@mail.com",
    "password": "$2a$10$CwF5n/iFVgVtocG79.FVn.6o3.4QO6oa4y1lVUjT46Cw2uoKLuIIq",
    "updatedAt": "2024-09-05T14:56:52.231Z",
    "createdAt": "2024-09-05T14:56:52.231Z"
  }
}
```

Response (400 - Bad Request)

```json
{
  "message": "Please input email or password"
},

```

### 3. GET /recipe

Description:

- Fetch all data from database
- only user have been login can read all data

Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response (200 - Success read recipe information)

```json
[
        {
            "id": 2,
            "sourceName": "Choco Sundae",
            "pricePerServing": 5,
            "notes": "ini enak banget harus beli lagi sama doi",
            "healthScore": 70,
            "userId": 1,
            "createdAt": "2024-09-02T15:32:01.554Z",
            "updatedAt": "2024-09-02T15:32:01.554Z"
        },
  ...,
]
```

Response (401 - Forbidden)

```json
{
  "message": "Please login first"
}
```

### 3. POST /recipe

Description:

- create new data
- only user have been login can post new data

Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Request body::

```json
{
  "sourceName": "string",
  "pricePerServing": "number",
  "notes": "string",
  "healthScore": "integer"
}
```

Response (201 - Success create new Recipe)

```json
{
   {
        "id": 24,
        "sourceName": "stobery pancake",
        "pricePerServing": 20000,
        "notes": "biasanya aku ga suka pancake tapi yang ini lembut bnanget texture nya!!!",
        "healthScore": 70,
        "userId": 2,
        "updatedAt": "2024-09-05T15:06:12.130Z",
        "createdAt": "2024-09-05T15:06:12.130Z"
    }
}
```

Response (400 - Bad Request)

```json
{
  "message": "Name is required"
},
{
  "message": "Price is required"
},
{
  "message": "Notes is required"
},
{
  "message": "userId is required"
},


```

Response (401 - Forbidden)

```json
{
  "message": "Please login first"
}
```

### 4.DELETE/recipe/:id

Description:

- Delet data from database by id
- only user have been login can get detail of product

Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response (200 - Success delete recipe with id 1)

```json
{
  "message": "Success delete recipe with id 1"
}
```

Response (401 - Forbidden)

```json
{
  "message": "Please login first"
}
```

Response (403 - Unauthorized)


Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

### 6.PUT/recipe/yes/:id

Description:

- Update data by id
- only user have been login can edit product
- user can edit their own data

Request headers:

```json
{
  "Authorization": "Bearer <your access token>"
}
```

Response (200 - Success edit product by id)

```json
{
  "message": "succes update notes mu"
}
```

Response (401 - Forbidden)

```json
{
  "message": "Please login first"
}
```

### Link Deploy

- 


# Dessert Bite - Client Side


### Landing page

- menampilkan Overview aplikasi `Dessert Bite`
- button `get started` akan langsung menuju ke halaman home / public
  ![alt text](/assets/landingP.png)

## Public Page / Fitur utama nya

- menggunakan fitur gemini Ai untuk mencari cafe sekitar jakarta yang mungkin memiki menu yang di masukkan di input contoh "starawberry cream"
  ![alt text](/assets/publicP.png)

- dan akan menampilkan hasil pencarian berupa nama kafe, deskripsi kafe, dan nama menu yang kafe tersebut miliki
  ![alt text](/assets/publicP2.png)


# Sign Up  page

- User yang belum pernah login harus register terlebih dahulu dengan mengisi form input username, email dan password
  ![alt text](/assets/regisP.png)

## Sign In  page

- User yang sudah pernah login hanya perlu login dengan email dan password saat register
  ![alt text](/assets/loginP.png)

## Dessert Library Page

- User yang telah login dapat melihat kumpulan dessert dalam bentuk card dari data API 
  ![alt text](/assets/recommendP.png)

## Dessert Info Page

- Halaman untuk mengecek informasi nutrisi dan informasi resep dengan menganalisa gambar dessert yang di upload
  ![alt text](/assets/infoP.png)
- Nutrition facts berisi perkiraan informasi detail dari gambar dessert yang di upload berupa kalori protein dll.
  ![alt text](/assets/infoP2.png)
- Top 5 Dessert recipes berisi nama menu yang mirip/serupa dengan dessert yang di upload dan link untuk mengecek resep nya
  ![alt text](/assets/infoP3.png)


## My Collection Page
- menampilkan kumpulan catatan yang User pernah buat sebelum nya
- cacatan tentang dessert yang di coba hari ini in case some day 
mau di cobain lagi (sebenarnya ini sih hobby ku)
- User bisa menambah catatan dan menghapus catatan
  ![alt text](/assets/notesP.png)