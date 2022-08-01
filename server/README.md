**Docker started:**
```
docker run --name movies -p 8050:8050 -e APP_PORT=8050 movies
```

**Local started:**
```
npm run dev
```


***http://localhost:8000***

**Додаток може:**

1. Завантаження файлу який запишеться в бд SQlite
    */cinema/upload*
```
    form-data
    key - filedata : values - file
```
2. Повертати всі фільми в порядку додавання - **GET**
    */cinema/item/*
Запит
```
    {
        "sort": false
    }
```
3. Повертати всі фільми в алфавітному порядку - **GET**
    */cinema/item/*
Запит
```
    {
        "sort": true
    }
```
4. Шукати фільм по назві - **GET**
    */cinema/item/*
Запит
```
    {
        "title": ""
    }
```
5. Шукати фільм по акторам - **GET**
    */cinema/item/*
Запит
```
    {
        "stars": ""
    }
```
6. Отримуємо фільм по Id - **GET**
    */cinema/item/:id*

7. Додавати фільм - **POST**
    */cinema/item*
Запит
```
    {
        "title": "WarGames",
        "release_year": 1983,
        "format": "VHS",
        "stars": "Matthew Broderick, Ally Sheedy, Dabney Coleman, John Wood, Barry Corbin"
    }
```
8. Видаляти фільм по ID - **DELETE**
    */cinema/item*
Запит 
```
    {
        "id": 77
    }
```
9. Реєстрація користувача - **POST**
    */user/registration*
Запит
```
    {
        "email": "example@gmail.com",
        "password": "123456"
    }
```
10.  Вхід в систему - **POST**
   */user/login*
Запит
```
    {
        "email": "example@gmail.com",
        "password": "123456"
    }
```