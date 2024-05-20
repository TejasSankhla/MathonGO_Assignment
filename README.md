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



**Base URL**:  
`https://mathongo-assignment-2.onrender.com/`  
_Deployed on Render_

## Endpoints

### 1. Create a List
**Endpoint**: `POST /lists`  
**Description**: Creates a list with a title and custom properties.

**Request Body**:
```json
{
    "title": "string", // Title of the list
    "customProperties": [
        {
            "title": "string", // Title of the custom property
            "defaultValue": "string" // Fallback value of the custom property
        }
    ]
}
```

**Response**:
```json
{
    "success": true,
    "message": "List created successfully",
    "list": {
        "id": "string",
        "title": "string",
        "customProperties": [
            {
                "title": "string",
                "defaultValue": "string"
            }
        ]
    }
}
```

### 2. Add Users to List via CSV
**Endpoint**: `POST /add-users`  
**Description**: Adds users to the list through a CSV file upload.

**Headers**:
```
Content-Type: multipart/form-data
```

**Form Data**:
- `file`: (file) The CSV file containing users.

**Example CSV Format**:
```
name,email,city
John Doe,john.doe@email.com,Bengaluru
Jane Doe,jane.doe@email.com,
```

**Response**:
```json
{
    "success": true,
    "message": "Users processed",
    "successfulCount": 1,
    "failedCount": 1,
    "totalCount": 2,
    "errors": [
        {
            "row": 2,
            "message": "Email is required"
        }
    ]
}
```

### 3. Send Email to List
**Endpoint**: `POST /send/:listId`  
**Description**: Sends an email to all users in the specified list.

**URL Parameters**:
- `listId`: (string) ID of the list to send emails to.

**Request Body**:
```json
{
    "subject": "string", // Subject of the email
    "body": "string" // Body of the email with placeholders
}
```

**Example Request Body**:
```json
{
    "subject": "Welcome!",
    "body": "Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city]."
}
```

**Response**:
```json
{
    "success": true,
    "message": "Emails sent successfully"
}
```

### 4. Unsubscribe User
**Endpoint**: `GET /send/unsubscribe`  
**Description**: Unsubscribes a user from the list.

**Query Parameters**:
- `email`: (string) The email of the user to unsubscribe.

**Response**:
```json
{
    "success": true,
    "message": "User unsubscribed successfully"
}
```

## Environment Variables
In your `.env` file, set the following variables:
```
PORT=3002
Admin_Email=your_mail@example.com
Admin_Email_Pass=your_password
```

## Setting Up and Running the Server
1. Clone the repository:
   ```sh
   git clone https://github.com/TejasSankhla/MathonGO_Assignment
   ```
2. Navigate to the project directory:
   ```sh
   cd project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up your `.env` file with the necessary configurations.
5. Start the server:
   ```sh
   npm start
   ```

## Error Handling
If some users are not added due to errors, the API will return a CSV with the list of errors, including the count of users successfully added, count of users not added, and the current total count in the list.

## SMTP Configuration for Nodemailer
To configure SMTP with Gmail:
1. Enable 2-factor authentication on your Google account.
2. Generate an App Password for your application.
3. Use this App Password in the `Admin_Email_Pass` field in your `.env` file.

For detailed steps, refer to this [Stack Overflow answer](https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer).

---

By following this documentation, you should be able to efficiently test and use the User List Management and Email Sending API.
### Additional

If you are using personal mail to setup SMTP nodemailer service than google has restricted the access to third-party apps in its latest security updates. Here's how you can fix it->

- Enable 2-factor authentication to your google account
- Search for less secure web apps
- From Select App options select Other and write your app name it could be any name like mycustomapp
- It will generate you the password copy the password from the popup and use the following code.
- Use that copied password in the auth password section of the code

or refer to (https://stackoverflow.com/a/75135936/17865998)

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
