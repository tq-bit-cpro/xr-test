import Matterport from "./matterport.js";

// @ts-ignore
M.AutoInit();

/**@type {HTMLIFrameElement|null} */
const MAIN_FRAME = document.querySelector("#main-frame");
const SDK_KEY = "0xn9478bywk8n4y68916494ac";

const matterport = new Matterport(MAIN_FRAME, SDK_KEY);

function showToast(msg) {
  //@ts-ignore
  M.toast({ html: msg, classes: "rounded" });
}

function handleMattertagClick(tagId) {
  matterport.getSdk().Mattertag.data.subscribe({
    onAdded: (index, item, collection) => {
      if (item.sid === tagId) {
        matterport
          .getSdk()
          .Mattertag.editColor(tagId, { r: 0.3, g: 0.85, b: 0.25 });
        showToast("Visting Tag " + item.label);
      }
    },
  });
  //   matterport.getSdk().Mattertag.editIcon(tagId, "icon-check");
}

async function main() {
  await matterport.connect();
  matterport.onCameraMove((phase) => console.log(phase));
  matterport.onMattertagClick(handleMattertagClick);
}

window.onload = async () => {
  try {
    await main();
  } catch (error) {
    console.error(error);
  }
};
