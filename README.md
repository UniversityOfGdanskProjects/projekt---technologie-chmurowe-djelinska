[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/gtp0On7_)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13962908&assignment_repo_type=AssignmentRepo)

# Aplikacja sklepu internetowego z kosmetykami

Dominika Jelińska

---

Ten projekt to aplikacja umożliwiająca użytkownikom przeglądanie, sortowanie, filtrowanie i zakup produktów online. Aplikacja wykorzystuje Keycloak do zarządzania autentykacją użytkowników, umożliwiając rejestrację, logowanie oraz zarządzanie profilem.

Zalogowani użytkownicy mają dostęp do dodawania produktów do koszyka, składania zamówień oraz przeglądania historii zamówień. Dodatkowo, użytkownicy z rolą administratora mogą zarządzać produktami w panelu administratora.

## Wymagania

- Node.js
- MongoDB
- Keycloak

## Instalacja i konfiguracja

### Konfiguracja backendu

1. Sklonuj repozytorium projektu

2. Przejdź do folderu backend:

   ```sh
   cd backend
   ```

3. Zainstaluj zależności:

   ```sh
   npm install
   ```

4. Uruchom serwer:

   ```sh
   npm start
   ```

### Konfiguracja frontendu

1. Przejdź do folderu frontend:

   ```sh
   cd frontend
   ```

2. Zainstaluj wymagane pakiety NPM:

   ```sh
   npm install
   ```

3. Uruchom serwer deweloperski dla aplikacji frontendowej:

   ```sh
   npm run dev
   ```

### Konfiguracja Keycloak

#### Import realm do Keycloak

- Przejdź do panelu administracyjnego Keycloak w przeglądarce (np. http://localhost:8080/admin)

- Zaloguj się używając danych administratora.

- W panelu administracyjnym zaimportuj plik realm-export.json z katalogu keycloak lokalnego repozytorium.

## Import danych produktów

- Zaimportuj dane produktów z katalogu /backend/data do bazy danych MongoDB

```
mongoimport --db ecommerce --collection products --type json --file data/products.json --jsonArray
```

- Ustaw poprawne zmienne środowiskowe w plikach konfiguracyjnych .env

## Użycie

Otwórz przeglądarkę i przejdź do http://localhost:3000.

## Technologie

- **Frontend**: React.js, React Router, React Hook Form, Tailwind CSS

- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT for authentication

- **Autentykacja i autoryzacja**: Keycloak
