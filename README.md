# APAD-Team-Project
Project files for our team project in the UT MSITM Advanced Programming &amp; App Development class

## Latest Deployments:

* **Frontend**: https://vercel.com/hschickdevs/apad-project-frontend
    - URL: https://apad-project-frontend.vercel.app
* **Backend:** https://dashboard.heroku.com/apps/apad-project-backend
    - URL: https://apad-project-backend-22fdec946e0a.herokuapp.com/

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

5. Return to the **Deploy** tab and click **Deploy Branch** under **Manual Deploy**

    * Make sure that the branch is `main`


6. If the build succeeds, you can find the resulting URL next to **Settings** -> **Domains**

## Frontend Deployment Instructions:

1. Create a new project on https://vercel.com/

2. Connect the project to the GitHub repository

3. In the Vercel project **Settings** tab, set the **Root Directory** to `frontend`

4. Deploy the project
