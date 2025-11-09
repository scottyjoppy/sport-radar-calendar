# Sport Radar Calendar

**_sport-radar-calendar_** is an interactive web application that displays and manages various sporting events through a dynamic calendar interface.

## Description

Sport Radar Calendar allows users to create, edit, and manage data related to sporting events. The app includes dedicated pages for managing data tables such as **Events**, **Tournaments**, **Teams**, **Sports**, and **Venues**.

## Installation

Clone the repository:

```bash
git clone https://github.com/scottyjoppy/sport-radar-calendar.git
```

Install dependencies:

```bash
npm install
```

## Usage

To start the development server, run:

```bash
npm run dev
```

## Tech Stack

- **Languages:** HTML, CSS, JavaScript

- **Framework:** Vue.js

- **Database:** PostgreSQL (_managed via Supabase_)

## Edge Cases

- Forms provide alerts for issues such as:
  - Duplicate names
  - Deletion of foreign key references
  - Missing required values
- Calendar grid expands or contracts based on the amount of rows needed.
- Calendar displays valid days per month including leap years.

## Relational Diagram

![Relational Diagram](/public/er_diagram.png)
