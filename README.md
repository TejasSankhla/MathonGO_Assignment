# User List Management and Email Sending API

Designed and implemented a RESTful API for managing a list of users with customizable properties and sending emails to the users.

## Installation:

1. clone the repo to you local

```
git clone https://github.com/TejasSankhla/MathonGO_Assignment
cd project
```

2. Install the dependencies

```
npm install
```

3. Setup .env file 

```
PORT=3002
Admin_Email=your mail
Admin_Email_Pass=your passs
```

4. Start the Express Server

```
npm start
```

### Routes

```

//list routes
router.post("/lists", listController.createList);// create a list

//add User to list
router.post("/add-users", upload.single("file"), userController.addUsers);// Add users to the list through csv file

//Email sending routes
router.post("/send/:listId", emailComtroller.sendEmailToList);
router.get("/send/unsubscribe", unsubscribeController.unsubscribeUser);
```

## **Features:**

1.  **List Creation**: Admin can create a list with a title and custom properties. Custom properties have a title and a default/fallback value.

2.  **User Addition**: Admin can add users to the list via CSV upload. The application should efficiently handle CSVs with 10,000+ records.

3.  **CSV Format**: The CSV's first row will have header values. 'name' and 'email' are required fields for a user, and 'email' should be unique. Custom properties can be set for a user by defining headers matching the custom properties title in the CSV. If no value is defined, use the fallback value.

    **Sample CSV Format:**

    `city` is a custom property

    Since, the second record doesn’t have the city value defined in the csv, the fallback value present in the list should be used for this record.

    | name      | email              | city      |
    | --------- | ------------------ | --------- |
    | Johne Doe | john.doe@email.com | Bengaluru |
    | Jane Doe  | jane.doe@email.com |           |

4.  **Unique Emails**: No two users with the same email can be present in a list.

5.  **Error Handling**: If some users are not added due to errors, return the CSV with the list and the error. The response must mention the count of users successfully added, count of users not added, and the current total count in the list.

6.  **Emails**: Admin can send an email to the complete list.

7.  **Custom properties** can be included as placeholders in the email body, to be replaced when the email is sent. The format for placeholders is `[name_of_the_property]`

For e.g. If the email body looks like this:

```
Hey [name]!

Thank you for signing up with your email [email]. We have received your city as [city].

```

The final email received by John Doe will be:

```
Hey John Doe!

Thank you for signing up with your email john.doe@email.com. We have received your city as Bengaluru.
```

​ 8. The email will contain an unsubscribe link. Clicking it will unsubscribe the user from the list i.e., when admin sends email to this specific list, the respective user should no longer receive the email.

## Tech Stack:

Node JS (with JS )
Express JS
MongoDB
