# Hoas tenant site

## Target users and stakeholders

The target users of the site are residents, tenant committee members and staff members from hoas.

The site is not intended to be accessible without credentials.
The site is intended coordinate reservations and repairs between the staff and residents.

The site will differentiate between three kinds of log in credentials: regular users, committee users and admin users.
The committee users are also regular users.


## Main functionality

- **Login**
	The site will store user login data, namely username, password and account type (Resident, Admin) and tenant committee (true/false).
	
- **Space reservation**
	Resident users can make reservations in the residence common areas like clubroom and sauna.
  	Resident users need to send a proposal for when they could get the keys with a list of their available time.
  	Committee users can send a counter proposal with their available time or accept a proposal from a resident user.
	
	The user chooses the space reservation option in the main page and opens the reservation page.
	
	The user looks up the space they wish to reserve from a provided list.
	An image and a description of the space is displayed.
	
	They then pick an open timeslot from a calendar dropdown.
	The created pending reservation is then saved and displayed to admin and staff users who can review the reservation and accept it.
	
	Admin and staff members can simply reserve a free timeslot without needing a to be reviewed.
	
	When a pending reservation is accepted, the user who made the reservation receives a notification.
	
- **Machine reservation**
	Regular member users can make reservation requests on the foundations household appliances, such as washing machines and dryers,
	which the admin members and foundation staff can review and accept.
	
	The user picks a machine from a separate dropdown menu in the reservation page.
	An image, description and technical specifications of the machine are displayed, along with the reservation calendar.
	The created pending reservation is saved and displayed to admin and staff users who can review the reservation and accept it.
	
	Admin and staff members can simply reserve a free timeslot without needing a to be reviewed.
	
	When a pending reservation is accepted, the user who made the reservation receives a notification.

- **Repair notice**
	Users can also request repairs to appliances or common rooms by selecting the request maintenance option in the main dropdown menu.
	They input the id number of the machine or room and give a brief description of the needed repairs.
	
	The created pending repair request is displayed to foundation staff who can then mark the machines as out of order / in maintenance and
	sort out repairs.
	
- **Second hand / giveaway**
	All users can choose the Second hand option in the main page dropdown menu and make a posting.
	
	The posting form includes a space to post images and a description.
	The AI API can also generate a description based on the images.
	
	Other users will see these postings on the main page (in order of recency) and are able to click to express intrest in the posting.
	
	The posters of the second hand postings can review their postings in the second hand page and see the usernames of all the users
	interested in their posting.
	
	
- **AI features**
	Check inappropriate request description or image postings.
	
	Generate text description summary based on user submitted images 
