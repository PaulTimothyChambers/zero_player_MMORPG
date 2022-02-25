# **John Conway's Game of Life: Reimagined as an MMORPG (minus the second 'M', the 'R', and the 'P'...so just a MOG, really)**


## **Table of Contents**

- [Abstract](#Abstract)
- [Technologies](#Technologies)
- [Illustrations](#Illustrations)
- [Installation and Set Up Instructions for MacOS Users](#Installation-and-Set-Up-Instructions-for-MacOS)
- [Future Features](#Future-Features)
- [Contributors](#Contributors)


## **Abstract**

- This repository represents my third recreation of John Conway's 'Game of Life'. The first (working) version was written in vanilla JavaScript(JS), the second (non-working) version in React, and the third (working) version using SvelteKit Beta (Svelte v-3.44.0). The aim of each version has been to overcome the main challenge encountered when using JS to write a program that it is not (to my knowledge) specifically designed to handle.
  This challenge, in short, is two-pronged: where/what/when information is stored must be carefully rationed out (in order that the many resource-heavy functions needed for this program to run in JS may do so without slowing the program down) while supporting an ever-increasing number of on-screen cells. Each version has leveraged my growing knowledge/ability with JS (and the various frameworks used) in order to produce the fastest, most efficient, and 'cheapest' solutions I can currently think of (though I am optimistic that better solutions may present themselves as my skill with JS grows).


## **Technologies**

- CSS
- Cypress
- HTML
- JavaScript
- Netlify
- Svelte
- SvelteKit


## **Illustrations**

![app in action](https://github.com/PaulTimothyChambers/zero_player_MMORPG/blob/main/ZPGforGITHUB2.gif)


## **Installation and Set Up Instructions (for MacOS)**

***Note: following this guide is the only way to interact with the project until such time as it has been successfully deployed to the web. This guide assumes that the reader is unfamiliar with how to locally host an application, so included below is a detailed, step-by-step walk-through of how to accomplish everything needed to get this project 'up and running'***

-----------------------------------------------------------------------------

**Brief overview of installation process:**
  - Clone this repository to your local machine
  - Install development dependencies
  - Run the project from a local server port (default is port 3000)

-----------------------------------------------------------------------------

### **Detailed instructions:**

#### **Part 1: the Terminal**

1. Open the ```terminal``` application (most likely located in the launchpad in the 'other' folder)

![launchpad's other folder](https://i.imgur.com/dr2hdT8.png)
![terminal app](https://i.imgur.com/hEDcSfO.png)

2. By default, the terminal should start you in the directory ```Users/your-username-here``` (see example below)

![terminal example](https://i.imgur.com/30Q9Yk3.png)
***Note: if your terminal shows you deeper into your directories than this (for example, ```Users/your-username-here/desktop/my-music-folder```), type ```cd ~``` in the terminal and press the ```enter``` key***

3. Next, type ```cd desktop``` into the terminal and press ```enter```

-----------------------------------------------------------------------------

***~Time to move on to the browser...***

-----------------------------------------------------------------------------

#### **Part 2: the Browser**

4. Scroll to the top of this webpage and you will see a green ```code``` button. Click it and a dropdown menu will appear

![code button](https://i.imgur.com/PCdvvuO.png)

5. Select the ```SSH``` tab by clicking on it (you'll know it's selected when an orange line appears underneath it)

![SSH button](https://i.imgur.com/vmA7NiV.png)

6. Once the ```SSH``` tab is selected, press the button (as shown below) to copy this repository's SSH address to your clipboard

![copy button](https://i.imgur.com/Y6jnw9a.png)

-----------------------------------------------------------------------------

***~Now, back to the terminal we go...***

-----------------------------------------------------------------------------

#### **Part 3: the Terminal Sequel No One Asked For**

7. Back in the terminal, type ```git clone```, then press the ```space bar``` once. After hitting the space bar, press ```cmd + v``` to paste in the SSH address we copied earlier

8. Press enter and wait for a few moments while the terminal works

9. You will know the terminal is finished working once the directory you are in is shown once more, as in the following image

![cloning complete](https://i.imgur.com/KCehSls.png)

10. Next, type ```cd zero_player_MMORPG```. This will navigate you into the directory of the project you just copied onto your desktop

-----------------------------------------------------------------------------

***~We're almost there! Just a few more, short steps...***

-----------------------------------------------------------------------------

11. Remaining in the terminal, type ```npm install``` and wait for it to finish working (which will look ***very loosely*** like the following image)

![npm installed](https://i.imgur.com/bkJkRWW.png)
***Note: notice once more how the "address" of the terminal is shown at the bottom, once the process initiated by the "npm install" is complete***

12. Only two more steps to go! Type ```npm run dev``` in your terminal, and press ```enter```

-----------------------------------------------------------------------------

#### **Part THE END: Back to the Browser, Marty!**

13. Open up any tab in your browser and type ```localhost:3000``` into the address bar. Press ```enter``` and you're done! The interactive portion of this application will now display itself on your screen. Enjoy! :-)

![address bar](https://i.imgur.com/72WgUD8.png)

![application displaying](https://i.imgur.com/5tomT0I.png)


## **Future Features**

- An adjustable slider to manipulate the game speed (live change?)

- The total score achievable for each preset configuration displayed next to that configuration

- A 'Preview Configuration' button for each saved configuration

- Information icons a user can hover over to view helpful details for each on-screen button's functionality

- Helpful, pop-up 'hints' to display in certain cases. For example, if a user creates a custom configuration wherein no active cells have any active neighboring cells, pressing 'Begin Game' will cause all the selected cells to immediately become inactive on the first pass through the gameboard. Within the game over notification, a helpful hint could be displayed, advising a user to be sure to group active cells (to some degree), so that the baked-in game rules may extrapolate further on the user's design.


## **Contributors**

- Paul Chambers </br>
[<img src="https://img.shields.io/badge/GitHub-181717.svg?&style=flaste&logo=github&logoColor=white" />](https://github.com/PaulTimothyChambers) [<img src= "https://img.shields.io/badge/in-LinkedIn-blue" />](https://www.linkedin.com/in/paultimothychambers/)
