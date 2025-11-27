# 🎓 CampusReveal

> **Empowering Students with Real Campus Insights**

A full-stack web application that revolutionizes how students discover and evaluate colleges by providing authentic peer reviews, comprehensive college information, and data-driven insights to make informed educational decisions.

---

## 🚀 Vision

**CampusReveal** bridges the gap between prospective students and authentic campus experiences. In an era where college choice is a life-defining decision, students often rely on incomplete information and polished marketing materials. 

Our mission is to **democratize campus knowledge** by creating a transparent, community-driven platform where:
- ✨ **Students discover truth** through genuine peer reviews and experiences
- 📊 **Data empowers decisions** with comprehensive college profiles and comparative analytics
- 🤝 **Communities build trust** through verified, transparent feedback
- 🎯 **Real experiences matter** over marketing narratives

We envision a world where every student has access to authentic, peer-verified information to choose their ideal campus—regardless of background or resources.

---

## 🌟 Key Features

### 📚 College Discovery
- Browse comprehensive college database with detailed institutional information
- Advanced search and filtering capabilities
- College profiles with key metrics and statistics
- Interactive landing page for seamless exploration

### 💬 Community Reviews & Ratings
- Authentic peer reviews from current and former students
- Multi-dimensional rating system (academics, campus life, facilities, value for money)
- Real-time review creation and updates
- Community engagement tools to foster meaningful discussions

### 🎨 Intuitive User Interface
- Modern, responsive design built with React and Tailwind CSS
- Smooth navigation across landing, home, and review pages
- Mobile-first approach for accessibility on all devices
- Enhanced user experience with component-based architecture

### 🔒 Secure & Scalable Backend
- RESTful API with Express.js for reliable performance
- MongoDB for flexible, scalable data storage
- JWT authentication for secure user sessions
- CORS-enabled for seamless client-server communication

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React** | Dynamic UI library for interactive components |
| **React Router** | Client-side navigation and routing |
| **Tailwind CSS** | Utility-first styling for modern design |
| **JavaScript (ES6+)** | Interactive frontend logic |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js & Express.js** | Server runtime and web framework |
| **MongoDB** | NoSQL database for flexible data modeling |
| **Mongoose** | ODM for schema validation and data management |
| **JWT (jsonwebtoken)** | Secure authentication tokens |
| **Bcrypt** | Password hashing for security |
| **CORS** | Cross-origin request handling |
| **Nodemailer** | Email notifications (future feature) |

### DevOps & Tools
| Technology | Purpose |
|---|---|
| **Nodemon** | Development server with auto-restart |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
campusreveal/
├── 📁 backend/
│   ├── controllers/
│   │   ├── collegeController.js      # College data logic
│   │   └── reviewController.js       # Review management logic
│   ├── models/
│   │   ├── College.js                # MongoDB College schema
│   │   └── Review.js                 # MongoDB Review schema
│   ├── routes/
│   │   ├── collegeRoutes.js          # College API endpoints
│   │   └── reviewRoutes.js           # Review API endpoints
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment configuration
│
├── 📁 client/
│   ├── public/
│   │   ├── index.html                # HTML entry point
│   │   ├── manifest.json             # PWA manifest
│   │   └── robots.txt                # SEO configuration
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js               # Main college listing page
│   │   │   ├── Landing.js            # Landing/welcome page
│   │   │   └── Review.js             # Review page component
│   │   ├── App.js                    # Main app component & routing
│   │   ├── index.js                  # React DOM render point
│   │   ├── App.css                   # Global styles
│   │   └── index.css                 # Base styles
│   ├── package.json                  # Frontend dependencies
│   ├── tailwind.config.js            # Tailwind configuration
│   └── README.md                     # Frontend documentation
│
├── Colleges_Dataset.csv              # College data source
├── test.CollegeDetails.json          # Sample college data
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or MongoDB Atlas connection)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/campusreveal.git
cd campusreveal
```

#### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campusreveal
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

#### 3. Setup Frontend
```bash
cd ../client
npm install
```

#### 4. Start the Application

**Terminal 1 - Start Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Start Frontend Development Server:**
```bash
cd client
npm start
# Frontend runs on http://localhost:3000
```

The application will automatically open at `http://localhost:3000`

---

## 📡 API Endpoints

### College Endpoints
```
GET    /api/colleges              - Fetch all colleges
GET    /api/colleges/:id          - Fetch college by ID
POST   /api/colleges              - Create new college
PUT    /api/colleges/:id          - Update college details
DELETE /api/colleges/:id          - Delete college
```

### Review Endpoints
```
GET    /api/colleges/:collegeId/reviews      - Fetch all reviews for a college
GET    /api/colleges/:collegeId/reviews/:id  - Fetch specific review
POST   /api/colleges/:collegeId/reviews      - Create new review
PUT    /api/colleges/:collegeId/reviews/:id  - Update review
DELETE /api/colleges/:collegeId/reviews/:id  - Delete review
```

---

## 🗄️ Database Schema

### College Model
```javascript
{
  _id: ObjectId,
  name: String,
  location: String,
  established: Number,
  rating: Number,
  description: String,
  website: String,
  admissionRate: Number,
  averageGPA: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  _id: ObjectId,
  collegeId: ObjectId (ref: College),
  studentName: String,
  rating: {
    academic: Number (1-5),
    campusLife: Number (1-5),
    facilities: Number (1-5),
    valueForMoney: Number (1-5)
  },
  title: String,
  review: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt for secure password storage
- **CORS Protection**: Restricted cross-origin requests
- **Environment Variables**: Sensitive data management via `.env`
- **Input Validation**: Server-side validation for all inputs
- **HTTP Security Headers**: Protection against common attacks

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Run Frontend Tests
```bash
cd client
npm test
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint and Prettier standards
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure backward compatibility

---

## 📈 Roadmap

### Phase 1 (Current) ✅
- [x] College database and listing
- [x] Review system with ratings
- [x] User authentication framework
- [x] Responsive UI design

### Phase 2 (Upcoming) 🔜
- [ ] Advanced filtering and search
- [ ] User profiles and history
- [ ] Email notifications
- [ ] College comparison tool
- [ ] Data analytics dashboard

### Phase 3 (Future) 🚀
- [ ] Mobile app (React Native)
- [ ] AI-powered college recommendations
- [ ] Integration with college APIs
- [ ] Social features and forums
- [ ] Scholarship information aggregator

---

## 📊 Performance & Scalability

- **Database Indexing**: Optimized MongoDB queries
- **API Caching**: Reduce database hits
- **Load Balancing**: Ready for horizontal scaling
- **CDN Ready**: Static assets can be served via CDN
- **Pagination**: Handle large datasets efficiently

---

## 🐛 Known Issues & Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
Solution: Ensure MongoDB is running locally or update MONGODB_URI in .env
```

### CORS Errors
```
Error: CORS policy blocked request
Solution: Verify frontend URL matches CORS origin in server.js
```

### Port Already in Use
```
Solution: Kill process on port: lsof -ti:5000 | xargs kill -9 (Mac/Linux)
           or update PORT in .env
```

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/amitkumar2308/campusreveal/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/campusreveal/discussions)
- **Website**: [campusreveal.com](https://campusreveal.com)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌍 Deployment

The application is ready for deployment to platforms like:
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, AWS, DigitalOcean, Railway
- **Database**: MongoDB Atlas, AWS DocumentDB

---

## 👥 Team & Credits

**Project Lead:** Amit Kumar  
**Contributors:** Open to community contributions!

---

## ⭐ Acknowledgments

- Built with ❤️ for students everywhere
- Inspired by the need for transparent educational information
- Thanks to the open-source community

---

<div align="center">

**Made with 🎓 to empower student decisions**

[![GitHub Stars](https://img.shields.io/github/stars/yourusername/campusreveal?style=social)](https://github.com/yourusername/campusreveal)
[![GitHub Forks](https://img.shields.io/github/forks/yourusername/campusreveal?style=social)](https://github.com/yourusername/campusreveal)

</div>
