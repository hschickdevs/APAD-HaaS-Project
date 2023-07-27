<div align="center">
    <img src="https://infonetworks.com/wp-content/uploads/2023/01/hardware-as-a-service.png" style="border-radius: 50px;" width="200px">
    <h1>APAD-HaaS-Project</h1>
</div>

This team project, in our Advanced Programming &amp; App Development (APAD) class at the University of Texas at Austin, involves the creation of a comprehensive Hardware-as-a-Service (HaaS) system featuring both a backend and frontend. 

* The backend, a RESTful API, allows for account management, project creation and access, and resource viewing, requesting, and management. It is developed using Flask and MongoDB, with secure routes protected by JSON Web Tokens (JWT).

* The frontend is built with React and styled with Material-UI. This frontend communicates with the backend API to provide users with an intuitive interface for managing their hardware resources.

The combined system provides a robust platform for managing theoretical hardware resources in a shared environment, with a focus on security, usability, and efficiency.

## Latest Deployments:

* **Frontend Project**: https://vercel.com/hschickdevs/apad-project-frontend
    - Site URL: https://apad-project-frontend.vercel.app
* **Backend Project:** https://dashboard.heroku.com/apps/apad-project-backend
    - Backend Endpoint: https://apad-project-backend-22fdec946e0a.herokuapp.com/
    
## Backend Deployment Instructions:

1. Create a new app on Heroku

2. Under **Deploy** tab, select **GitHub** as the deployment method and connect to the repository

3. Go to the **Settings** tab, and add the following buildpacks:

    * https://github.com/timanovsky/subdir-heroku-buildpack.git 
        
        - make sure that it is at the top

    * heroku/python 
    
        - Select 'python' under the officially supported buildpacks

4. Next to **Config Vars**, click _Reveal Config Vars_ and add the following variable:

    * `PROJECT_PATH` = `backend`
    * `JWT_SECRET_KEY` = `<RANDOM_SECRET_KEY_FOR_PWD_HASHING>`
    * `MONGO_DB_URI` = `<MONGO_DB_ATLAS_URL>`

5. Return to the **Deploy** tab 

6. Click on **Enable Automatic Deploys** for CI/CD

7. Click **Deploy Branch** under **Manual Deploy**

    * Make sure that the branch is `main`

8. If the build succeeds, you can find the resulting URL next to **Settings** -> **Domains**

## Frontend Deployment Instructions:

1. Create a new project on https://vercel.com/

2. Connect the project to the GitHub repository

3. In the Vercel project **Settings** tab, set the **Root Directory** to `frontend`

4. Deploy the project
