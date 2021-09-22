<template>
  <!-- add-doc  -->
  <div class="wraper">
    <div class="add-doc">
      <!-- Form  -->
      <form class="form">
        <!-- form-control -->
        <div class="form-control">
          <input
            v-model="docTitle"
            class="enter-title"
            type="text"
            placeholder="New post title here"
          />
        </div>
        <!-- form-control -->
        <div class="form-control">
          <p>you can add your custom tag seperate by comma { , }</p>
          <input
            v-model="tags"
            class="tags-input"
            type="text"
            placeholder="Add tags here"
          />
        </div>
      </form>
      <!-- quill-editor  -->
      <div class="editor-wraper">
        <QuillEditor :toolbar="toolbarOptions" class="editor" theme="snow" />
        <button class="post-btn" @click.prevent="post">post</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import turndown from "turndown";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "AddDoc",
  setup() {
    // Variables
    const store = useStore();
    const router = useRouter();
    const toolbarOptions = ref([
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ]);
    const tags = ref("");
    const docTitle = ref("");
    const TurndownService = turndown;
    // Functions
    const post = async () => {
      // Creating new turndown instance  
      const turndownService = new TurndownService();
      turndownService.keep(["pre", "code", "iframe"]);
      //  Extracting HTML 
      const content = document.querySelector(".editor").firstElementChild
        .innerHTML;
      // Converting html to markdown
      const markdown = turndownService.turndown(content);
      if (tags.value != "" && docTitle != "" && markdown != "") {
        const response = await fetch(`${process.env.VUE_APP_HOST}user/adddoc`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: store.getters.currentToken,
            tags: tags.value.replace(/'/g, "`"),
            docTitle: docTitle.value.replace(/'/g, "`"),
            markdown: markdown.replace(/'/g, "`"),
          }),
        });
        const data = await response.json();
        if (data.error == null) {
          router.push({ path: "/" });
        } else {
          alert(data.errorMessage);
        }
      } else {
        alert("Some field are empty");
      }
    };
    return { toolbarOptions, post, tags, docTitle };
  },
};
</script>

<style lang="scss" >
.wraper {
  background: #f9f9f9;
  padding: 10px;
  .add-doc {
    max-width: 1200px;
    margin: 20px auto;
    border: 1px solid #2222;
    .form {
      background: #fff;
      padding: 10px;
      .form-control {
        .enter-title {
          font-size: 2rem;
          font-weight: 900;
          padding: 10px;
          width: 100%;
          border: 1px solid #2222;
          border-radius: 3px;
        }
        .tags-input {
          font-size: 1.5rem;
          padding: 10px;
          width: 100%;
          border: 1px solid #2222;
          border-radius: 3px;
        }
        @mixin random-bgr() {
          background: rgb(random(100), random(100), random(100));
        }
        p {
          text-transform: capitalize;
          font-size: 1rem;
          padding: 10px;
          margin: 10px 0px;
          color: #000;
          font-weight: 700;
        }
      }
    }
    .editor-wraper {
      background: #fff;
      .editor {
        min-height: 60vh;
        background: #fff;
      }
      .post-btn {
        text-transform: capitalize;
        font-size: 1.5rem;
        color: #000;
        background: yellow;
        border-radius: 3px;
        padding: 1px 30px;
        margin: 10px;
        font-weight: 400;
        cursor: pointer;
        border: 1px solid #2222;
      }
      .ql-toolbar .ql-stroke {
        fill: none;
        stroke: rgb(170, 169, 169);
      }

      .ql-toolbar .ql-fill {
        fill: rgb(155, 154, 154);
        stroke: rgb(156, 156, 156);
      }

      .ql-toolbar .ql-picker {
        stroke: rgb(160, 159, 159);
      }
    }
  }
}
</style>
