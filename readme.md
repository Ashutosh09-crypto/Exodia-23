# <span style= "color:orange">**Exodia-23**</span>
## <span style= "color:pink"> _How to setup the Project:_ </span>
### - Make sure you have a git hub account and git bash installed on your laptop/computer as all the work will be done through the git hub, if not then first create a git hub account
* ###  Assuming you have a git hub account, now click on the following link:

* ## [Repository link](https://github.com/Ashutosh09-crypto/Exodia-23)

* ## ![see the image](static\images\Screenshot(220).png)


* ### now click on the fork and fork the repository
* ## ![see the image](static\images\Screenshot(220)c.png)
* ### now we have to clone the repository, for that create a new folder in which you want to clone the repository and open git bash in that folder
* ###  After that go to the repository and click on the ``` code ```, there you will see the clone repository, select ```SSH``` if you have set up using SSH id and then copy the ```URL```.
## ![see the image](static\images\code.png)
---
---
## ![see the image](static\images\codessh2.png)

* ### Now go to the gitbash and write the following commands:
* <span style= "color:yellow"> git clone url (jo uper copy kiya tha) </span>
* now add remote for upstream using the command: <span style = "color:yellow "> git remote add upstream git@github.com:Ashutosh09-crypto/Exodia-23.git </span>

### <span style="color:tomato">Note:the link of the cloning repository used is SSH, if that not work then try the link of HTTP format </span>

* ###  Now the repository is setup
* ### Now make sure you have the node installed on your device if not then install it from the below link
* ## [nodejs installation link](https://nodejs.org/en/download/)
* ### now run the command in the windows terminal to check if the node is installed properly or not:<span style= "color:yellow"> node --v  </span>

* ### now in the  git bash and type :<span style="color:violet"> npm i</span>, this command will install the required dependeincies

* ### Now open the cloned folder in the vs code or any othe folder, it should have a similar folder structer like that shown in the image(note: some folders will not be there ignore that)
* ---
* ![imgae of the folder structure](static\images\config.png)
* ### now go to the config folder and paste the config.env file there, download that file from the exodia core team group

* ### now in the git bash run the command <span style = "color:violet">npm run dev </span>, this command will run the server.
* ## <span style= "color:lightgreen">now your project is set up completely. </span>
