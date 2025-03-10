# Movie Uploader Project

This project is a React-based application for uploading and previewing movie data. It allows users to upload movie data, view a preview of the uploaded movies, search for movies by title and language(optional) and filter by genre  via the TMDB API.

## Features

- Upload movies data in bulk.
- View a preview of uploaded movies with the option to remove them.
- Search for movies using the TMDB API and manually add them to the preview.
- Support for movie title searches in multiple languages.
- Genre filtration of the search results.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher)

## **API Token Setup**

To access the API in this application, you will need a valid API token. The token should be placed in the `.env` file, which is used to authenticate requests made to the API.

### **Steps to Get Your API Token:**
1. Go to [API provider's website](https://www.themoviedb.org/signup) and create a free account.
2. After creating an account, log in to your dashboard and find your API token [here](https://www.themoviedb.org/settings/api).
3. Copy the token.

### **Setting Up the API Token in Your Project:**
1. In the root of your project, locate the `.env` file. If the file does not exist, create it.
2. Add the following line to the `.env` file:
    ```bash
    REACT_APP_TMDB_API_KEY=your-api-token-here
    ```
3. Replace `your-api-token-here` with the token you copied in Step 2.
4. The application will automatically use the token from the `.env` file to make requests to the API.

### **Security Note:**
For development purposes, the API token is stored in the `.env` file. However, remember that this is not secure for production environments. In a production setup, it is recommended to store API tokens securely on the backend and never expose them in the frontend code.


### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/movie-uploader.git
   ```
2. Navigate to the project folder:
    ```bash
    cd movie-uploader
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. To start the development server:
    ```bash
    npm start
    ```

2. Open your browser and visit http://localhost:3000 to view the app.

## Testing the Save Functionality

To test the save functionality in the project, follow these steps:

1. Open the `tmdb.js` file in your project.
2. Locate the `saveMovies` function. In this function, you will find an API request to save the movies:
    ```javascript
    let response = await fetch("https://dummyapi.com/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });
    ```

3. Inside the comments of the `saveMovies` function, you will find instructions to mock the response for testing purposes. 

4. Comment out the `fetch` call and uncomment these lines (mocked response) like this:
    ```javascript
    const response = { ok: true };
    ```

This will simulate a successful save operation without making an actual API request.

5. Once you've completed the testing, you can uncomment the original `fetch` code to restore the functionality.

This process will allow you to test the save functionality without needing access to the real API. Make sure to follow the comments in the code for detailed instructions.


### Folder Structure

##The project is organized as follows:

- `src/`: Contains all the React components and pages.
  - `components/`: Reusable components like `MovieCard`, `MovieSearch`, etc.
  - `pages/`: Specific pages like `UploadFilePage` and `PreviewMoviesPage`.
  - `api/`: Contains services to communicate with external APIs (e.g., for fetching movie data).
- `public/`: Static files like `index.html` and `favicon.ico`.
- `App.js`: The root component where the main app logic resides.

### License

This project is licensed under the MIT License - see the LICENSE file for details.

