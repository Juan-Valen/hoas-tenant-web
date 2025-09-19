# Front-End Self-Assessment

## Architecture & Modularity

- The codebase is well-structured with modular React components such as `login`,`AdminPanel`, `Forms`, `Messages`, `Announcments`, `Marketplace`, Booking includes: `BookingInstruction`, `BookingSchedule`, `CalendarHeader`, `UserReservations`, and `RoomSelector`.

- Props are passed cleanly, maintaining separation of concerns and enabling reusability.

- Naming conventions are semantic and consistent, improving readability and maintainability.
- Strong architectural foundation with scalable component design.

## Styling & Responsiveness

- CSS uses flexbox, media queries, and alternating row styles to create a responsive and polished UI.

- Visual hierarchy is clear, with thoughtful use of color contrast and spacing.

- Button states are visually distinct, though accessibility could be improved with ARIA attributes and keyboard support.

- Visually refined and responsive. Accessibility enhancements would elevate the experience.

## Routing & Navigation

- React Router is implemented effectively, with routes for `/booking`, `/login`, `/register`, and `/marketplace`.

- Navigation logic is intuitive, including calendar reset on tab switch and disabled navigation before today.

- Routing errors (e.g. “No routes matched location '/'”) were correctly diagnosed and resolved.

- Routing is robust and user-friendly, with thoughtful UX logic.

## Forms & State Management

- Registration and login forms are implemented with basic validation.

- State management using useState is clean and effective for handling date, tab, room, and reservation logic.

- Booking logic includes duplicate prevention, reservation limits, and dynamic time formatting.

- Smart use of React state and form logic. Ready for deeper validation and persistence.

## Testing & Real-World Readiness

- Manual testing is thorough, with Postman used for backend validation.

- Edge cases like booking limits and disabled buttons are handled gracefully.

- Next steps include adding unit tests, form libraries, and accessibility audits.

- Real world ready with thoughtful logic and clean UX. Testing and polish will complete the picture.

## Example: Dynamic Room Selection

File: RoomSelector.jsx

Initially, room selection was envisioned as a static set of buttons per booking type:
```
<button>Sauna 1</button>
<button>Sauna 2</button>
```
**Improved:**
```
{roomOptions[activeTab].map((room) => (
  <button
    key={room}
    className={room === activeRoom ? "active" : ""}
    onClick={() => setActiveRoom(room)}
  >
    {labelMap[room]}
  </button>
))}

```
**Key Improvements:**
- Dynamic Rendering: Automatically adjusts room buttons based on activeTab.

- State-Driven UI: Highlights the selected room using activeRoom.

- Scalability: Easily supports new room types or machines by updating roomOptions and labelMap.

- Maintainability: Keeps logic centralized and avoids repetition.

## Example: Reservation Display & Cancellation
File: UserReservations.jsx

Originally, reservations were displayed as plain text with minimal structure:

```
<ul>
  <li>Monday – 18:00 Sauna 1</li>
</ul>
```
**Improved:**
```
{reservations.map((res) => (
  <li key={res.id}>
    <div className="reservation-details">
      <div className="reservation-info">
        <strong>{res.day}</strong> {res.time}
        <br />
        <span className="reservation-location">{res.location}</span>
        <br />
        <span className="reservation-description">{res.description}</span>
      </div>
      <button onClick={() => onCancel(res.id)}>Cancel</button>
    </div>
  </li>
))}
```
**Key Improvements:**

- Clear Hierarchy: Separates day, time, location, and description for readability.

- User Control: Adds a cancel button tied to onCancel logic.

- Empty State Handling: Displays a fallback message when no reservations exist.

- Styling Hooks: Uses class names like reservation-details and reservation-location for targeted CSS.

## Example: Centralized Booking Logic

File: BookingPage.jsx
```
const isAlreadyReserved = reservedSlots.some(
  (slot) => slot.room === room && slot.time === time && slot.date === dateKey
);
if (isAlreadyReserved) return;

const currentCount = reservations.filter(
  (r) => r.location === location && r.day === day
).length;
if (currentCount >= 5) {
  alert(`You’ve reached the maximum of 5 reservations for ${location} on ${day}.`);
  return;
}
```
**Key Improvements:**
- Duplicate Prevention: Ensures users don’t double-book the same slot.

- Limit Enforcement: Caps reservations per location/day to 5.

- User Feedback: Alerts users when limits are reached.

- Date-Specific Logic: Uses date-fns to format and compare dates reliably.

## Example: BookingSchedule  Dynamic Grid Rendering

```
{rooms.map((room) => (
  <div key={room} className="schedule-column">
    <h4>{labelMap[room]}</h4>
    <ul>
      {timeSlots.map((time) => {
        const reserved = isReserved(room, time);
        return (
          <li key={time}>
            <span>{time}</span>
            <button
              disabled={reserved}
              className={reserved ? "reserved" : "vacant"}
              onClick={() => onReserve(time, room, selectedDate)}
            >
              {reserved ? "RESERVED" : "VACANT"}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
))}

```
**Key Improvements:**

- Dynamic Rendering: Adapts to selected tab and room type.

- Reservation Awareness: Buttons reflect real-time availability.

- Scalable Grid: Easily supports more rooms or time slots.
- 
### Example: Improving Login Validation  

Initially, our `LoginPage` component provided a simple login form:  

```
// LoginPage.js
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Email validation
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Password strength validation (at least 6 characters, one number, one letter)
    const isStrongPassword = (password) =>
        password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password);
        // Reset the form state.
        setEmail('');
        setPassword('');
    };
}
```
While functional, it had several shortcomings:

Validation results were never displayed to users.

Password strength and email validity were only checked internally but not enforced.

Logging credentials to the console posed a security risk.

**Improved:**
```
// Improved LoginPage.js
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isStrongPassword = (password) =>
        password.length >= 6 && /\d/.test(password) && /[a-zA-Z]/.test(password);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!isStrongPassword(password)) {
            setError("Password must be at least 6 characters and include letters and numbers.");
            return;
        }

        // Call login API instead of console.log
        console.log("Logging in with:", { email });

        // Reset state
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
        </form>
    );
}
```
**Key Improvements:**
User Feedback: Error messages guide users to fix invalid inputs.

Security: Removed console.log(password) to prevent credential leaks.

Scalability: Clear validation makes it easy to add features like API integration.
