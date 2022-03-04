# Todo List

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Development Notes](#development-notes)
- [Testing](#testing)

## Introduction

This Todo List application was developed as an assignment in the open-source web development course known as The Oding Project (TOP). The link to the assignment page can be found [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/todo-list).

## Getting Started

Before we can start the live server we must first make sure that Node.js is installed. Check by opening your console and running `node -v`. If you can't see a version number you must install Node.js.

To view the app locally you can begin by installing the dependencies...

`npm install`

...and then start by running:

`npm run serve`.

The application should be live on `http://localhost:8080/` if it doesn't open automatically.

## Development Notes

At its core, this todo list application is very similar to the [library](https://github.com/zeagle848/Library) application I developed. It makes use of forms within a modal, it has to dynamically update the home screen with HTML items and the user has to be ability to edit these items. The difference lies in its complexity and the way we handle storage

### Modals and Displaying Todo Items

Instead of having one modal, the todo list has 3 different modals. One for creating a new todo item, one for editing an existing todo item and another for viewing the details of a todo item. The content of these modals are also much more complex than the modal found in my library application. Both the modal for creating a new todo item and editing a todo item has radio buttons for specifying priority, a dropdown menu for choosing or creating the project which the todo item belongs to, a date input for when the todo item is due and two text inputs, one for the name of the todo item and one for the description of the todo item.

Once a todo item is created, the home screen updates and adds the new todo item. Each todo item can be checked to mark that it has been completed, it can be deleted and it has two buttons associated with it that show either the edit modal or the description modal. This is a lot more functional than the libray application where the user could only delete a book card or mark a book card as read.

The application defaults to the home screen which shows all todo items arranged by date. The user can also sort by todo items due on the current day or the current week. Each todo item has a project that it falls under. Todo items can be sorted and dispayed by their project in the sidebar.

### Control Module

The application is state controlled rather than class controlled. We have one folder named state that has 4 files within it. Each file serves a specific purpose but the heart of
the functionality of the application itself is within the storage file. The storage file gets, sets, and removes any data associated with the todo list app. For example if I 
wanted to query a specific set of todo items I can use the `getTodoItems()` function which has a single `selectedFilter` parameter. I can filter based on a specific project,
todo items due today, todo items due this week or simply all todo items.

The state object that holds the data for all the todo items and projects is built to be immutable. That means that rather changing data within a single todo item within the state object we returnn a copy of the previous state with only the changes we want. So if we were for example wanting to edit a specific todo items description we would find that single todo item based on its unique ID, update its description and return a whole new state with only change being the description of that specific todo item.

## Testing

To run the testing environment we need to deploy the application first. The process is the same as what was outlined in the Getting Started section. We begin by making sure all the dependencies are installed by running `nmp install` in the console and then run the dev server by running `npm run serve`. 

Once the dev server is up and running we simply run `npm run e2e` and cypress should open a window where you run the tests by clicking the `sample_spec.js` file in the same window.
