# 📚 BookHub - Online Book Store

A full-stack web application for an online bookstore with user authentication, book catalog, shopping cart, and order management. Built with Spring Boot backend and modern HTML5/CSS3/JavaScript frontend.

![Version](https://img.shields.io/badge/version-0.0.1--SNAPSHOT-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.2-green)
![License](https://img.shields.io/badge/license-MIT-brightgreen)

---

## 🌟 Features

### User Management
- ✅ User registration with email validation
- ✅ User login with authentication
- ✅ User profile management
- ✅ Session management with localStorage

### Book Catalog
- 📚 Browse all available books
- 🔍 Search books by title or author
- 💰 Price-based sorting
- 📊 Book details (title, author, price)
- 📖 Color-coded book icons for visual appeal

### Shopping Cart
- 🛒 Add books to cart
- ➕ Adjust quantity
- ❌ Remove items from cart
- 💵 Real-time cart total calculation
- 📤 Order placement from cart
- 🚚 Automatic shipping fee calculation (free over ₹500)
- 💸 Tax calculation (5%)

### Orders
- 📋 Order history for logged-in users
- 📝 Order details with item breakdown
- 💳 Order total display
- 📅 Order tracking

### UI/UX
- 🎨 Modern, professional design with gradient backgrounds
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Smooth animations and transitions
- 🔔 Real-time notifications
- 💫 Loading indicators
- 🎯 Intuitive navigation

---

## 🏗️ Project Structure

```
OnlineBookStore/
├── frontend/                          # Frontend files (HTML, CSS, JS)
│   ├── index.html                    # Home page (book shop)
│   ├── login.html                    # Login page
│   ├── register.html                 # Registration page
│   ├── cart.html                     # Shopping cart page
│   ├── orders.html                   # Orders history page
│   ├── css/
│   │   └── style.css                 # Responsive styling
│   └── js/
│       ├── app.js                    # Book listing & search logic
│       ├── auth.js                   # Authentication functions
│       ├── cart.js                   # Cart management
│       ├── login.js                  # Login functionality
│       ├── orders.js                 # Order history display
│       └── login.js                  # Login page logic
│
├── src/main/
│   ├── java/com/jspider/OnlineBookStore/
│   │   ├── OnlineBookStoreApplication.java    # Main Spring Boot application
│   │   ├── config/
│   │   │   └── SecurityConfig.java           # Spring Security configuration
│   │   ├── controller/
│   │   │   ├── AuthController.java           # Authentication endpoints
│   │   │   ├── BookController.java           # Book endpoints
│   │   │   └── OrderController.java          # Order endpoints
│   │   ├── dto/
│   │   │   ├── LoginRequestDTO.java
│   │   │   ├── RegisterRequestDTO.java
│   │   │   ├── BookRequestDTO.java
│   │   │   ├── BookResponseDTO.java
│   │   │   ├── OrderRequestDTO.java
│   │   │   ├── OrderResponseDTO.java
│   │   │   └── UserResponseDTO.java
│   │   ├── model/
│   │   │   ├── User.java                     # User entity
│   │   │   ├── Book.java                     # Book entity
│   │   │   ├── Order.java                    # Order entity
│   │   │   └── OrderItem.java                # Order item entity
│   │   ├── repository/
│   │   │   ├── UserRepository.java           # User data access
│   │   │   ├── BookRepository.java           # Book data access
│   │   │   ├── OrderRepository.java          # Order data access
│   │   │   └── OrderItemRepository.java      # Order item data access
│   │   ├── service/
│   │   │   ├── AuthService.java              # Authentication logic
│   │   │   ├── BookService.java              # Book business logic
│   │   │   └── OrderService.java             # Order business logic
│   │   └── exception/
│   │       ├── GlobalExceptionHandler.java   # Exception handling
│   │       ├── InvalidRequestException.java
│   │       └── ResourceNotFoundException.java
│   └── resources/
│       └── application.properties            # Application configuration
│
├── pom.xml                           # Maven project configuration
├── mvnw & mvnw.cmd                   # Maven wrapper
└── README.md                         # This file
```

---

## 🚀 Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.2
- **Language**: Java 17
- **Database**: PostgreSQL
- **Build Tool**: Maven
- **Security**: Spring Security
- **Data Persistence**: Spring Data JPA, Hibernate
- **API**: RESTful Web Services

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with Flexbox & Grid
- **JavaScript**: Vanilla JS (no frameworks)
- **Storage**: LocalStorage for session management

### Development Tools
- Spring Boot DevTools
- Lombok (for annotations)
- Maven Compiler Plugin

---

## 📋 Prerequisites

- **Java**: JDK 17 or higher
- **Maven**: 3.6 or higher
- **PostgreSQL**: 12 or higher
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Internet Connection**: For dependency downloads

---

## ⚙️ Installation & Setup

### 1. Clone or Extract the Project
```bash
cd OnlineBookStore
```

### 2. Database Setup

**Create PostgreSQL Database:**
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE online_book_store;

-- Connect to the new database
\c online_book_store
```

### 3. Configure Database Connection

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/online_book_store
spring.datasource.username=postgres
spring.datasource.password=root  # Set your PostgreSQL password
```

### 4. Build the Project

```bash
# Using Maven wrapper (Windows)
mvnw clean package

# Using Maven wrapper (Linux/Mac)
./mvnw clean package

# Or using Maven directly
mvn clean package
```

### 5. Run the Application

```bash
# Using Maven wrapper (Windows)
mvnw spring-boot:run

# Using Maven wrapper (Linux/Mac)
./mvnw spring-boot:run

# Or run the JAR file
java -jar target/OnlineBookStore-0.0.1-SNAPSHOT.jar
```

The backend will start on **http://localhost:8081**

### 6. Access the Application

1. Open your browser
2. Navigate to: **http://localhost:8081/index.html** (or place `frontend/` in a web server root)
3. Or use a simple HTTP server:
   ```bash
   # Python 3
   python -m http.server 8000 --directory frontend/
   
   # Node.js (http-server)
   npx http-server frontend/ -p 8000
   ```
4. Visit: **http://localhost:8000** or **http://localhost:8080**

---

## 🔌 API Endpoints

### Authentication Endpoints (`/api/auth`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | `{username, email, password}` |
| POST | `/api/auth/login` | User login | `{email, password}` |

### Book Endpoints (`/api/books`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| POST | `/api/books` | Add new book (Admin) |

**Book Response:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 299.99,
  "stock": 50
}
```

### Order Endpoints (`/api/orders`)

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/orders` | Place new order | `{userId, items: [{bookId, quantity}]}` |
| GET | `/api/orders/user/{userId}` | Get user's orders | - |

**Order Response:**
```json
{
  "orderId": 1,
  "userId": 1,
  "totalPrice": 599.98,
  "items": [
    {
      "bookId": 1,
      "bookTitle": "The Great Gatsby",
      "quantity": 2,
      "price": 299.99
    }
  ]
}
```

---

## 📄 Frontend Pages

### 1. **Home Page** (`index.html`)
- Book catalog in responsive grid layout
- Search functionality (title/author)
- Sort by price
- Add to cart functionality
- User authentication status

### 2. **Login Page** (`login.html`)
- Email and password input
- Form validation
- Error messages
- Redirect to registration
- Responsive design

### 3. **Register Page** (`register.html`)
- Username, email, password input
- Form validation
- Terms acknowledgment
- Redirect to login
- Responsive design

### 4. **Shopping Cart** (`cart.html`)
- View cart items
- Adjust quantities
- Remove items
- Calculate totals (subtotal, tax, shipping)
- Place order button
- Continue shopping link

### 5. **Orders Page** (`orders.html`)
- View order history
- Order details with items
- Order totals
- Order dates
- Empty state messaging

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Books Table
```sql
CREATE TABLE books (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id),
  book_id BIGINT NOT NULL REFERENCES books(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

---

## 🔐 Security Features

- **Spring Security**: Protects sensitive endpoints
- **Password Hashing**: Secure password storage
- **CORS**: Enabled for frontend-backend communication
- **JWT Ready**: Architecture supports token-based auth
- **Input Validation**: Server-side validation on all inputs

---

## 📊 Sample Data

To test the application, add sample books via the API:

```bash
curl -X POST http://localhost:8081/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 299.99,
    "stock": 50
  }'
```

---

## 🛠️ Development Guide

### Adding a New Feature

1. **Create Model**: Add entity in `model/` package
2. **Create Repository**: Extend `JpaRepository` in `repository/`
3. **Create Service**: Add business logic in `service/`
4. **Create Controller**: Add REST endpoints in `controller/`
5. **Update Frontend**: Add UI and JS logic in `frontend/`

### Running Tests

```bash
mvn test
```

### Checking Code Compilation

```bash
mvn clean compile
```

---

## 🐛 Troubleshooting

### Port 8081 Already in Use
```bash
# Find process using port 8081
lsof -i :8081

# Or change port in application.properties
server.port=8082
```

### Database Connection Issues
- Verify PostgreSQL is running
- Check credentials in `application.properties`
- Ensure database `online_book_store` exists

### Frontend Not Loading
- Ensure backend is running on port 8081
- Check browser console for CORS errors
- Verify frontend files are in correct location

### CORS Issues
- CORS is enabled in `SecurityConfig.java`
- Add origin in `@CrossOrigin` if needed

---

## 📝 Future Enhancements

- [ ] Product images and descriptions
- [ ] Advanced filtering (genre, rating)
- [ ] Wishlist functionality
- [ ] Payment integration (Stripe/PayPal)
- [ ] User reviews and ratings
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Email notifications
- [ ] Order tracking
- [ ] Multi-language support

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Review the documentation in this README
- Check the project structure for reference implementations
- Refer to Spring Boot and PostgreSQL official documentation

---

## 🙏 Acknowledgments

- Spring Boot Framework
- Spring Security
- PostgreSQL Database
- Open Source Community

---

## 📅 Version History

### v0.0.1-SNAPSHOT (Current)
- Initial release
- User authentication system
- Book catalog with search and sort
- Shopping cart functionality
- Order management
- Modern responsive UI

---

**Happy Reading! 📚✨**
