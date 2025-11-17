# Quick Start

1. Clone project:

````bash
git clone https://github.com/dnaletov/user-profiles-app.git
cd user-profiles-app

2. Create a `.env` file in the root of the project and add the following variables:
   DATABASE_URL="mysql://ela_dmitrii:J3mR9Hz3N6WPA7@bart.elasticle.cz:25060/ela_dmitrii"
   JWT_SECRET="123456789"
   CLOUDINARY_NAME=dhryd47yb
   CLOUDINARY_KEY=184234677168721
   CLOUDINARY_SECRET=rpit08QYgqNT7rMmMI0xRdOeafg

3. Install dependencies:

```bash
npm install
````

4. Start the development server:

npm run dev

5. Open http://localhost:3000

There is a test user you can log in with:
Email: test@test.test
Password: test

Or you can create your own user using the registration form.
