# FastAPI Project

Backend API for the central JOVS Project

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Python 3.6+
- `pip` package manager

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

4. Install project dependencies using pip:

`pip install -r requirements.txt`

5. Running the App
   Start the development server using uvicorn:
   `uvicorn app.main:app --reload`
   Access the app in your web browser or API client at http://127.0.0.1:8000.
   Or this link http://localhost:8000/docs#/

- NOTE: Every time you want to run the api server do step 3 and 5
- NOTE2: `pip freeze > requirements.txt` will update the requirements.txt file i guess
