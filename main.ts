#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

// Student Class
class Student {
  name: string;
  id: string;
  courses: string[];
  fees: number[];

  constructor(name: string, id: string, courses: string[], fees: number[]) {
    this.name = name;
    this.id = id;
    this.courses = courses;
    this.fees = fees;
  }

  payFees() {
    let fees = this.fees;
    console.log("Your fees has been paid");
  }
}

// Welcome message
console.log(
  chalk.bold.magenta("\n\t###################################################")
);

console.log(
  chalk.bold.italic.magenta(`\n\t\tWELCOME TO STUDENT MANAGEMENT SYSTEM`)
);

console.log(
  chalk.bold.magenta(
    "\n\t###################################################\n"
  )
);

// Global variables
let continueEnroll = true;
let students: Student[] = [];
let newID = "";
let baseID = 2100;
let courseFee = 0;
let student;

// Starting Loop
do {
  // Ask for what to do
  let askToDO = await inquirer.prompt({
    name: "ask",
    message: "Select what do you want?",
    type: "list",
    choices: ["Enroll new student", "Show Status", "Exit"],
  });

  // Check first condition
  if (askToDO.ask === "Enroll new student") {
    let askName = await inquirer.prompt({
      name: "name",
      message: "Enter your name: ",
      type: "input",
    });

    // Allot ID
    let trimmedName = askName.name.trim();
    console.log(chalk.bold.blue(`\n\tWelcome ${trimmedName}`));

    baseID++;
    newID = "MH" + baseID;
    console.log(chalk.bold.blue(`\tYour ID is ${newID}\n`));

    // Ask for choose a course
    let askCourse = await inquirer.prompt({
      name: "course",
      message: "Please select a course",
      type: "list",
      choices: [
        "Web Development",
        "Android Development",
        "Cloud Applied GenAI",
      ],
    });

    // Course fees
    switch (askCourse.course) {
      case "Web Development":
        courseFee = 3999;
        break;

      case "Android Development":
        courseFee = 4999;
        break;

      case "Cloud Applied GenAI":
        courseFee = 7499;
        break;
    }

    // Creating object of student
    student = new Student(trimmedName, newID, [askCourse.course], [courseFee]);
    students.push(student);

    // Ask to confirm fees payment
    console.log(
      chalk.green.italic.bold(
        `\n Fees for ${askCourse.course} course is ${student.fees}`
      )
    );
    let askForFees = await inquirer.prompt({
      name: "ans",
      message: chalk.green.italic.bold(`Would you like to pay it`),
      type: "confirm",
    });

    // After payment
    if (askForFees.ans === true) {
      console.log(student);
    } else {
      students.pop();
      continue;
    }

    console.log(
      chalk.magenta.bold(`\nYou are enrolled in ${askCourse.course} course\n`)
    );
  }

  // Check second condition
  else if (askToDO.ask === "Show Status") {
    let checkStudent = students.map((elem) => elem.name);

    if (students.length !== 0) {
      let askforStudent = await inquirer.prompt({
        name: "ask",
        message: "Select the student",
        type: "list",
        choices: checkStudent,
      });

      let foundStudent = students.find(
        (student) => student.name === askforStudent.ask
      );

      console.log(chalk.green.bold(`\n Student Information`));
      console.log(foundStudent);
      continue;
    } else {
      console.log(chalk.bold.red(`\n\t Record is empty`));
      continue;
    }
  }

  // Check last condition
  else if (askToDO.ask === "Exit") {
    continueEnroll = false;
  }
} while (continueEnroll);
