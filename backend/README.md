# Freelancer Platform API (Django + DRF)

This is the backend for the Freelancer Platform using Django and Django REST Framework. It supports feature-based structure, JWT authentication, and will be connected to a React frontend.

---

## Tech Stack

- Python 3.x
- Django 4.x
- Django REST Framework
- Simple JWT (for token-based auth)
- Custom User Model
- CORS Headers (to enable frontend communication)

---

## Setup Instructions

### 1. Clone the Repository

````bash
git clone <https://github.com/mhadad99/graduation-project.git>
cd freelancer-platform

### Installation

1. Clone the repository:

2. Create a virtual environment:
   in the termal/command prompt

`python -m venv venv` #never do it again unless from start

3. Activate a virtual environment:

# On Windows

`venv\Scripts\activate`

# On macOS and Linux

`source venv/bin/activate`

4. Install required packages:

   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers

4^. Add your Database credentials to PostgreSQL, in settings.py:
      ```
      DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',  # Change to PostgreSQL
        'NAME': 'your_database_name',  # Replace with your database name
        'USER': 'your_database_user',  # Your PostgreSQL username
        'PASSWORD': 'your_database_password',  # Your PostgreSQL password
        'HOST': 'localhost',  # Set to your PostgreSQL host (localhost if it's on the same machine)
        'PORT': '5432',  # Default PostgreSQL port
         }
            }
      ```
5. Create App:

   python manage.py startapp `App_NAME`
         -- Add to the new app folder: serializers.py,urls.py
         -- include new urls to the main urls.py file in config



   ##Database Migrations

   5^. Make Migrations
         python manage.py makemigrations

   5^^. Apply Migrations
         python manage.py migrate


   ##

6. Run server:
   python manage.py runserver


---
````
