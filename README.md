# HTML CSS Course Assignment 2
Assignment 2 of the HMTL and CSS course. The idea of this assignment was to create a quiz using HTML5, JavaScript and CSS.

## Method
Implementation of the assignment was like for assignment 1 also done by hand trying to keep the structure simple and clean using only pure HTML5, CSS and Javascript. The addition of libraries such as Bootstrap or Material UI would have simplified the task significantly when it comes to design, but the excercise as such gives more in terms of learning when done without such libraries.

## Reflections
In order to make the assignment more advanced, the questions are loaded dynamically into the questionnaire from a JSON file. The JSON file provides the user the possibility to define any amount of questions and answers that belong to each question, as well as define what type of question each question is (i.e.: single choice or multiple choice question types). The JSON also contains the value of each answer, whether it be true of false, so as to be able to automatically summarize the score of the quiz as the user clicks in any of the checkboxes or radiobuttons.

The score calculation retrieves the maximum score through iterating the collection of questions. In order to calculate the score out of the max that the user has when clicking through the quiz, the score calculator traverses through all checkboxes and radiobuttons, groups them up and reads the correct values of each and compares what has been selected against the correct answers defined in the fields.

Styling has been done through means of pure CSS rather than through the use of a library such as Bootstrap or Material UI as mentioned above, but usage of any of these libraries would simplify features such as responsive behaviour, improved accessbility according to WCAG standards etc.
