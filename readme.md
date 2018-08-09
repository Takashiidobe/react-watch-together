# React-watch-together

This is a react-watch-together app that uses websockets to sync the user's
position on the video that they are watching, so they can watch knowing that
their friends are at the exact same spot.

## Get Started

To begin participating, git clone this repo, with:
`git clone https://github.com/Takashiidobe/react-watch-together`

then, use the package manager of your choice to install the dependencies in both
the root and client folders.

First move to the root directory at ./react-watch-together and install the
required dependencies:

with npm: `npm install`

with yarn: `yarn install`

then you can move to the client folder and install, or use the `client-install`
script provided in the root directory's package.json in order to install the
client's dependencies.

with npm: `npm client-install`

with yarn: `yarn client-install`

To work on the sass, you will need to run the script `sass` while inside of the
client folder. To do this, navigate to the client directory
(./react-watch-together/client) and then run the sass script:

with npm: `npm sass`

with yarn: `yarn sass`

And you're all set!

## To-do

#### Enhancements

- Creating rooms and room links with react-router-dom.

- Creating rooms and a landing page where the user would be prompted for their
  username and which room they would like to join.

- A dynamically generated page that displays all of the rooms currently
  available

- Integration of chat and notifications for each respective room

#### UI/UX Changes

- I'm all up for suggestions on UI changes! Go ahead and suggest them and make
  PRs to your own branches.

## Other Projects

help me out with my
[react-pair-programming app](https://github.com/Takashiidobe/react-pair-programming)
