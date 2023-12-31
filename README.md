# Kanban Board
Manage your work at personal and/or organizational level using kanban board.

## Table of Contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Demo](#demo)
+ [Illustration](#illustration)
+ [Features](#features)

## General Info
A Kanban Board visually depicts work at various stages of a process using cards to represent work items and columns to represent each stage of the process. Also, users can create as many boards as they need, each representing a different process.

## Technologies
> This is a frontend of the full stack project. The complete project is created using
+ React (Frontend)
+ Material UI (CSS Framework)
+ react-router-dom (Client Side Routing)
+ Node (Backend)
+ Express (Backend Framework)
+ MongoDB (Database)

## Setup
To run this project locally

```
# clone this repository
git clone https://github.com/Tanishka-2000/KanbanBoard.git

# Go into the repository
cd KanbanBoard

# install dependencies
npm install

# start app
npm run dev
```
> To see the APIs used by this app go to [https://github.com/Tanishka-2000/kanbanBoard_api](https://github.com/Tanishka-2000/kanbanBoard_api)

## Demo
Here is the live working demo [https://tanishka-kanban-board.netlify.app/](https://tanishka-kanban-board.netlify.app/)

## Illustration
### Login/Signup page
![login page](public/login.png)
### Home Page in Light mode
![Home page in light mode](public/home_light.png)
### Home Page in Dark mode
![Home page in dark mode](public/home_dark.png)
### Board route in Light mode
![Board route in light mode](public/board_light.png)
### Board route in Dark mode
![Board route in dark mode](public/board_dark.png)

## Features
+ A login/signup screen.
+ Once logged in, a session is created using JWT(JSON Web Token).
+ A home screen with a list of all existing boards and a button to create new boards.
+ Each board can be edited and deleted easily with a button click.
+ Clicking on a board will take the user to the 'board route', which contains a list of columns and cards defined under it.
+ A user can create new columns, edit and delete existing columns, create new cards, and edit and delete existing cards.
+ The cards can be shifted between columns by dragging and dropping.
+ Dark and Light mode is available.