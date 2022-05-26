<template>
  <div class="Post">
    <div id="Holder" @dragover.prevent @drop.prevent="dropFile">
      <p>ここにドロップまたはファイルを選択</p>
      <label class="Holder__UploadFile">
        <input type="file" @change="uploadFile" />ファイルを選択
      </label>
      <div id="Holder__Select"></div>
    </div>

    <div id="Send">
      <label>
        <button @click="onClick">POST</button>
      </label>
    </div>
    <div class="Result">
      <details>
        <summary>実行結果</summary>
        <div id="Datas"></div>
      </details>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var dirPath;
var postBaseUrl = process.env.VUE_APP_POST_BASE_URL;
var postUrl = "/convert/confile";

axios.defaults.baseURL = postBaseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
  name: "Post",
  data() {
    return {
      dirPath: dirPath,
      postUrl: postUrl,
    };
  },
  methods: {
    dropFile(e) {
      // runTextをHolder__Selectにp要素をSelect__dataをつけて子要素として追加する
      dirPath = e.dataTransfer.files[0].path;

      var selecetElem = document.getElementById("Holder__Select");

      console.log("File(s) you dragged here: " + dirPath);
      const runText = "次のファイルが選択されました: " + dirPath;

      const p = document.createElement("p");
      p.textContent = runText;
      p.classList.add("Select__data");
      selecetElem.appendChild(p);
    },
    uploadFile(e) {
      // runTextをHolder__Selectにp要素をSelect__dataをつけて子要素として追加する
      // TODO 二回同じファイルを選択すると表示されないのでそれを修正する

      var selecetElem = document.getElementById("Holder__Select");
      dirPath = e.target.files[0].path;
      console.log("File(s) you selected: " + dirPath);

      const runText = "次のファイルが選択されました: " + dirPath;

      const p = document.createElement("p");
      p.textContent = runText;
      p.classList.add("Select__data");
      selecetElem.appendChild(p);
    },
    onClick() {
      console.log("POST to: " + postUrl); // eslint-disable-line no-console
      console.log("POST: " + dirPath); // eslint-disable-line no-console

      const runText = "次のファイルの変換を実行しました :" + dirPath;

      const p = document.createElement("p");
      p.textContent = runText;
      p.classList.add("Datas__data");
      document.getElementById("Datas").appendChild(p);

      axios
        .post(postUrl, {
          dir: dirPath,
          format: "mp4",
        })
        .then((res) => {
          var selecetElem = document.getElementById("Holder__Select");
          console.log(res);
          this.posts = res.data.posts;

          const resultText = "Success :" + res.data.afterfilename;

          p.textContent = resultText;
          p.classList.add("Datas_data");
          document.getElementById("Datas").appendChild(p);

          selecetElem.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
div {
  .Data {
    font-size: 1.3rem;
    font-weight: bold;
  }

  #Holder {
    font-size: 2rem;
    font-weight: bold;
    color: gray;
    font-weight: bold;
    font-size: 1.2em;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 300px;
    border: 5px solid gray;
    border-radius: 15px;
    margin: 10px auto;
  }

  #Send {
    button {
      font-size: 1.6rem;
      font-weight: 700;
      padding: 1rem 4rem;
      border-radius: 0.5rem;
    }

    padding: 1rem;
  }

  #Result {
    display: flex;
    justify-content: center;

    details {
      border: 1px solid #000000;
      border-radius: 4px;
      padding: 0.5em 0.5em 0;
    }
  }

  .Holder__UploadFile {
    padding: 10px 40px;
    color: #ffffff;
    background-color: #384878;
    cursor: pointer;
    border-radius: 10px;
  }

  input[type="file"] {
    display: none;
  }
}
</style>
