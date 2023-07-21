# Deploy Backend to Heroku:

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