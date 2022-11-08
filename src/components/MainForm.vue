<template>
  <div class="card border-light mb-3">
    <div class="card-header">
      <h3>{{ locale.title }}</h3>
    </div>
    <div class="card-body">
      <form>
        <div class="mb-3">
          <div class="row">
            <div class="col-lg-6">
              <label for="rangeNumber" class="form-label position-relative"
                >{{ locale.numberPasswords }}
                <top-badge :value="form.amount" color="bg-danger"
              /></label>
              <input
                type="range"
                class="form-range"
                min="1"
                max="50"
                step="1"
                id="rangeNumber"
                v-model="form.amount"
              />
            </div>
            <div class="col-lg-6">
              <label for="rangeSize" class="form-label position-relative"
                >{{ locale.size }} <top-badge :value="form.size" color="bg-warning"
              /></label>
              <input
                type="range"
                class="form-range"
                min="3"
                max="50"
                step="1"
                id="rangeSize"
                v-model="form.size"
              />
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchAllowNumbers"
              v-model="form.allowNumbers"
            />
            <label class="form-check-label" for="switchAllowNumbers"
              >{{ locale.allowNumbers }}</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchAllowLowercase"
              v-model="form.allowLower"
            />
            <label class="form-check-label" for="switchAllowLowercase"
              >{{ locale.allowLower }}</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchAllowUppercase"
              v-model="form.allowUpper"
            />
            <label class="form-check-label" for="switchAllowUppercase"
              >{{ locale.allowUpper }}</label
            >
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="switchAllowSpecialChar"
              v-model="form.allowSpecial"
            />
            <label class="form-check-label" for="switchAllowSpecialChar"
              >{{ locale.allowSpecial }}</label
            >
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group mb-3">
            <span class="input-group-text" id="labelExclude">{{ locale.excludeLabel }}</span>
            <input
              type="text"
              class="form-control"
              :placeholder="locale.excludePlaceholder"
              v-model="form.excludeWords"
              aria-describedby="labelExclude"
            />
          </div>
        </div>
        <div class="d-flex gap-3">
          <button
            type="button"
            class="btn btn-primary my-3"
            @click="generatePasswords()"
            :disabled="disableGenerate"
          ><i class="bi bi-gear"></i>
            {{ locale.buttonGenerate }}
          </button>
          <button
            type="button"
            class="btn btn-warning my-3"
            @click="clearValues()"
          ><i class="bi bi-trash"></i>
            {{ locale.buttonClearConfig }}
          </button>
          <button
            type="button"
            class="btn btn-info my-3"
            @click="clearPasswords()"
            v-if="hasPasswords"
          ><i class="bi bi-file-earmark-x"></i>
            {{ locale.buttonClearPassword }}
          </button>
          <button
            type="button"
            class="btn btn-info my-3"
            @click="copyPasswords()"
            v-if="hasPasswords"
          ><i class="bi bi-clipboard2"></i>
            {{ locale.buttonCopyPasswords }}
          </button>
        </div>
        <show-component
          v-if="hasPasswords"
          :passwords="form.passwords"
          @removePassword="removePassword($event)"
          @copiedPassword="copyPassword($event)"
        />
      </form>
    </div>
  </div>

  <toast-alert :show="showToast" @closeToast="this.showToast = false" :message="toastMessage" />
</template>

<script>
import TopBadge from "@/components/TopBadge.vue";
import ShowComponent from "@/components/ShowComponent.vue";
import ToastAlert from "@/components/ToastAlert.vue"

export default {
  name: "MainForm",
  components: {
    TopBadge,
    ShowComponent,
    ToastAlert
  },
  props: {
    locale: {
      required: true,
    },
  },
  data: () => ({
    form: {},
    showToast: false,
    toastMessage: '',
    startConfig: {
      amount: 1,
      size: 8,
      allowNumbers: true,
      allowLower: true,
      allowUpper: true,
      allowSpecial: true,
      excludeWords: "",
      passwords: [],
    },
  }),
  methods: {
    clearValues() {
      this.form = Object.assign({}, this.startConfig);
    },
    generatePassword() {
      let letters = "abcdefghijklmnopqrstuvwxyz";
      let accepted = [];
      //numbers
      accepted[0] = this.form.allowNumbers ? "0123456789" : "";
      // lower
      accepted[1] = this.form.allowLower ? letters.toLowerCase() : "";
      // upper
      accepted[2] = this.form.allowUpper ? letters.toUpperCase() : "";
      // special
      accepted[3] = this.form.allowSpecial ? "!@#$&*()-_+={}[]?" : "";
      let password = "";
      for (let i = 0; i < this.form.size; i++) {
        let init = true;
        while (init) {
          let x = Math.floor(Math.random() * 4);
          if (accepted[x] !== "") {
            let char =
              accepted[x][Math.floor(Math.random() * accepted[x].length)];
            if (!this.form.excludeWords.includes(char)) {
              password = password + char;
              init = false;
            }
          }
        }
      }
      return password;
    },
    generatePasswords() {
      this.clearPasswords();
      for (let i = 0; i < this.form.amount; i++) {
        this.form.passwords.push(this.generatePassword());
      }
    },
    clearPasswords() {
      this.form.passwords = [];
    },
    removePassword(index) {
      console.log(this.form.passwords[index]);
      this.form.passwords.splice(index, 1);
    },
    copyPassword(index) {
      let password = this.form.passwords[index];
      navigator.clipboard.writeText(password)
      this.toastMessage = this.locale.messageSingleCopy.replace('{s}', password)
      this.showToast = true
    },
    copyPasswords(){
      let passwords = this.form.passwords.reduce(function(passwords, item){
        return passwords + '\r\n' + item;
      });
      navigator.clipboard.writeText(passwords)
      let length = this.form.passwords.length
      this.toastMessage = this.locale.messageAllCopy.replace('{s}', length)
      this.showToast = true
    }
  },
  computed: {
    disableGenerate() {
      if (
        !this.form.allowNumbers &&
        !this.form.allowLower &&
        !this.form.allowUpper &&
        !this.form.allowSpecial
      ) {
        return true;
      } else {
        return false;
      }
    },
    hasPasswords() {
      return this.form.passwords.length > 0;
    },
  },
  created() {
    this.clearValues();
  },
};
</script>