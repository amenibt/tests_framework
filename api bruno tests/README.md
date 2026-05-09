# API Bruno Tests - Backend API Testing

Comprehensive API test suite for the Orange Web App using Bruno CLI for API testing and validation.

## 📁 Project Structure

```
api bruno tests/
└── Sample API Collection bruno/
    ├── API Orange Web App/          # Main API test collection
    │   ├── Authentication.yml       # Authentication & login tests
    │   ├── Booking (CRUD).yml       # Booking CRUD operations
    │   ├── Login.yml                # User login tests
    │   ├── Room test.yml            # Room API tests
    │   └── environments/            # Environment configurations
    │       ├── orange dev.yml
    │       └── Untitled.yml
    │
    ├── test api/                    # Additional API tests
    │   ├── Booking test.yml         # Booking validation tests
    │   ├── Rooms Content Tests.yml  # Room content validation
    │   ├── Stability.yml            # API stability tests
    │   └── environments/
    │       └── Orange-Dev.yml
    │
    ├── environments/                # Root environments
    │   └── orange app.yml
    │
    ├── folder.yml                   # Collection metadata
    └── opencollection.yml           # Collection configuration
```

## 🚀 Getting Started

### Prerequisites

```bash
# Install Bruno CLI globally
npm install -g @usebruno/cli

# Or use npx (no installation required)
npx @usebruno/cli --version
```

### Running Tests

#### Run All Tests in a Collection

```bash
# Navigate to the collection directory
cd "api bruno tests/Sample API Collection bruno"

# Run specific collection with environment
bru run "API Orange Web App" -r --env "orange app"

# Run with reporters
bru run "API Orange Web App" -r --env "orange app" \
  --reporter-json results.json \
  --reporter-html results.html
```

#### Run Individual Test Files

```bash
# Run authentication tests
bru run "API Orange Web App/Authentication.yml" --env "orange app"

# Run booking tests
bru run "API Orange Web App/Booking (CRUD).yml" --env "orange app"

# Run stability tests
bru run "test api/Stability.yml" --env "orange app"
```

#### Run with Different Environments

```bash
# Use development environment
bru run "API Orange Web App" --env "orange dev"

# Use production environment
bru run "API Orange Web App" --env "orange app"
```

## 📝 Test Collections

### 1. API Orange Web App Collection

Main collection for comprehensive API testing:

#### Authentication.yml
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Purpose**: Authenticate user and obtain JWT token
- **Test Data**:
  - Username: `admin`
  - Password: `password`
- **Variables Set**: `TOKEN` (stored for subsequent requests)

#### Booking (CRUD).yml
- **Method**: POST
- **Endpoint**: `/api/booking`
- **Purpose**: Create booking with full CRUD validation
- **Authentication**: Bearer token required
- **Test Data**:
  ```json
  {
    "firstname": "Amen",
    "lastname": "Test",
    "totalprice": 30,
    "depositpaid": true,
    "roomid": 4,
    "bookingdates": {
      "checkin": "2026-05-01",
      "checkout": "2026-05-05"
    },
    "additionalneeds": "Breakfast"
  }
  ```
- **Validations**:
  - Status code 200 or 201
  - Booking ID present in response
- **Variables Set**: `BOOKING_ID`

#### Login.yml
- **Method**: POST
- **Endpoint**: `/api/auth/login`
- **Purpose**: User login validation
- **Tests**: Authentication flow

#### Room test.yml
- **Method**: GET/POST
- **Endpoint**: `/api/room`
- **Purpose**: Room availability and details testing

### 2. Test API Collection

Additional validation tests:

#### Booking test.yml
- **Method**: POST
- **Endpoint**: `/api/booking`
- **Purpose**: Simplified booking creation
- **Validation**: Status code 201
- **Test Data**:
  ```json
  {
    "roomid": 1,
    "firstname": "Amen",
    "lastname": "Test",
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2026-04-01",
      "checkout": "2026-04-05"
    }
  }
  ```

#### Rooms Content Tests.yml
- **Purpose**: Room content validation
- **Tests**: Room data integrity

#### Stability.yml
- **Method**: GET
- **Endpoint**: `/api/room`
- **Purpose**: API health and stability check
- **Validation**: Status code 200
- **Test**: `expect(res.status).to.equal(200)`

## 🔧 Environment Configuration

### Available Environments

1. **orange app** - Production environment
2. **orange dev** - Development environment
3. **Orange-Dev** - Alternative dev environment

### Environment Variables

Common variables used across tests:
- `BASE_URL`: Base API URL
- `TOKEN`: Authentication token
- `BOOKING_ID`: Created booking identifier

### Setting Environment Variables

Environment variables are set in runtime scripts:

```javascript
// Set token after authentication
bru.setEnvVar("TOKEN", res.body.token);

// Set booking ID after creation
bru.setEnvVar("BOOKING_ID", res.body.bookingid);
```

## 📊 Test Execution Flow

### Complete Test Flow

1. **Authentication**
   ```
   POST /api/auth/login
   → Obtain TOKEN
   → Store in environment
   ```

2. **Room Stability Check**
   ```
   GET /api/room
   → Verify API is responding
   → Status: 200
   ```

3. **Create Booking**
   ```
   POST /api/booking
   → Use TOKEN from step 1
   → Create booking
   → Store BOOKING_ID
   ```

4. **Validate Booking**
   ```
   GET /api/booking/{BOOKING_ID}
   → Verify booking exists
   → Validate data
   ```

## 🧪 Writing Tests

### Test Assertions

Bruno uses Chai assertion library:

```javascript
test("Booking created successfully", function () {
  expect(res.status).to.equal(201);
  expect(res.body).to.have.property('bookingid');
  expect(res.body.bookingid).to.be.a('number');
});

test("Response time acceptable", function () {
  expect(res.responseTime).to.be.below(2000);
});
```

### Common Assertions

```javascript
// Status codes
expect(res.status).to.equal(200);
expect(res.status).to.be.oneOf([200, 201]);

// Response body
expect(res.body).to.have.property('bookingid');
expect(res.body.firstname).to.equal("Amen");
expect(res.body.bookingdates).to.be.an('object');

// Response headers
expect(res.headers['content-type']).to.include('application/json');

// Response time
expect(res.responseTime).to.be.below(3000);
```

### Error Handling

```javascript
if (res.status !== 200 && res.status !== 201) {
  throw new Error("Request failed with status: " + res.status);
}

if (!res.body || !res.body.bookingid) {
  throw new Error("Expected data missing in response");
}
```

## 📈 Test Reporting

### Generate Reports

```bash
# JSON report
bru run "API Orange Web App" -r --env "orange app" \
  --reporter-json results.json

# HTML report
bru run "API Orange Web App" -r --env "orange app" \
  --reporter-html results.html

# Both reports
bru run "API Orange Web App" -r --env "orange app" \
  --reporter-json results.json \
  --reporter-html results.html
```

### View Reports

- **JSON Report**: Machine-readable format for CI/CD
- **HTML Report**: Human-readable visual report

## 🔍 API Endpoints

### Base URL
```
https://automationintesting.online/api
```

### Available Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/auth/login` | POST | User authentication | No |
| `/booking` | POST | Create booking | Yes (Bearer) |
| `/booking` | GET | Get all bookings | No |
| `/booking/{id}` | GET | Get booking by ID | No |
| `/booking/{id}` | PUT | Update booking | Yes (Bearer) |
| `/booking/{id}` | DELETE | Delete booking | Yes (Bearer) |
| `/room` | GET | Get all rooms | No |
| `/room/{id}` | GET | Get room by ID | No |

## 🛠️ Advanced Usage

### Sequential Requests

```yaml
# 1. Login
POST /api/auth/login
→ Store TOKEN

# 2. Create Booking
POST /api/booking
Headers: Authorization: Bearer {{TOKEN}}
→ Store BOOKING_ID

# 3. Get Booking
GET /api/booking/{{BOOKING_ID}}
→ Validate data
```

### Data-Driven Testing

Use different data sets for the same test:

```javascript
const testData = [
  { roomid: 1, firstname: "Alice", lastname: "Smith" },
  { roomid: 2, firstname: "Bob", lastname: "Jones" },
  { roomid: 3, firstname: "Carol", lastname: "White" }
];

// Run test for each data set
testData.forEach(data => {
  // Execute request with data
});
```

### Environment-Specific Configuration

```yaml
# orange app environment
{
  "BASE_URL": "https://automationintesting.online",
  "TIMEOUT": 5000,
  "MAX_RETRIES": 3
}

# orange dev environment
{
  "BASE_URL": "https://dev.automationintesting.online",
  "TIMEOUT": 10000,
  "MAX_RETRIES": 5
}
```

## 🐛 Debugging

### Verbose Output

```bash
# Run with verbose logging
bru run "API Orange Web App" -r --env "orange app" --verbose
```

### Debug Individual Requests

```bash
# Run single test file
bru run "API Orange Web App/Authentication.yml" --env "orange app"

# Check environment variables
bru env list
```

### Common Issues

1. **Authentication Failed**
   - Verify credentials in Authentication.yml
   - Check TOKEN is being set correctly

2. **Booking Creation Failed**
   - Ensure TOKEN is valid
   - Verify room ID exists
   - Check date format (YYYY-MM-DD)

3. **Environment Not Found**
   - Check environment file exists
   - Verify environment name spelling

## 📚 Best Practices

### 1. Use Environment Variables
```javascript
// ✅ Good
url: "{{BASE_URL}}/api/booking"

// ❌ Avoid
url: "https://automationintesting.online/api/booking"
```

### 2. Store Tokens Securely
```javascript
// Store token after authentication
bru.setEnvVar("TOKEN", res.body.token);

// Use in subsequent requests
Headers: Authorization: Bearer {{TOKEN}}
```

### 3. Validate Response Structure
```javascript
test("Valid response structure", function () {
  expect(res.body).to.have.property('bookingid');
  expect(res.body).to.have.property('booking');
  expect(res.body.booking).to.have.property('firstname');
});
```

### 4. Test Error Scenarios
```javascript
// Test with invalid data
test("Handle invalid booking", function () {
  // Send request with missing required fields
  expect(res.status).to.equal(400);
  expect(res.body).to.have.property('error');
});
```

### 5. Keep Tests Independent
Each test should be able to run independently without relying on previous test state (except for authentication).

## 🔗 Integration with CI/CD

### GitHub Actions Integration

See `.github/workflows/bruno.yml` for automated test execution:

```yaml
- name: Run Bruno collection
  run: bru run "API Orange Web App" -r --env "orange app" \
    --reporter-json results.json \
    --reporter-html results.html
  working-directory: "api bruno tests/Sample API Collection bruno"
```

## 📊 Test Coverage

### Current Coverage

- **Authentication**: Login, token generation
- **Bookings**: Create, read, update, delete (CRUD)
- **Rooms**: Availability check, content validation
- **Stability**: API health checks

### Recommended Additions

- [ ] Delete booking tests
- [ ] Update booking tests
- [ ] Room search with filters
- [ ] Invalid data handling
- [ ] Rate limiting tests
- [ ] Concurrent request tests
- [ ] Performance benchmarks

## 📖 Additional Resources

- [Bruno Documentation](https://docs.usebruno.com/)
- [Bruno CLI GitHub](https://github.com/usebruno/bruno)
- [Chai Assertions](https://www.chaijs.com/api/bdd/)
- [API Testing Best Practices](https://restfulapi.net/rest-api-testing/)

## 🤝 Contributing

When adding new tests:
1. Follow existing naming conventions
2. Add proper test assertions
3. Update environment variables as needed
4. Document new endpoints
5. Update this README

## 📝 Test Inventory

Refer to root project documentation for complete test inventory and metadata.
