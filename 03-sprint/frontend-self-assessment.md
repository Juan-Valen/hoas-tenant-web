# Frontend self assessment

### Example 1: Simplifying and Refining the Resource Modal

Initially, the BookingResourceModal component contained redundant fields and inconsistent naming conventions.
The old version used unnecessary fields like maxReservations and openingHours, and relied on a name property instead of a unique identifier.  

```javascript
// BookingResourceModal (Old)
const [formData, setFormData] = useState({
  name: "",
  type: "sauna",
  location: "",
  maxReservations: 1,
  description: "",
  openingHours: "06:00 - 22:00",
});
```

The refactored version streamlined the data model and matched it to the backend schema:

```javascript
// BookingResourceModal (New)
const [formData, setFormData] = useState({
  identifier: "",
  type: "sauna",
  location: "",
  description: "",
});

```

### Key Improvements:
- **Schema Alignment:** Updated fields to match backend expectations.

- **Reduced Complexity:** Removed unused and redundant properties.

- **Edit Protection:** Disabled type selection when editing an existing resource.

- **Improved UX:** Clearer field names and placeholders.
---

### Example 2: Converting Static Data to Live API Integration

Originally, AdminBooking used static local data, which meant no persistence or real backend connection. 

```javascript
// AdminBooking (Old)
const [resources, setResources] = useState([
  { id: 1, name: "Sauna 1", type: "sauna", location: "Staircase D" },
  { id: 2, name: "Washing Machine 1", type: "laundry", location: "Staircase D" },
]);
```

The new version integrates directly with backend APIs to load, create, update, and delete data dynamically:

```javascript
// AdminBooking (New)
const handleReservations = async () => {
  const response = await fetch(`http://localhost:4000/api/reservations/reservables`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: activeTab }),
  });
  const data = await response.json();
  setReservations(data);
};

```

**Key Improvements:**

1. **Dynamic Data:** Switched from static arrays to live API data.

2. **Authentication:** Integrated useAuthContext for secure admin actions.

3. **Separated Logic:** Clear distinction between handleNewReservation, handleUpdateReservation, and handleDeleteReservation.

4. **Scalable:** Easily extendable to new resource types (e.g., dryers, clubrooms).
---

### Example 3: Migrating AdminUsers from Mock Data to API

The original AdminUsers component used a hardcoded list of users for local testing.

```javascript
// AdminUsers (Old)
const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
];

```

The updated version fully integrates with the backend using RESTful API endpoints for all CRUD operations.

```javascript
// AdminUsers (New)
const handleUsers = async () => {
  const response = await fetch(`http://localhost:4000/api/users`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const resJson = await response.json();
  setUsers(resJson);
};

```

**Key Improvements:**

- **Backend Integration:** Replaced local mock data with live API results.

- **Search Enhancement:** Allowed searching by both name and email.

- **Role Mapping:** Translated numeric status values into readable roles (“Admin” / “User”).

- **Reusable CRUD Functions:** Clear structure for creating, updating, and deleting users.

**Lessons Learned:**

1. **Data Consistency:** Aligning frontend state with backend schema prevents confusion and data mismatches.

2. **Incremental Refactoring:** Converting from static to dynamic data can be done safely without breaking the UI.

3. **Separation of Concerns:** Dedicated functions for CRUD actions simplify maintenance and debugging.

4. **Authentication Awareness:** Integrating auth context ensures secure and contextual operations.

5. **Improved UX:** Simplified forms, descriptive placeholders, and focused validation improve user experience.
