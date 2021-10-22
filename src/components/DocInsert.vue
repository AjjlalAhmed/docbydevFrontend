<template>
  <!-- Add-doc  -->
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
      <quill-editor
        id="editor"
        v-model:value="state.content"
        :options="toolbarOptions"
      />
      <button class="post-btn" @click.prevent="post">post</button>
    </div>
  </div>
  <!-- Add doc  -->
</template>

<script>
// Importing thing we need
// pACKAGES
import turndown from "turndown";
import showdown from "showdown";
import { quillEditor, Quill } from "vue3-quill";
//Vue
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { watch } from "@vue/runtime-core";
export default {
  name: "DocInsert",
  props: ["docdata"],
  components: {
    quillEditor,
  },
  setup(props) {
    // Variables
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const docdata = ref(null);
    const tags = ref("");
    const docTitle = ref("");
    const TurndownService = turndown;
    const ShowdownService = showdown;
    const converter = new ShowdownService.Converter();
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
    const state = reactive({
      content: "",
      _content: "",
      editorOption: {
        placeholder: "Enter your doc...",
      },
      disabled: false,
    });

    // Functions
    // This submit doc data
    const post = async () => {
      // Creating new turndown instance
      const turndownService = new TurndownService();
      turndownService.keep(["pre", "code", "iframe"]);
      //  Extracting HTML
      const content = document.querySelector("#editor").firstElementChild
        .innerHTML;
      // Converting html to markdown
      const markdown = turndownService.turndown(content);
      if (tags.value != "" && docTitle != "" && markdown != "") {
        const to = ref(null);
        if (route.name == "AddDoc") {
          to.value = "user/adddoc";
        } else {
          to.value = `user/editdoc?docid=${docdata.value[0].id}`;
        }
        const response = await fetch(`${process.env.VUE_APP_HOST}${to.value}`, {
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
          if (props.docdata)
            store.commit("addAlertPopupMessage", `doc updated.`);
          else store.commit("addAlertPopupMessage", `new doc added.`);
          store.commit("addShowAlertPopupMessage", true);
          router.push({ path: "/" });
        } else {
          alert(data.errorMessage);
        }
      } else {
        alert("Some field are empty");
      }
    };

    // Watcher
    watch(
      () => props.docdata,
      () => {
        docdata.value = props.docdata;
        tags.value = docdata.value[0].doctags;
        docTitle.value = docdata.value[0].doctitle;
        state.content = converter.makeHtml(docdata.value[0].docdata);
      }
    );

    return { toolbarOptions, post, tags, docTitle, state };
  },
};
</script>

<style lang="scss" scoped>
// add doc
.add-doc {
  max-width: 1000px;
  column-width: 1000px;
  margin: 10px;
  margin-top: 50px;
  // form
  .form {
    background: #fff;
    border: 1px solid #2222;
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
        color: $black;
        font-weight: 700;
      }
    }
  }
  // editor wraper
  .editor-wraper {
    background: #fff;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 70vh 60px;
    border: 1px solid #2222;
    padding: 10px;
    #editor {
      background: #fff;
      border: 0px;
    }
    .ql-container.ql-snow {
      border: 0px !important;
    }
    .post-btn {
      text-transform: capitalize;
      font-size: 1.5rem;
      color: #fff;
      background: $contrast-color;
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
</style>
