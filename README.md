# ShutterSwipe (NUS Orbital 2021: Artemis)

## Motivation

There are several popular photo sharing social media platforms which currently exist today such as Instagram and Flickr. While they are phenomenal at connecting people and sharing photos, we find that existing platforms actually lack conduciveness and utility in supporting photographers.

**Problem 1: Visibility of content based on popularity rather than quality.**

Existing social media recommendation algorithms for promoting users are heavily based on popularity, making it difficult for new users who want to gain a following or expand their social network. Typical ‘Rich get richer’ problem. Our platform aims to promote good photos and not photos from popular photographers.

**Problem 2: Lack of specificity and focus as photography platforms.**

Instagram and Facebook are not specific to photography. For instance, if one searches for Disney accounts, one is likely to be recommended more Disney related content in the future. The same goes for brands, people, activities, equipment, etc. This creates a distracting and constantly fluctuating echo chamber that steals users’ attention and time, distracting from the meaningful interaction the platforms are supposed to provide. We believe that recommendations should be based on content rather than context of photos.

**Problem 3: Addictive features of social media platforms are detrimental to mental health and authenticity.**

“Intermittent positive reinforcement” is a tactic all social media platforms incorporate - All photo-sharing platforms use a ‘like’ system which puts a numerical quantifier on the quality of the photo. As humans who yearn for social approval, especially where unpredictability of results releases dopamine (See Michael Zeiler’s Pecking Pigeon experiment in 1970s), the focus of sharing a photo becomes a popularity contest. This defeats the purpose of sharing and consuming content which is truly enjoyable and unique for authentic enjoyment. The ‘scrolling’ interface of existing platforms is designed to keep users hooked on new and refreshing content, further stealing time and providing distraction for the sake of the Company’s monetary profit. E.g. Instagram’s discovery page is intended to have users scrolling mindlessly for hours. To solve this, we design the app’s interface such that photos in one’s feed appear one by one, with a swipe left or right feature. This inherently makes one more intentional when deciding whether a photo is good or bad.

**Problem 4: Lack of connection.**

The above points lead to the fact that many photo-based social sharing platforms are distracting and unconducive to genuine photography. Many people resort to forums such as Reddit and Discord to open channels for discussion and sharing of photos. However, these are temporary measures which have difficulty in scalability.

This leads us to...
As photographers ourselves who experience our personal frustrations with these channels, we want to create a platform that is not in competition with such websites, but serves to provide a supplementary unique experience of discovery, interaction and appreciation of photography.

## Aim

ShutterSwipe aims to provide an environment that **connects** and **supports the discovery** of photographers of all levels. Instead of recommending photographs based on the number of followers the user has, ShutterSwipe aims to connect photographers intimately based on a mutual appreciation for the **quality of one another’s photographs**.

## User Stories

- As a user, I want a smooth log in experience.

- As a user, I want a quick, responsive and encompassing profile page.

- As a user, I want to be able to promote and link my other social media pages.

- As a user, I don’t want to be distracted as I am on other social media platforms.

- As a user, I want to upload my photographs seamlessly and efficiently.

- As a user, I want something to supplement my Instagram / Flickr.

- As an enthusiast photographer, I want my photographs to be seen more regardless of my following.

- As an enthusiast photographer: I want to receive more feedback on my photos in a timely and unbiased manner.

- As an amateur photographer: I want to expand my reach and show my photos to more people. More exposure, discovery and reach.

- As an amateur photographer, I want to meet and learn from like-minded and similar styled photographers.

- As an amateur photographer, I want to discover new perspectives and meet up with other skilled photographers to go on walks and events to take photos.

- As an amateur photographer, I want to connect with professional photographers to up my level and learn new things.

- As a professional photographer, I want to reach out and give back to the photography community in a genuine way.

- As a professional photographer, I want to appreciate all kinds of photographs more intentionally, compared to other social media platforms which encompass many distractions.

## Features & Overview

A **Web-Based Application** with the ability to recommend photos based on user grading through an intuitive “Swiping” feature and tags using an integrated Machine Learning: Computer Vision (Image Recognition) API.

<img src="https://user-images.githubusercontent.com/71819961/118116821-59e28200-b41d-11eb-904e-bf8ef99d2c5c.png" width="500">

### Recommendations

1. A user is able to view and upload photos within our database and “Like” / “Dislike” / “Save” photos. This will affect the "score" of the photo. The rate of growth of score is modelled after a logarithmic graph so new photos still have a chance of being recommended. All photos start off with an equal score.
2. The higher a particular photo's score, the higher its visibility amongst other users.

<img src="https://user-images.githubusercontent.com/71819961/118116824-5bac4580-b41d-11eb-818a-005884ee23c4.png" width="500">

### Tagging

1. Our Image Recognition software views photos and assigns tags within our database.
2. The more users like a photo with certain tags the more these types of photos are shown to that user.

<img src="https://user-images.githubusercontent.com/71819961/118116790-4d5e2980-b41d-11eb-95f8-54057af4bb1f.png" width="500">

### Profile Creation & Chat

1. Users are able to create profiles to show off their traits. They can also alter their preferred tags from here. They can also see their average picture rating from here.
2. Should two users share common traits (Preferred Tags / Location / Etc..), our application will notify these two accounts and open a chat room for them to connect.
3. Our application will also notify users to join global chats based on their traits (eg. Food, Singapore, Food + Singapore, etc...)

## Project Timeline

### Features To Be Completed By 12 Jun 2021:

1. Allow users to create accounts which includes photo category preferences (E.g. Sunsets / Cats / Nature / etc... ) and details (E.g. Sex / Age / Location / etc... ).
2. Allows users to upload photos to their portfolios on our database (Figure 3).

### Features To Be Completed By 28 Jun 2021:

1. Implementation of Computer Vision API & tagging system.
2. Enable users to view photos within the database and rank photos via the “like”, “dislike”, “save” feature.

### Features To Be Completed By 26 Jul 2021 to Splashdown:

1. Chat & Connecting Users Function.
2. Trial Deployment.

### Optional Features & Extensions (Arranged Based In Order Of Priority):

- Explore / Search Feature
- Android / IOS Port
- Expanding Storage Database
- Augmentation of Image Recognition API using alternatives (AutoML / Rekognition / etc..) or even proprietary engine in future
- Photo Captions
- Commenting and leaving feedback
- Auto-Grading Of Photos (Color Theory / Photography Principles / Weighted Rankings / Etc...)
- Downloading to local machines

## Tech Stack

![ShutterSwipe Architecture](https://user-images.githubusercontent.com/71819961/119790364-72b36300-bf06-11eb-861a-1745c8a1b1e3.png)

![Database Schema](https://user-images.githubusercontent.com/71819961/119814038-8cf83b80-bf1c-11eb-9fb8-51369a3ff28f.png)

1. Google Cloud Vision API <sup>1</sup>
2. HTML / CSS / Javascript
3. ExpressJS / NodeJS <sup>2</sup>
4. PostgreSQL <sup>2</sup>
5. React <sup>2</sup>
6. Heroku <sup>3</sup>

<sup>1</sup> Google Cloud Vision provides a free service for up to 1000 photos. For the purpose of this project this will be our limit but it is easily extendible in the future.

<sup>2</sup> Use of PERN Stack so as help in scalability (eg. IOS/Android Port). Non-client side heavy with backend focus.

<sup>3</sup> Trial hosting done on Heroku. Actual Deployment can be done on other services (AWS / Microsft Azure / etc...).
