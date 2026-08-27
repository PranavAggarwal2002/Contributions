import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

const makeCommits = async (n) => {
    const git = simpleGit();

    for (let i = 0; i < n; i++) {
        const daysAgo = Math.floor(Math.random() * 365);

        const date = moment()
            .subtract(daysAgo, "days")
            .set({
                hour: Math.floor(Math.random() * 12) + 8,
                minute: Math.floor(Math.random() * 60),
                second: Math.floor(Math.random() * 60),
            })
            .format();

        const data = {
            date,
            commitNumber: i + 1,
        };

        await jsonfile.writeFile(path, data);

        await git.add([path]);

        await git.commit(`Contribution ${i + 1}`, {
            "--date": date,
        });

        console.log(`Commit ${i + 1}/${n}: ${date}`);
    }

    await git.push();

    console.log(`Finished ${n} commits!`);
};

makeCommits(1000);