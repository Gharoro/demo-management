# CredPal Backend

Node.js + Express + MongoDB backend API with TypeScript.

## Quick Start

```bash
# Clone and install
git clone <repo-url>
cd credpal/backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Environment Variables

```env
PORT=4040
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/credpal
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=15m
```

## Create Admin User

```bash
npm run create:admin <firstName> <lastName> <email> <password>
```

## API Endpoints

| Method | Endpoint                           | Description               | Auth        |
| ------ | ---------------------------------- | ------------------------- | ----------- |
| POST   | `/api/v1/auth/create-user`         | Register user             | -           |
| PATCH  | `/api/v1/auth/verify-email`        | Verify email              | -           |
| POST   | `/api/v1/auth/login`               | User login                | -           |
| POST   | `/api/v1/auth/admin/login`         | Admin login               | -           |
| GET    | `/api/v1/demo`                     | List user's demo requests | JWT         |
| POST   | `/api/v1/demo`                     | Create demo request       | JWT         |
| GET    | `/api/v1/demo-requests`            | List all (admin)          | JWT + Admin |
| PATCH  | `/api/v1/demo-requests/:id`        | Update status (admin)     | JWT + Admin |
| DELETE | `/api/v1/demo-requests/:id`        | Delete (admin)            | JWT + Admin |
| GET    | `/api/v1/demo-requests/audit-logs` | View audit logs           | JWT + Admin |

## Technical Decisions

### Architecture

- **Layered structure**: Controllers → Services → Models
- **Error handling**: Centralized via `AppError` and global error handler
- **Validation**: Zod schemas with middleware

### Security Measures

| Measure                  | Implementation                                                 |
| ------------------------ | -------------------------------------------------------------- |
| **Helmet**               | Security headers (XSS, clickjacking, MIME sniffing protection) |
| **Rate limiting**        | 5 attempts/15min on auth routes                                |
| **Password hashing**     | bcrypt with salt rounds                                        |
| **JWT auth**             | Short-lived tokens (15m default)                               |
| **Role-based access**    | Admin guard middleware                                         |
| **Input validation**     | Zod + ObjectId regex validation                                |
| **Password exclusion**   | `select: false` on schema                                      |
| **Email normalization**  | Lowercase on all operations                                    |
| **Audit logging**        | All admin actions logged with old/new values                   |
| **Failed login logging** | Security events logged with email                              |

### Database

- **Indexes**: On `email`, `userId`, `status`, `createdAt` for query performance
- **Pagination**: `mongoose-paginate-v2` with 100 item limit
