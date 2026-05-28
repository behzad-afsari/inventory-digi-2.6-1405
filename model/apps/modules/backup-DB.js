//backup from database

const backup = async () => {
    console.log("*******");
    const backupAnswer = await inquirer.prompt([
        {
            type: "rawlist",
            name: "action",
            message: "*** Do You Whant to BackUp From (DATABASE) ? ***",
            choices: ["Yes", "No"]
        },
    ]);
    if (backupAnswer === "yes") {
        console.log(backupAnswer.action);
    } else {
        console.log(backupAnswer.action);
    }
}

export default backup