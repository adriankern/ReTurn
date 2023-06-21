const speakers = [];
let initialFileName;
let unparsedText;
const postfix = ":";
let parsedText;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addBtn").addEventListener("click", () => {
        const speakerName = document.getElementById("speaker").value;
        if (speakerName.length === 0 || speakers.includes(speakerName)) {
            return;
        }

        speakers.push(speakerName);

        document.getElementById("speakerList").innerHTML +=
            `<button id="${speakerName}" onclick="removeSpeaker(this.id)" type="button" class=\"list-group-item list-group-item-action\">${speakerName}</button>`;

        document.getElementById("speaker").value = "";
    });

    document.getElementById("file_selector").addEventListener("change", (event) => {
        const [file] = event.target.files;
        const reader = new FileReader();

        reader.addEventListener("load", () => {
                unparsedText = reader.result;
                document.getElementById("runBtn").disabled = false;
            },
            false
        );

        if (file) {
            initialFileName = file.name;
            reader.readAsText(file);
        }
    });
});

function removeSpeaker(name) {
    const index = speakers.indexOf(name);
    if (index > -1) {
        speakers.splice(index, 1);
        document.getElementById(name).remove();
    }
}

function parseFile() {
    if (speakers.length === 0) {
        return;
    }

    let turnNumber = 0;
    const pattern = new RegExp(`^(${speakers.map(s => `${s}${postfix}`).join('|')})`, "mg");

    parsedText = unparsedText.replace(pattern, match => {
        turnNumber++;
        return `${turnNumber > 1 ? "</turn>\n" : ""}<turn n="${turnNumber}" speaker="${match.slice(0, postfix.length * -1)}">\n`;
    });

    parsedText = parsedText.replace(/\<\/dialogue\>/mg, "</turn>\n</dialogue>");

    document.getElementById("parsed_Area").value = parsedText;
    document.getElementById("downloadBtn").disabled = false;
}

function downloadFile() {
    //https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
    let element = document.createElement("a");
    element.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(parsedText)}`);
    element.setAttribute("download", `reTurned_${initialFileName}`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
