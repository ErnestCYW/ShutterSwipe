# ShutterSwipe (NUS Orbital 2021: Artemis)
# Version: 2.3
# Link To App: https://shutterswipe.herokuapp.com/

## Motivation

There are several popular photo sharing social media platforms which currently exist today such as Instagram and Flickr. While they are phenomenal at connecting people and sharing photos, we find that existing platforms actually lack conduciveness and utility in supporting aspiring photographers.

**Problem 1: Visibility of content based on popularity rather than quality.**

Existing social media recommendation algorithms for promoting users are heavily based on popularity, making it difficult for new users who want to gain a following or expand their social network. Typical ‘Rich get richer’ problem. Our platform aims to promote good photos and not photos from popular photographers.

**Problem 2: Lack of specificity and focus as photography platforms.**

Instagram and Facebook are not specific to photography. For instance, if one searches for Disney accounts, one is likely to be recommended more Disney related content in the future. The same goes for brands, people, activities, equipment, etc. This creates a distracting and constantly fluctuating echo chamber that steals users’ attention and time, distracting from the meaningful interaction the platforms are supposed to provide. We believe that recommendations should be based on content rather than context of photos. ShutterSwipe allows users to dynamically tailor their preferences based on an intentional “swiping” feature.

**Problem 3: Lack of connection.**

The above points lead to the fact that many photo-based social sharing platforms are distracting and unconducive to genuine photography. Many people resort to forums such as Reddit and Discord to open channels for discussion, sharing, and linking up of members. However, these are temporary measures which have difficulty in scalability.

## Aim

ShutterSwipe aims to provide an environment that **connects** and **supports the discovery** of photographers of all levels. Instead of recommending photographs based on the number of followers the user has, ShutterSwipe aims to connect photographers intimately based on a mutual appreciation for the **quality and content of one another’s photographs** through an intuitive swiping feature.

## User Stories

- As a user, I want an intuitive and comprehensive log in experience.

- As a photographer, I want a profile page so that I can showcase my work. 

- As a photographer, I want to consume and appreciate new photographs that are catered to my personal preferences.

- As a photographer, I want to consume and appreciate new photographs in an intentional and addictive manner.

- As a photographer, I want to upload my photographs without dimension restrictions.

- As a photographer, I want to interact and form connections within groups that share similar interests in photography.

- As an enthusiast photographer, I want my photographs to be seen more, regardless of my following. 

- As an amateur photographer: I want to expand my reach and show my photos to more people. More exposure, discovery and reach.

- As an amateur photographer, I want to meet and learn from like-minded and similar styled photographers.

- As a professional photographer, I want to gain perspective on all aspects of photography and find inspiration.

- As a professional photographer, I want to appreciate all kinds of photographs more intentionally, compared to other social media platforms which encompass many distractions.

## Features & Overview

A **Web-Based Social Media Application** with the ability to recommend photos based on user grading through an intuitive “Swiping” feature and tags using an integrated Machine Learning: Computer Vision (Image Recognition) API.

### Recommendations

<img width="1792" alt="Screenshot 2021-07-26 at 8 56 21 PM" src="https://user-images.githubusercontent.com/71819961/127273147-35b6faa0-0fcf-49f4-aa9a-a56dfec13a8d.png">
<p align="center">
    Screenshot of feed
</p>

1. A user is able to view and upload photos within our database and “Like” / “Dislike” photos. This will affect the "score" of the photo.
2. The higher a particular photo's score, the higher its visibility amongst other users (See Recommendation Algorithm Below).

### Tagging

<img width="934" alt="Screenshot 2021-07-26 at 8 38 02 PM" src="https://user-images.githubusercontent.com/71819961/127273257-dbbe320a-97b7-40a5-a1e6-795110378537.png">
<p align="center">
    Sample Photo & Image Recognition Scores
</p>


1. Our Image Recognition software views photos and assigns labels within our database.
2. The more a user likes photos with certain labels the more these types of photos are shown to that user (See Recommendation Algorithm Below).

### Profile Creation & Chat

<img width="1791" alt="Screenshot 2021-07-26 at 8 46 16 PM" src="https://user-images.githubusercontent.com/71819961/127273391-7e4410e5-6e6e-47e0-ad30-36eb5aae0988.png">
<p align="center">
    Screenshot of Dashboard
</p>

<img width="1791" alt="Screenshot 2021-07-26 at 8 45 26 PM" src="https://user-images.githubusercontent.com/71819961/127273403-d8ebfbd2-b881-47ba-8aa5-ca12c31024d6.png">
<p align="center">
    Screenshot of Chats & Groups
</p>

1. Users are able to create profiles to show off their traits. They can also alter their preferred tags from here. They can also see their average picture rating from here.
2. Users can join various chat groups or create their own chat groups based on traits that they have selected

## Project Timeline

ShutterSwipe adopts a SCRUM AGILE software development methodology organised into weekly sprints. Please visit our github to find the up to date timeline in ShutterSwipe/Projects/AgileTimeline (https://github.com/ErnestCYW/ShutterSwipe/projects/1). For detailed breakdown of activities, please visit our worklog at (https://docs.google.com/spreadsheets/d/1WtUeQdHYBgkqElkPmwGKqhMC_Pin1ePMPfr_LYkdPr4/edit#gid=0). You may also see a formatted table version of our timeline (as of 26 July 2021) at (https://docs.google.com/document/d/1JPVqdVE3GMei6jREocn_i35Wd3AELTNCoUtVJmoNtYI/edit?usp=sharing)

## Software Architecture

![ShutterSwipe Architecture](https://user-images.githubusercontent.com/71819961/127273903-84693545-f382-48ec-8ce2-1f1f9f1ce2c3.png)
<p align="center">
    ShutterSwipe's Software Architecture
</p>

1. HTML / CSS / Javascript
2. React <sup>1</sup>
3. ExpressJS / NodeJS <sup>1</sup>
4. PostgreSQL <sup>1</sup>
5. Socket.IO
6. Google Cloud Vision API <sup>2</sup>
7. Heroku <sup>3</sup>


<sup>1</sup> Use of PERN Stack so as help in scalability (eg. IOS/Android Port). Non-client side heavy with backend focus (See Clean-architecture below)

<sup>2</sup> Google Cloud Vision provides a free service for up to 1000 photos. For the purpose of this project this will be our limit but it is easily extensible in the future.

<sup>3</sup> Trial deployment done on Heroku. See deployment below for additional details.

## Software Programming Principles & Concepts

### Versioning / version control

Throughout ShutterSwipe’s development, we have used the git and github platforms for distributed version control and source code management. We have also employed other features offered by github ( project board / bug tracking / etc…). Additionally, different iterations of ShutterSwipe are split into different versions and branched accordingly.

<img width="1220" alt="Screenshot 2021-07-26 at 8 49 03 PM" src="https://user-images.githubusercontent.com/71819961/127274622-295af01c-d2e1-481c-bdb1-604d319288b8.png">
<p align="center">
    Versioning done on Github
</p>

A detailed edition of our versioning documentation including specific features and breakdown can be found in miscellaneous/Documentation.txt (https://github.com/ErnestCYW/ShutterSwipe/blob/main/miscellaneous/Doumentation.txt)

### Clean Architecture

Usage of the PERN tech stack allows ShutterSwipe to employ the clean architecture principle. We have segregated our application into client-side and server-side, the latter for handling business rules and the former for interfaces. This allows ShutterSwipe to enjoy the following:

<img width="1410" alt="Screenshot 2021-07-26 at 8 50 35 PM" src="https://user-images.githubusercontent.com/71819961/127274725-d2351d63-d2e3-44a6-83d9-554ba53ff7e5.png">
<p align="center">
    Post Reqeuest To Backend Using Postman
</p>

1) Independent of frameworks: ShutterSwipe is independent of the existence of external libraries. Currently, ShutterSwipe’s only dependent framework is the external cloud vision API. This can be substituted in the future (See Extension Features: Proprietary Computer Vision Engine). However, ShutterSwipe does use various node modules and environments (express / bcrypt / socket.io / etc…).
2) Testable: The business rules can be tested without the UI, Database, Web Server, or any other external element. For example, backend GET and POST requests were tested using Postman (https://www.postman.com/api-platform/).
3) Independent of UI: The UI can change easily without changing the rest of the system. Almost all computation logic is done server side (eg. recommendation algorithm in server feed). This means that ShutterSwipe can be easily ported to other platforms (Android / iOS/ etc…)
4) Independent of Database: As seen from our database schema, data is stored in our postgreSQL server in an efficient manner (See Software Programming Topics: Relational Database below). The code can be viewed in our repository (https://github.com/ErnestCYW/ShutterSwipe/blob/main/server/database.sql). Note that we are able to easily swap out our database for alternatives (mySQL / MongoDB / etc…) due to the nature of data we store in our database.
5) Independent of any external agency: Business rules do not require any external information except datetime.

### SOLID design principle

We have elected to apply the SOLID design principle in the development of ShutterSwipe as much as possible. List below are some examples:

<img width="1450" alt="Screenshot 2021-07-26 at 8 51 52 PM" src="https://user-images.githubusercontent.com/71819961/127274950-27b0d39b-144e-4a84-be18-99d727e932ed.png">
<p align="center">
    ShutterSwipe's File Structure
</p>

1) Single Responsibility Principle: All classes and modules of ShutterSwipe are organised to handle a single task. As such all components handle a certain function of the application. This also allows us to understand our code better.
2) Open-closed Principle: ShutterSwipe is built such that it is open for extension (See extension features). However, ShutterSwipe’s current development requires it to be open for modification (See analysis of ranking algorithm below)
3) Liskov substitution Principle: Currently ShutterSwipe does not adhere to LSP (See Authenticated Navbar / Unauthenticated Navbar) as there has not been many instances where this can be employed. However, we do have plans to uphold this rule in the future (See groups / private groups)
4) Interface segregation principle: Currently ShutterSwipe does not require more than one interface. However, it is built such that our app is independent on type of interface (See clean architecture above)
5) Dependency inversion principle: ShutterSwipe does not have high-level modules which depend on low level-modules. We also do not have abstractions which depend on details.

### Error Handling

ShutterSwipe adheres to standard HTTP response status codes for error handling (https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). This allows us to easily troubleshoot our system in the future and for future software engineers to work on ShutterSwipe as well.

<img width="1146" alt="Screenshot 2021-07-26 at 8 53 21 PM" src="https://user-images.githubusercontent.com/71819961/127275145-5d756fdb-6961-4d9e-802b-a4c1d3167df2.png">
<p align="center">
    Example Of HTTP Error Status Handling
</p>

### Deployment & DevOps

Currently, trial deployment will be done on Heroku, however we would like to ensure that our application is free from bugs before continuing with this. As a social media application with a persistent database and photo storage, ShutterSwipe needs to employ a DevOps framework in the future (See public beta). As such we intend to apply containerization software (Docker) and container-orchestration system (Kubernetes). However, we are currently still learning about such technologies.

### AGILE Paradigm & Scrum Methodology

As highlighted in our timeline,  ShutterSwipe’s development team employs an agile paradigm and scrum methodology. Work is organised into weekly sprints with a sprint review conducted with our Orbital mentor every sunday, this also allows us to plan out our task for the coming sprint. Product and sprint backlogs are also present. Development is also organised into different tasks based on user stories. For our current scrum timeline please visit (https://github.com/ErnestCYW/ShutterSwipe/projects/1)

The ShutterSwipe Team hopes to migrate to a dedicated AGILE software in the future (eg. Jira / etc…), so to accommodate more members

### Testing

**Unit testing** :
Each module of the software has been tested separately. This was primarily done through functional testing based on our desired expectations of how each component was to act. 
- Frontend, backend and database routing is established
- Each of our main components, “Feed”, “Dashboard”, “Groups” and “Discover” functions as desired. 
- From unit testing, we have identified specific bugs left to iron out on the frontend React side, as well as the UI/UX. E.g. closing components on click, faster loading with React hooks. 
- The backend and database queries performance is primarily satisfactory.  

**Integration testing** :
All modules of the software are tested and  combined. Performed after unit testing and before system testing. All components interact with one another satisfactorily. After each additional feature (core or extension), we debugged and ensured that prior features were not compromised. E.g. Functional testing was done regarding each update to the SQL database.
- Dashboard: Traits + Uploading + CRUD operations 
- Feed: Like, Dislike + Recommendation of photo + Link to user profile
- Groups: Trait + CRUD operations + Search 
- Discover: Search + Link to user profile 

**System testing** :
We attempted to inspect every software unit to secure proficiency, guaranteeing that the total build fulfills the business specification. 
Critical checkpoints
- Recommendation of photos
- Tagging of photos
- Profile creation and chat 

**A/B, Acceptance testing, (and Beyond)** :
We are in the process of establishing the foundation to begin end user testing. 
- Deployment on Heroku
- Pseudo users testing 
- Population of database with photographs
For a list of our bugs encountered please visit (https://github.com/ErnestCYW/ShutterSwipe/blob/main/miscellaneous/Testlog.txt) 

## Software-programming Topics

### Analysis of ranking algorithm

<img width="1791" alt="Screenshot 2021-07-26 at 8 58 55 PM" src="https://user-images.githubusercontent.com/71819961/127275745-f8a9ef6b-7e4a-4ce5-ac55-b571b7fdfeb0.png">
<p align="center">
    Sample Of Uploaded Photos & Labels In Our Database
</p>

Our image recognition software recognises tags / labels of photos on upload (maximum 10 labels per photo). This information is stored into our database. Additionally, our database also notes which photos are liked by which user (See database schema). Each photo also has a photo_score, which corresponds to the number of times other users have liked that particular photo. ShutterSwipe’s primary ranking algorithm works as follow:
1) A selection of unique ids (UUIDs) corresponding to the different photos is drawn from our database every time a user enters his feed or likes / dislikes a photo. This selection is done based on the first 100 photos that have not been processed (ie. recently uploaded / not liked or disliked in a while).
2) A query is then performed on the user’s top 100 preferred tags and the number of occurrences the user liked each tag, this is based on previous liked photos.
3) A customised map is then initialized for each of the photos (ie. key = photo_uid, value = adjusted_score).
4) Each picture is then checked if its labels correspond to any of those liked by the user.
5) label_score =  0.7 (B-Value) * num_times_liked_by_user is then calculated.
6) The 100 key value pairs are then updated according to the following adjusted score = 1 (A-Value) *photo_score + label1_score + label2_score + label3_score + ….
7) The program then returns the picture_uid corresponding to the highest adjusted score


The above ranking algorithm allows us to continuously recommend new photos, in line with ShutterSwipe’s mission to promote aspiring photographers. It also allows us to recommend photos based on photo quality (through photo_score) and content (through tags & label_score). However, throughout our testing and design of the above algorithm, a few considerations have also been discovered:
1) We are unsure of the A (1), B (0.7), and selection (100)  values used in the above algorithm; these values are easily changeable in the future but selecting the right values requires immense mathematical knowledge or a large amount of refinement through long term testing.
2) Since photos are limited to top 100 photos that have not been processed, the recommendation algorithm runs in effective O(1) time complexity. However, this limits the scalability of our application as we would like to utilise the full library of images ShutterSwipe has in order to perform accurate recommendations. In this case (remove 100 photo limit), our recognition algorithms time complexity scales with the number of photos uploaded. It is then calculated that the time complexity for each recommendation is done is O(n^3*x + m*x) time where n=number of photos in database, x=number tags per photo, m = number of photos liked by a user.
3) It is assumed that SQL queries take O(1) time, but in actuality this is not the case

Some solutions we propose to solve the above problems:
1) Refactoring of recommendation algorithm (May require external help)
2) Refactoring of logic to be done in SQL instead

### Computer security using JWT

ShutterSwipe uses JSON Web Token (JWT) for purposes of authentication. JWTs are simple containers of JSON data that we can verify came from a reliable source. Data is encoded as a string and cryptographically signed (h264) using an .env variable. You may learn more here (https://jwt.io/)

![jwt-formula-98ad833a15fd1a66ed577442529bd0f49a291dc849b53ebfe18036fe867c6375](https://user-images.githubusercontent.com/71819961/127276131-d8165056-0ab0-4308-8f53-c04b23e940d2.png)
![jwt-session-c66df0e71adcde705ac96cd3fd402b040222d35d956eda49249ec7e1717a738d](https://user-images.githubusercontent.com/71819961/127276139-c21ec029-e56d-41fe-933e-b37f78f5d669.png)

ShutterSwipe therefore sends dynamic data to our backend for the purpose of authentication. A few limitations have been found with JWT:
1) Size: Storing an ID in a cookie is 6 Bytes but storing it in a JWT with header (See ShutterSwipe’s server/middleware/authentication.js) inflates the size to ~304 Bytes.
2) Redundant Checking: Every page in ShutterSwipe’s client require the user to be authenticated (See is_auth variable in Client/src/app.js). Data is not manipulated but still checked either way slowing down our program.
3) Redundant Signing: Cookies can be signed and return cryptographically without JWT
4) Critical Vulnerabilities: https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/
5) Misc: Currently, ShutterSwipe is having a bug regarding JWTs as we believe that the token is not being authenticated fast enough and being redirected (See Bugs in testlog OR problems encountered below). We are currently working on this bug.

### Computer security using PostgreSQL

<img width="1791" alt="Screenshot 2021-07-26 at 9 00 00 PM" src="https://user-images.githubusercontent.com/71819961/127276233-bd6139dd-85fa-4e49-8122-d31b83dc1803.png">
<img width="840" alt="Screenshot 2021-07-26 at 9 00 49 PM" src="https://user-images.githubusercontent.com/71819961/127276270-7aceab50-a0d0-4f38-ae03-0f820bf1d1f9.png">
<p align="center">
    Screenshot of SQL query and possible site for injection
</p>

As with any website using SQL, ShutterSwipe is vulnerable to SQL injections (https://portswigger.net/web-security/sql-injection). We plan on solving this issue before deployment.  

### Relational Database

![Database Schema](https://user-images.githubusercontent.com/71819961/127276339-2d468cb3-2bca-427b-aa77-3c9df5a20f89.png)
<p align="center">
    ShutterSwipe’s Database Schema
</p>

ShutterSwipe employs a relational database with SQL capabilities in the form of PostgreSQL (https://www.postgresql.org/docs/current/index.html). This was selected in place of other types of DBMS ( Hierarchical, Network, Object-Oriented) such as MongoDB. The tabular schema of our database can be seen above and is noted to adhere to the 3 normal forms of relational databases. Our decision to select this type of database was due to postgreSQL’s popularity as well as the possible need for normalisation in the future. We also understand that our current database schema is not ideal. The ShutterSwipe team is currently learning proper database management protocols and architecture. Our database will be updated in the future.

### Cloud Computing

<img width="1539" alt="Screenshot 2021-07-26 at 9 01 48 PM" src="https://user-images.githubusercontent.com/71819961/127276426-ba709f79-e903-4083-b150-64ea43601f4e.png">
<p align="center">
    Google Cloud Vision API Dashboard
</p>

ShutterSwipe currently uses google cloud’s platform to access its cloud vision API. The ShutterSwipe team has been looking into expanding into cloud computing services (AWS / Google Cloud / etc…) to aid in deployment.

### Concurrency

![Screenshot 2021-07-28 at 2 46 24 PM](https://user-images.githubusercontent.com/71819961/127276816-929ccd57-f2b1-4d12-9adc-65af60711be2.png)
<p align="center">
    Example Use Of Asynchronous Code As Opposed To Synchronous Suggested By Google (https://cloud.google.com/vision/docs/libraries#client-libraries-usage-nodejs) 
</p>
ShutterSwipe uses NodeJs and ExpressJS which are non-blocking input/output and asynchronous request handling frameworks (https://tsh.io/blog/simple-guide-concurrency-node-js/). This allows our application to benefit from the speed provided by a microservices architecture. It is also easily extensible in the future (See docker containers). Such a benefit is useful for a web-application such as ShutterSwipe.

<img width="1130" alt="Screenshot 2021-07-26 at 9 03 51 PM" src="https://user-images.githubusercontent.com/71819961/127276863-d5424e02-b896-4635-8958-3eda81a78006.png">
<p align="center">
    Example Use Of Synchronous Code
</p>
We have generally tried to take advantage of the asynchronous nature of Node & Express in our application. However, some instances require synchronous code (See recommendation algorithm above)

## Problems Encountered (v2.3)

### ***Technical Issues Can Be Found In: miscellaneous/Testlog.txt***

###Authentication / Routing
1) JWT authentication. Routing causes the login route to be accessed every time when navigating pages. Likely to be a front end problem regarding react states and resetting. 
  - Temporary solution: Authentication using localStorage.token.
  - Follow-up: Debug original method. 

2) UI/UX	
  - Photo grid display in “Dashboard” not optimised. Several options available. 
    - Original aspect ratio. (Rejected: White space)
    - Fixed aspect ratio, e.g 1:1 square. (Rejected: Lack of artistic appreciation for crop)
    - Fixed height or width. (Accepted: Optimal solution for displaying photos in a grid)
    - Temporary solution: Current implementation is based on fixed height, and leaves white space on certain widths of the browser. 
    - Follow-up: Dynamic calculation and scaling of photos based on height and width. 
  - Display resolution for different devices.
    - Follow up: Style css using flexbox and do more intensive system testing on frontend side. 

## Business Entrepreneurship

The ShutterSwipe team has plans to extend our project pass orbital. Several business concerns will be updated in the following weeks. See (https://github.com/ErnestCYW/ShutterSwipe/projects/1) Sprint #10 for additional details.

## Address to Orbital Evaluators

Thank you for all your feedback! They were really useful and gave us a lot of guidance when developing our application. Most of the features suggested have already been implemented in our latest version or have been planned in our extension features (eg. highlighted navbar / ability to see tags / average picture rating etc…). A few things we want to address:

- We also apologize for the confusion around our recommendation algorithm, we realise we did not explain it well enough :( As such, we have included a section titled analysis of ranking algorithm which goes in depth into our algo. Please feel free to contact us if you are still unsure.
- We are hard at work implementing all additional features, please check back when you can at the final submission!

###Questions:

- Is the picture rating specific to a trait or across all photos? No picture ratings  are determined by the adjusted_score, see analysis of algorithms above.
Will the Cloud Vision API slow down the application? 

Cloud vision queries are generally quite fast but with a large number of asynchronous uploads there may be a problem with this in the future. Currently we are unable to test in large numbers due to the limitations of free Cloud Vision. However, we have written our code such that even if the labels come at a later time, it still will not affect our ranking algorithm.

- Is the list of traits the same as the tags generated by the computer vision API or is it a static list stored by the system?
 
Tags and Traits are completely separate! Tags are labels detected by cloud vision while traits are user selected options which define their profile and help them find recommended groups!

- Has it (recommendation feature) been implemented already?

YES! It has been implemented, however we are unable to demonstrate it without a large number of photos. We will take this into consideration for our final project video submission.

- How do you define picture score and tag score, and how are they calculated? Will you determine the optimal coefficients A and B for all users, or will the users be able to customise these two values?

As explained in our analysis of the ranking algorithm section, we are unsure of the proper values of A and B :( . However through beta testing and deployment we aim to refine the values based on user feedback.

