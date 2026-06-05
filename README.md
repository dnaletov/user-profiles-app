# User Profiles App

**Live demo**: https://user-profiles-app-three.vercel.app

# Quick Start

1. Clone project:

```bash
git clone https://github.com/dnaletov/user-profiles-app.git
cd user-profiles-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_secret"
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

4. Initialize the database:

```bash
npx prisma db push
```

5. Seed the database with test data:

```bash
npx prisma db seed
```

6. Start the development server:

```bash
npm run dev
```

7. Open http://localhost:3000

A test account is available:

```
Email: test@test.test
Password: test
```

Or register a new account using the registration form.
