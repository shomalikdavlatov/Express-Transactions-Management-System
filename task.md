# Transaction API Documentation

## 1. Userdan Userga Pul O'tkazish API

### Endpoint: `/transactions/transfer`

**Method:** `POST`

### Request Body:

```json
{
  "fromUserId": "string", // Pul yuboruvchi foydalanuvchi ID-si
  "toUserId": "string", // Pul qabul qiluvchi foydalanuvchi ID-si
  "amount": "number" // O'tkazma summasi
}
```

### Response:

#### Success (200 OK):

```json
{
  "transactionId": "string",
  "status": "success",
  "message": "Transaction completed successfully."
}
```

#### Errors:

- **400 Bad Request** - Agar foydalanuvchi balansida mablag' yetarli bo'lmasa

```json
{
  "status": "failed",
  "message": "Insufficient balance."
}
```

- **403 Forbidden** - Agar foydalanuvchi oy limitidan oshib ketgan bo'lsa

```json
{
  "status": "failed",
  "message": "Monthly transfer limit exceeded."
}
```

- **404 Not Found** - Agar foydalanuvchi mavjud bo'lmasa

```json
{
  "status": "failed",
  "message": "User not found."
}
```

---

## 2. Foydalanuvchi Balansini Tekshirish API

### Endpoint: `/users/{userId}/balance`

**Method:** `GET`

### Response:

#### Success (200 OK):

```json
{
  "userId": "string",
  "balance": "number",
  "monthlyLimit": "number",
  "usedLimit": "number"
}
```

---

## 3. O'tkazmalar Tarixi API

### Endpoint: `/transactions/history/{userId}`

**Method:** `GET`

### Response:

#### Success (200 OK):

```json
[
  {
    "transactionId": "string",
    "fromUserId": "string",
    "toUserId": "string",
    "amount": "number",
    "status": "success | failed",
    "timestamp": "string"
  }
]
```

---

## 4. Oylik Limitni Yangilash API

### Endpoint: `/users/{userId}/limit`

**Method:** `PUT`

### Request Body:

```json
{
  "newLimit": "number"
}
```

### Response:

#### Success (200 OK):

```json
{
  "userId": "string",
  "newLimit": "number",
  "message": "Monthly limit updated successfully."
}
```

#### Errors:

- **400 Bad Request** - Agar limit noto'g'ri formatda kiritilgan bo'lsa

```json
{
  "status": "failed",
  "message": "Invalid limit value."
}
```
