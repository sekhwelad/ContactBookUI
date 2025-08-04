# Contact Book

A responsive Angular 17 application that allows users to browse, create, and manage contact profiles. It features profile picture uploads, fallback to name initials when no image is present, and server-side pagination for smooth navigation through large datasets. Built using Angular Material, SCSS, and clean architectural practices.

---

## Features

- **Paginated contact browsing** – view profiles page-by-page
- **Add new contact** – with real-time validation
- **Upload profile picture** – or fallback to initials if none
- **Initials avatar fallback** – displays contact initials when `imageUrl` is null
- **Clean Material UI** – using Angular Material and SCSS
- **Environment-based API config** – easily switch between dev and prod

---
##  Environment Configuration

Set your backend API base URL in the environment files:

### `src/environments/environment.ts`


<pre>
export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:5000/api/v1'
};</pre>


## Getting Started

**Install Dependencies**
<pre>npm install</pre>

**Run the App**
<pre>ng serve</pre>

## App Functionality Overview
**Profile Display**
- Displays profile information using Angular Material cards

- `imageUrl` is used to show profile pictures

- If `imageUrl` is `null` or broken, initials fallback is shown

## Creating a Profile
- Click **Create Profile** button

- Opens a Material dialog with a reactive form

- Validations are enforced (e.g., required fields, email format)

## Uploading a Profile Picture
- Hover over avatar area to trigger upload

- Image is sent via `multipart/form-data` to the API

- New image replaces initials fallback on success

## Pagination
- Next/Previous buttons to browse paginated results

## Author
**Delight Sekhwela**<br>
Senior Fullstack Developer

