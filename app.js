const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/employee");

//
let employees = [];

async function addMember() {
    let responseDone = "";

    response = await inquirer.prompt([{
        message: "enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's id",
        name: "id"
    },
    {
        message: "Enter team member's email address",
        name: "email"
    }]);
};
async function moreQuestions() {
        if (response.role === "Intern") {
            response2 = await inquirer.prompt([{
                message: "what School did/are you attending?",
                name: "schoolName"
            }])    
            const Intern1 = new Intern(response.name, response.id, response.email, response2.schoolName);
            employees.push(Intern1)
            console.log(Intern1)
        } 
        else if (response.role === "Engineer") {
            response2 =  await inquirer.prompt([{
                message: "what is your github username",
                name: "Githubname"
            }])
            const Engineer1 = new Engineer(response.name, response.id, response.email, response2.Githubname);
            employees.push(Engineer1)
            console.log(Engineer1)
        }
        else if (response.role === "Manager") {
            roleInfo = "office phone number";
            response2 =  await inquirer.prompt([{
                message: "what is your office phone number, with extension?",
                name: "officeNumber"
            }])
            const Manager1 = new Manager(response.name, response.id, response.email, response2.officeNumber);
            employees.push(Manager1)
        console.log(Manager1)        }

}
async function addMoreMembers() {
    response3 = await inquirer.prompt([{
            type: "list",
            message: "would you like to add more members?",
            choices: [ "yes",
                     "no"
                    ],
            name: "addMoreMembers"
        }])
                if (response3.addMoreMembers === 'yes') {
                    return init();
 
                }
                else {
                    finishHTML(employees)
                }
            
        
}
async function finishHTML(employees){
    fs.writeFile(outputPath, render(employees), (err) =>
   err ? console.log(err) : console.log('success! your HTML file hase been written')
   )}
async function init() {
  await addMember();
  console.log(response);
  await moreQuestions();
  console.log(response2);
  await addMoreMembers();
//   console.log(response3);
//   console.log(employees)
//   console.log("success!")

}
init()
